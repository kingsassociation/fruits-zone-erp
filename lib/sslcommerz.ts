"use server"

import pool from "@/lib/prisma" // or direct prisma
import prisma from "@/lib/prisma"

const SSLCOMMERZ_STORE_ID = process.env.SSLCOMMERZ_STORE_ID
const SSLCOMMERZ_STORE_PASSWORD = process.env.SSLCOMMERZ_STORE_PASSWORD
const IS_SANDBOX = process.env.NODE_ENV !== "production"

interface PaymentData {
  total_amount: number
  currency: string
  tran_id: string
  success_url: string
  fail_url: string
  cancel_url: string
  cus_name: string
  cus_email: string
  cus_add1: string
  cus_phone: string
  shipping_method: string
  product_name: string
  product_category: string
  product_profile: string
}

export async function initiatePayment(data: PaymentData) {
  const url = IS_SANDBOX
    ? "https://sandbox.sslcommerz.com/gwprocess/v4/api.php"
    : "https://securepay.sslcommerz.com/gwprocess/v4/api.php"

  const formData = new URLSearchParams()
  formData.append("store_id", SSLCOMMERZ_STORE_ID || "fruits67e5847e90c29")
  formData.append("store_passwd", SSLCOMMERZ_STORE_PASSWORD || "fruits67e5847e90c29@ssl")
  
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, String(value))
  })

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    })

    const result = await response.json()
    if (result.status === "SUCCESS") {
      return { url: result.GatewayPageURL }
    } else {
      return { error: result.failedreason || "Payment initiation failed." }
    }
  } catch (error) {
    return { error: "Failed to connect to SSLCommerz." }
  }
}

export async function verifyPayment(tran_id: string) {
  const url = IS_SANDBOX
    ? `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?tran_id=${tran_id}&store_id=${SSLCOMMERZ_STORE_ID}&store_passwd=${SSLCOMMERZ_STORE_PASSWORD}&format=json`
    : `https://securepay.sslcommerz.com/validator/api/validationserverAPI.php?tran_id=${tran_id}&store_id=${SSLCOMMERZ_STORE_ID}&store_passwd=${SSLCOMMERZ_STORE_PASSWORD}&format=json`

  try {
    const response = await fetch(url)
    const result = await response.json()
    return result.status === "VALIDATED" || result.status === "VALID"
  } catch (error) {
    return false
  }
}
