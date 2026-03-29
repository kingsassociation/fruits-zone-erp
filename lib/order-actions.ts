"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"
import { z } from "zod"
import { auth } from "@/auth"

const orderSchema = z.object({
  items: z.array(z.object({
    fruitId: z.string(),
    quantity: z.number().positive(),
    price: z.number().positive(),
  })),
  notes: z.string().optional(),
})

export async function createPurchaseOrder(data: any) {
  const session = await auth()
  if (!session) return { error: "Unauthorized" }

  const user = session.user as any
  const vendor = await prisma.vendor.findUnique({
    where: { userId: user.id }
  })

  if (!vendor) return { error: "Vendor not found" }

  try {
    const validatedData = orderSchema.parse(data)
    const totalAmount = validatedData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0)

    const order = await prisma.$transaction(async (tx: any) => {
      const po = await tx.purchaseOrder.create({
        data: {
          vendorId: vendor.id,
          totalAmount,
          notes: validatedData.notes,
          status: "PENDING",
          items: {
            create: validatedData.items.map(item => ({
              fruitId: item.fruitId,
              quantity: item.quantity,
              priceAtTime: item.price,
            }))
          }
        }
      })
      return po
    })

    revalidatePath("/dashboard/orders")
    revalidatePath("/dashboard/reports")
    return { success: true, orderId: order.id }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.issues[0].message }
    }
    return { error: "Failed to create purchase order." }
  }
}

export async function getVendorOrders() {
  const session = await auth()
  if (!session) return []

  const user = session.user as any
  const vendor = await prisma.vendor.findUnique({
    where: { userId: user.id }
  })

  if (!vendor) return []

  try {
    return await prisma.purchaseOrder.findMany({
      where: { vendorId: vendor.id },
      include: {
        items: {
          include: {
            fruit: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })
  } catch (error) {
    return []
  }
}

export async function updateOrderStatus(orderId: string, status: any) {
  const session = await auth()
  if (!session?.user || session.user.role !== "ADMIN") {
    return { error: "Only admins can update order status." }
  }

  try {
    return await prisma.$transaction(async (tx: any) => {
      const order = await tx.purchaseOrder.findUnique({
        where: { id: orderId },
        include: { items: true }
      })

      if (!order) throw new Error("Order not found.")
      
      const oldStatus = order.status
      const updatedOrder = await tx.purchaseOrder.update({
        where: { id: orderId },
        data: { status }
      })

      // If status changed to DELIVERED, move stock to vendor's local inventory
      if (status === "DELIVERED" && oldStatus !== "DELIVERED") {
        for (const item of order.items) {
          await tx.vendorInventory.upsert({
            where: {
              vendorId_fruitId: {
                vendorId: order.vendorId,
                fruitId: item.fruitId
              }
            },
            update: {
              quantity: { increment: item.quantity }
            },
            create: {
              vendorId: order.vendorId,
              fruitId: item.fruitId,
              quantity: item.quantity,
              lowStockAlert: 5
            }
          })
        }
      }

      return { success: true, order: updatedOrder }
    })
  } catch (error: any) {
    return { error: error.message || "Failed to update order status." }
  } finally {
    revalidatePath("/dashboard/orders")
    revalidatePath("/dashboard/orders")
    revalidatePath("/dashboard/ledger")
  }
}
