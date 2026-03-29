"use server"

import { revalidatePath } from "next/cache"
import prisma from "@/lib/prisma"
import { VendorStatus } from "@prisma/client"

export async function updateVendorStatus(vendorId: string, status: VendorStatus) {
  try {
    await prisma.vendor.update({
      where: { id: vendorId },
      data: { status },
    })
    revalidatePath("/dashboards")
    revalidatePath("/dashboard") // Update KPI cards
    return { success: true }
  } catch (error) {
    return { error: "Failed to update vendor status." }
  }
}

export async function getVendorsList(search?: string, status?: string) {
  try {
    return await prisma.vendor.findMany({
      where: {
        AND: [
          search ? {
            OR: [
              { user: { name: { contains: search, mode: 'insensitive' } } },
              { user: { email: { contains: search, mode: 'insensitive' } } },
              { businessName: { contains: search, mode: 'insensitive' } },
            ]
          } : {},
          status && status !== "All" ? { status: status.toUpperCase() as any } : {},
        ]
      },
      include: {
        user: true,
        subscription: {
          include: {
            plan: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    })
  } catch (error) {
    console.error("[GET_VENDORS_ERROR]", error)
    return []
  }
}
