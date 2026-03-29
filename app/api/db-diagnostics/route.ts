import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const diagnosticInfo = {
    timestamp: new Date().toISOString(),
    env: {
      DATABASE_URL_PRESENT: !!process.env.DATABASE_URL,
      POOLER_URL_PRESENT: !!process.env.POOLER_URL,
      // Only show first 10 chars for safety
      DATABASE_URL_START: process.env.DATABASE_URL?.substring(0, 10),
      POOLER_URL_START: process.env.POOLER_URL?.substring(0, 10),
    },
    prisma: {
      isInitialized: !!prisma,
    }
  };

  try {
    // Try a simple ping
    await prisma.$executeRaw`SELECT 1`;
    return NextResponse.json({ 
      status: "✅ Success", 
      message: "Database connected successfully!",
      ...diagnosticInfo 
    });
  } catch (error: any) {
    console.error("❌ DB Diagnostic Error:", error);
    return NextResponse.json({ 
      status: "❌ Error", 
      message: error?.message || "Unknown error connecting to database",
      ...diagnosticInfo,
      errorStack: error?.stack?.substring(0, 200)
    }, { status: 500 });
  }
}
