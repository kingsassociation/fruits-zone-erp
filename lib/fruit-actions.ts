"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"
import { z } from "zod"

const fruitSchema = z.object({
  name: z.string().min(2),
  category: z.string().min(2),
  description: z.string().optional(),
  price: z.number().positive(),
  unit: z.string().min(1), // e.g., "kg", "box", "pc"
  imageUrl: z.string().url().optional(),
})

export async function createFruit(data: any) {
  try {
    const validatedData = fruitSchema.parse(data)
    
    // Generate a slug from the name
    const slug = validatedData.name.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")

    await prisma.fruit.create({
      data: {
        name: validatedData.name,
        category: validatedData.category.toUpperCase() as any,
        description: validatedData.description,
        basePrice: validatedData.price,
        unit: validatedData.unit,
        slug,
        inventory: {
          create: {
            quantity: 0,
            lowStockAlert: 10
          }
        }
      },
    })
    revalidatePath("/dashboard/fruits")
    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.issues[0].message }
    }
    return { error: "Failed to create fruit." }
  }
}

export async function updateFruit(id: string, data: any) {
  try {
    const validatedData = fruitSchema.parse(data)
    await prisma.fruit.update({
      where: { id },
      data: {
        ...validatedData,
        category: (validatedData.category as string).toUpperCase() as any,
      },
    })
    revalidatePath("/dashboard/fruits")
    return { success: true }
  } catch (error) {
    return { error: "Failed to update fruit." }
  }
}

export async function deleteFruit(id: string) {
  try {
    await prisma.fruit.delete({
      where: { id },
    })
    revalidatePath("/dashboard/fruits")
    return { success: true }
  } catch (error) {
    return { error: "Failed to delete fruit." }
  }
}

export async function getFruits(search?: string, category?: string) {
  try {
    return await prisma.fruit.findMany({
      where: {
        AND: [
          search ? {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              // Removed category contains search as it is an Enum
            ]
          } : {},
          category && category !== "All" ? { category: category.toUpperCase() as any } : {},
        ]
      },
      orderBy: { name: "asc" },
    })
  } catch (error) {
    console.error("[GET_FRUITS_ERROR]", error)
    return []
  }
}
