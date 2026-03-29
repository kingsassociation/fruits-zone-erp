"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"
import { z } from "zod"

const offerSchema = z.object({
  fruitId: z.string().min(1),
  discount: z.number().positive(),
  type: z.enum(["percentage", "fixed"]),
  startDate: z.date(),
  endDate: z.date(),
})

export async function createOffer(data: any) {
  try {
    const validatedData = offerSchema.parse({
      ...data,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    })

    await prisma.offer.create({
      data: {
        fruitId: validatedData.fruitId,
        discount: validatedData.discount,
        type: validatedData.type,
        startDate: validatedData.startDate,
        endDate: validatedData.endDate,
        isActive: true,
      },
    })
    revalidatePath("/dashboard/offers")
    revalidatePath("/dashboard") // Update UI globally
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.issues[0].message }
    }
    return { error: "Failed to create offer." }
  }
}

export async function deactivateOffer(id: string) {
  try {
    await prisma.offer.update({
      where: { id },
      data: { isActive: false },
    })
    revalidatePath("/dashboard/offers")
    return { success: true }
  } catch (error) {
    return { error: "Failed to deactivate offer." }
  }
}

export async function deleteOffer(id: string) {
  try {
    await prisma.offer.delete({
      where: { id },
    })
    revalidatePath("/dashboard/offers")
    return { success: true }
  } catch (error) {
    return { error: "Failed to delete offer." }
  }
}

export async function getOffersList(search?: string, status?: string) {
  try {
    const isActive = status === "Active" ? true : status === "Inactive" ? false : undefined;

    return await prisma.offer.findMany({
      where: {
        AND: [
          search ? {
            fruit: {
              name: { contains: search, mode: 'insensitive' }
            }
          } : {},
          isActive !== undefined ? { isActive } : {},
        ]
      },
      include: {
        fruit: true
      },
      orderBy: {
        createdAt: "desc"
      }
    })
  } catch (error) {
    console.error("[GET_OFFERS_ERROR]", error)
    return []
  }
}
