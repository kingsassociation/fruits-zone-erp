import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { vendor: true }
    })

    if (!user || !user.vendor) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 })
    }

    // Activate the vendor
    await prisma.vendor.update({
      where: { id: user.vendor.id },
      data: { status: "ACTIVE" }
    })

    return NextResponse.json({ 
      success: true, 
      message: `Vendor ${email} has been activated successfully!` 
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
