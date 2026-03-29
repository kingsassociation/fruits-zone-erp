"use server"

import { z } from "zod"
import prisma from "@/lib/prisma"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

const customerSchema = z.object({
  name: z.string().min(3),
  phone: z.string().min(10).optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
})

export async function createCustomer(data: any) {
  const session = await auth()
  if (!session?.user?.id || session.user.role !== "VENDOR") {
    return { error: "Unauthorized" }
  }

  try {
    const validatedData = customerSchema.parse(data)

    const vendor = await prisma.vendor.findUnique({
      where: { userId: session.user.id }
    })

    if (!vendor) return { error: "Vendor profile not found" }

    const customer = await prisma.vendorCustomer.create({
      data: {
        vendorId: vendor.id,
        name: validatedData.name,
        phone: validatedData.phone || null,
        address: validatedData.address || null,
      }
    })

    revalidatePath("/dashboard/customers")
    return { success: true, customer }
  } catch (error: any) {
    if (error.code === 'P2002') return { error: "A customer with this phone number already exists." }
    return { error: "Failed to create customer." }
  }
}

export async function getVendorCustomers() {
  const session = await auth()
  if (!session?.user?.id) return []

  const vendor = await prisma.vendor.findUnique({
    where: { userId: session.user.id }
  })

  if (!vendor) return []

  return await prisma.vendorCustomer.findMany({
    where: { vendorId: vendor.id },
    orderBy: { name: 'asc' }
  })
}

export async function recordSale(data: {
  customerId?: string;
  items: { fruitId: string; quantity: number; price: number }[];
  totalAmount: number;
  amountPaid: number;
  note?: string;
}) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Unauthorized" }

  try {
    const vendor = await prisma.vendor.findUnique({
      where: { userId: session.user.id },
      include: { inventory: true }
    })

    if (!vendor) return { error: "Vendor not found" }

    // Atomic transaction for Sale + Inventory + Customer Due
    return await prisma.$transaction(async (tx: any) => {
      // 1. Create the Sale
      const paymentStatus = data.amountPaid >= data.totalAmount
        ? "CASH"
        : data.amountPaid === 0 ? "CREDIT" : "PARTIAL"

      const sale = await tx.sale.create({
        data: {
          vendorId: vendor.id,
          customerId: data.customerId || null,
          totalAmount: data.totalAmount,
          amountPaid: data.amountPaid,
          paymentStatus,
          note: data.note,
          items: {
            create: data.items.map(item => ({
              fruitId: item.fruitId,
              quantity: item.quantity,
              price: item.price
            }))
          }
        }
      })

      // 2. Update Vendor Inventory
      for (const item of data.items) {
        const inventory = await tx.vendorInventory.findUnique({
          where: {
            vendorId_fruitId: { vendorId: vendor.id, fruitId: item.fruitId }
          }
        })

        if (!inventory || inventory.quantity < item.quantity) {
          throw new Error(`Insufficient stock for product ID: ${item.fruitId}`)
        }

        await tx.vendorInventory.update({
          where: { id: inventory.id },
          data: { quantity: { decrement: item.quantity } }
        })
      }

      // 3. Update Customer Due (if credit)
      if (data.customerId && data.amountPaid < data.totalAmount) {
        const dueAmount = data.totalAmount - data.amountPaid
        await tx.vendorCustomer.update({
          where: { id: data.customerId },
          data: { totalDue: { increment: dueAmount } }
        })
      }

      return { success: true, saleId: sale.id }
    })
  } catch (error: any) {
    return { error: error.message || "Failed to record sale." }
  }
}

export async function recordExpense(data: { title: string; amount: number; category: string; note?: string }) {
  const session = await auth()
  if (!session?.user?.id) return { error: "Unauthorized" }

  const vendor = await prisma.vendor.findUnique({
    where: { userId: session.user.id }
  })

  if (!vendor) return { error: "Vendor not found" }

  await prisma.vendorExpense.create({
    data: {
      vendorId: vendor.id,
      title: data.title,
      amount: data.amount,
      category: data.category,
      note: data.note,
    }
  })

  revalidatePath("/dashboard/ledger")
  return { success: true }
}
