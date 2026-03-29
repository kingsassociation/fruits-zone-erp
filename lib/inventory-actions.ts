"use server"

import prisma from "@/lib/prisma"
import { auth } from "@/auth"

export async function getVendorInventory(search?: string) {
  const session = await auth()
  if (!session?.user?.id) return []

  const vendor = await prisma.vendor.findUnique({
    where: { userId: session.user.id }
  })

  if (!vendor) return []

  return await prisma.vendorInventory.findMany({
    where: { 
      vendorId: vendor.id,
      ...(search ? {
        fruit: {
          name: { contains: search, mode: 'insensitive' }
        }
      } : {})
    },
    include: {
      fruit: true
    },
    orderBy: {
      fruit: {
        name: 'asc'
      }
    }
  })
}

export async function getLowStockAlerts() {
  const session = await auth()
  if (!session?.user?.id) return []

  const vendor = await prisma.vendor.findUnique({
    where: { userId: session.user.id }
  })

  if (!vendor) return []

  return await prisma.vendorInventory.findMany({
    where: {
      vendorId: vendor.id,
      quantity: {
        lte: prisma.vendorInventory.fields.lowStockAlert
      }
    },
    include: {
      fruit: true
    }
  })
}

export async function getGlobalInventory() {
  try {
    return await prisma.inventory.findMany({
      include: {
        fruit: true
      },
      orderBy: {
        fruit: {
          name: 'asc'
        }
      }
    })
  } catch (error) {
    return []
  }
}

export async function updateGlobalStock(fruitId: string, quantity: number) {
  try {
    const updated = await prisma.inventory.update({
      where: { fruitId },
      data: { quantity }
    })
    return { success: true, data: updated }
  } catch (error) {
    return { error: "Failed to update stock." }
  }
}

export async function updateVendorThreshold(id: string, lowStockAlert: number) {
  try {
    const session = await auth()
    if (!session?.user?.id) return { error: "Unauthenticated" }

    await prisma.vendorInventory.update({
      where: { id },
      data: { lowStockAlert }
    })
    return { success: true }
  } catch (error) {
    return { error: "Failed to update alert threshold." }
  }
}

export async function createPurchaseOrder(items: { fruitId: string, quantity: number, price: number }[], notes?: string) {
  try {
    const session = await auth()
    if (!session?.user?.id) return { error: "Unauthenticated" }

    const vendor = await prisma.vendor.findUnique({
      where: { userId: session.user.id }
    })

    if (!vendor) return { error: "Vendor profile not found." }

    const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.price), 0)

    const order = await prisma.purchaseOrder.create({
      data: {
        vendorId: vendor.id,
        totalAmount,
        notes,
        items: {
          create: items.map(item => ({
            fruitId: item.fruitId,
            quantity: item.quantity,
            priceAtTime: item.price
          }))
        }
      }
    })

    return { success: true, orderId: order.id }
  } catch (error) {
    console.error(error)
    return { error: "Failed to submit stock request." }
  }
}
