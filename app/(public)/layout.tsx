"use client"

import { ReactNode } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useSession } from "next-auth/react"

export default function PublicLayout({ children }: { children: ReactNode }) {
  // Use session if needed for header profile, but standard landing use a simple navbar
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      <Navbar session={null} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}
