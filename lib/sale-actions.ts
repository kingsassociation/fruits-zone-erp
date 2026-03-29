"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"
import { z } from "zod"
import { auth } from "@/auth"

const saleSchema = z.object({
  items: z.array(z.object({
    fruitId: z.string(),
    quantity: z.number().positive(),
    price: z.number().positive(),
  })),
  note: z.string().optional(),
})

export async function createSale(data: any) {
  const session = await auth()
  if (!session) return { error: "Unauthorized" }

  const user = session.user as any
  const vendor = await prisma.vendor.findUnique({
    where: { userId: user.id }
  })

  if (!vendor) return { error: "Vendor not found" }

  try {
    const validatedData = saleSchema.parse(data)
    const totalAmount = validatedData.items.reduce((sum, item) => sum + (item.quantity * item.price), 0)

    await prisma.$transaction(async (tx: any) => {
      await tx.sale.create({
        data: {
          vendorId: vendor.id,
          totalAmount,
          note: validatedData.note,
          items: {
            create: validatedData.items.map(item => ({
              fruitId: item.fruitId,
              quantity: item.quantity,
              price: item.price,
            }))
          }
        }
      })

      // Update local vendor inventory (if applicable)
      // Note: In this MVP, we assume vendor inventory is handled manually or simple sync.
      // For now, we'll just record the sale.
    })

    revalidatePath("/dashboard/my-sales")
    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.issues[0].message }
    }
    return { error: "Failed to record sale." }
  }
}

export async function deleteSale(id: string) {
  try {
    const session = await auth()
    if (!session) return { error: "Unauthorized" }

    await prisma.sale.delete({
      where: { id },
    })
    revalidatePath("/dashboard/my-sales")
    return { success: true }
  } catch (error) {
    return { error: "Failed to delete sale record." }
  }
}

export async function getVendorSales(search?: string) {
  const session = await auth()
  if (!session) return []

  const user = session.user as any
  const vendor = await prisma.vendor.findUnique({
    where: { userId: user.id }
  })

  if (!vendor) return []

  try {
    return await prisma.sale.findMany({
      where: { 
        vendorId: vendor.id,
        ...(search ? {
          items: {
            some: {
              fruit: {
                name: { contains: search, mode: 'insensitive' }
              }
            }
          }
        } : {})
      },
      include: {
        customer: true,
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
    console.error("[GET_SALES_ERROR]", error)
    return []
  }
}
