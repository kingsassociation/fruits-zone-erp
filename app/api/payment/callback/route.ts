import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { verifyPayment } from "@/lib/sslcommerz"

export async function POST(req: Request) {
  const formData = await req.formData()
  const data = Object.fromEntries(formData)

  const { tran_id, status, amount, bank_tran_id } = data as any

  if (status === "VALID") {
    // 1. Verify with SSLCommerz server
    const isValid = await verifyPayment(tran_id)

    if (isValid) {
      // 2. Update Subscription in database
      const subscription = await prisma.subscription.findFirst({
        where: { sslTransactionId: tran_id }
      })

      if (subscription) {
        await prisma.subscription.update({
          where: { id: subscription.id },
          data: {
            status: "active",
            currentPeriodStart: new Date(),
            currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
          }
        })

        // 3. Activate Vendor status
        await prisma.vendor.update({
          where: { id: subscription.vendorId },
          data: { status: "ACTIVE" }
        })
      }
      
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }

  return NextResponse.redirect(new URL("/register?error=payment_failed", req.url))
}
