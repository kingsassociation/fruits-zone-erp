"use server"

import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    const info = await transporter.sendMail({
      from: `"FruitsZone Partner" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Welcome to FruitsZone Partner ERP",
      html: `
        <div style="font-family: 'Outfit', sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #f1f5f9; border-radius: 24px;">
          <h1 style="color: #10b981; font-size: 24px; font-weight: 800;">Welcome to the Hub, ${name}!</h1>
          <p style="font-size: 16px; line-height: 1.6;">Your FruitsZone Partner account has been successfully created. We're excited to have you as part of our network in Chattogram.</p>
          <div style="background-color: #f8fafc; padding: 24px; border-radius: 16px; margin: 24px 0;">
            <p style="margin: 0; font-weight: 700;">What's next?</p>
            <ul style="margin: 12px 0 0 0; padding-left: 20px; font-size: 14px; color: #64748b;">
              <li>Verify your business details in the dashboard.</li>
              <li>Activate your subscription plan.</li>
              <li>Browse the fruit catalog and start ordering.</li>
            </ul>
          </div>
          <a href="${process.env.NEXTAUTH_URL}/login" style="display: inline-block; background-color: #10b981; color: white; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 14px;">Access Your Dashboard</a>
          <p style="margin-top: 40px; font-size: 12px; color: #94a3b8;">&copy; 2026 FruitsZone Enterprise System. All rights reserved.</p>
        </div>
      `,
    })

    console.log("Welcome email sent: %s", info.messageId)
    return { success: true }
  } catch (error: any) {
    console.error("Failed to send welcome email:", error)
    return { error: error.message }
  }
}
