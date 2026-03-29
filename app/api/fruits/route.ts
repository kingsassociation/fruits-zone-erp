import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const fruits = await prisma.fruit.findMany({
      where: { isActive: true },
      include: {
        inventory: true,
        offers: {
            where: {
                isActive: true,
                endDate: {
                    gt: new Date()
                }
            }
        }
      },
      orderBy: { name: "asc" }
    })

    // Transforming Decimal types for JSON serialization
    const sanitizedFruits = fruits.map((fruit) => ({
      ...fruit,
      basePrice: Number(fruit.basePrice),
      offers: fruit.offers.map((offer) => ({
        ...offer,
        discount: Number(offer.discount)
      }))
    }))

    return NextResponse.json(sanitizedFruits)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch fruits." }, { status: 500 })
  }
}
