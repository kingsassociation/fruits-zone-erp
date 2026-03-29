"use server"

import { z } from "zod"
import bcrypt from "bcryptjs"
import prisma from "@/lib/prisma"
import { signIn } from "@/auth"
import { AuthError } from "next-auth"

const registerSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  businessName: z.string().min(2),
  businessAddress: z.string().min(5),
  phone: z.string().min(10),
  nid: z.string().min(10),
  password: z.string().min(6),
  planId: z.string().min(1),
})

export async function registerVendor(data: any) {
  try {
    const validatedData = registerSchema.parse(data)
    const { fullName, email, businessName, businessAddress, phone, nid, password, planId } = validatedData

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { error: "User with this email already exists." }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Fetch the plan
    const plan = await prisma.subscriptionPlan.findUnique({
      where: { id: planId },
    })

    if (!plan) return { error: "Invalid subscription plan selected." }

    // Create user and vendor in a transaction
    const result = await prisma.$transaction(async (tx: any) => {
      const user = await tx.user.create({
        data: {
          name: fullName,
          email,
          password: hashedPassword,
          role: "VENDOR",
        },
      })

      const vendor = await tx.vendor.create({
        data: {
          userId: user.id,
          businessName,
          phone,
          address: businessAddress,
          nid,
          status: "PENDING",
        },
      })

      // Create subscription
      const startDate = new Date()
      const endDate = new Date()
      endDate.setMonth(startDate.getMonth() + 1)

      const subscription = await tx.subscription.create({
        data: {
          vendorId: vendor.id,
          planId: plan.id,
          status: plan.price > 0 ? "PENDING" : "ACTIVE",
          currentPeriodStart: startDate,
          currentPeriodEnd: endDate,
        },
      })

      return { user, vendor, subscription }
    })

    // If paid plan, initiate payment
    if (plan.price > 0) {
      const { initiatePayment } = await import("@/lib/sslcommerz")
      const paymentResponse = await initiatePayment({
        total_amount: plan.price,
        currency: "BDT",
        tran_id: result.subscription.id,
        success_url: `${process.env.NEXTAUTH_URL}/api/payment/callback?status=success`,
        fail_url: `${process.env.NEXTAUTH_URL}/api/payment/callback?status=fail`,
        cancel_url: `${process.env.NEXTAUTH_URL}/api/payment/callback?status=cancel`,
        cus_name: fullName,
        cus_email: email,
        cus_add1: businessAddress,
        cus_phone: phone,
        shipping_method: "NO",
        product_name: `FruitsZone Partner - ${plan.name} Plan`,
        product_category: "Subscription",
        product_profile: "non-physical-goods",
      })

      if (paymentResponse.url) {
        return { paymentUrl: paymentResponse.url }
      } else {
        return { error: paymentResponse.error || "Payment initiation failed." }
      }
    }

    return { success: true }
  } catch (error: any) {
    console.error("Registration Error:", error)
    
    if (error instanceof z.ZodError) {
      return { error: error.issues[0].message }
    }
    
    // Check for Prisma unique constraint violations (e.g., duplicate email)
    if (error.code === 'P2002') {
      const target = error.meta?.target || []
      if (target.includes('email')) {
        return { error: "A user with this email address already exists." }
      }
      if (target.includes('nid')) {
        return { error: "A vendor with this National ID (NID) is already registered." }
      }
      if (target.includes('phone')) {
        return { error: "This phone number is already linked to another partner account." }
      }
    }

    return { error: error.message || "Something went wrong during registration. Please try again or contact support." }
  }
}

export async function getSubscriptionPlans() {
  try {
    return await prisma.subscriptionPlan.findMany({
      where: { isActive: true },
      orderBy: { price: "asc" },
    })
  } catch (error) {
    console.error("Fetch Plans Error:", error)
    return []
  }
}

export async function login(data: any) {
  try {
    const { email, password } = data
    
    // Fetch user to determine role-based redirect
    const user = await prisma.user.findUnique({
      where: { email },
      select: { role: true }
    })

    const redirectTo = "/dashboard"

    await signIn("credentials", {
      email,
      password,
      redirectTo,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." }
        default:
          return { error: "Something went wrong." }
      }
    }
    throw error
  }
}
