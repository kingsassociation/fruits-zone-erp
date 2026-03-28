import { Inter, Outfit, Geist } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" })

export const metadata = {
  title: "FruitsZone ERP | Scaling vendor management for fruitszone.com",
  description: "Official partner/vendor management & ERP system for FruitsZone e-commerce store.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn("scroll-smooth", inter.variable, outfit.variable, "font-sans", geist.variable)}>
      <body className="font-sans antialiased text-slate-900 bg-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
