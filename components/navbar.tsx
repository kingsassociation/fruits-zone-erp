"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ShoppingBasket } from "lucide-react"
import { useState } from "react"
import { Session } from "next-auth"

export default function Navbar({ session }: { session: Session | null }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-emerald-600 p-1.5 rounded-lg text-white">
                <ShoppingBasket size={24} />
              </div>
              <span className="text-xl font-bold font-outfit text-slate-900 tracking-tight">
                FruitsZone<span className="text-emerald-600 italic ml-0.5 mt-0.5">ERP</span>
              </span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-emerald-600 ${
                  pathname === link.href ? "text-emerald-600" : "text-slate-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {session ? (
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6">
                <Link href={session.user?.role === "ADMIN" ? "/dashboard/admin" : "/dashboard/vendor"}>
                  Dashboard
                </Link>
              </Button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
                >
                  Log in
                </Link>
                <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6 shadow-sm shadow-emerald-200">
                  <Link href="/register">Become a Partner</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-emerald-600 transition-colors"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3 border-t border-slate-100">
              {session ? (
                <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 shadow-md">
                  <Link href={session.user?.role === "ADMIN" ? "/dashboard/admin" : "/dashboard/vendor"}>
                    Dashboard
                  </Link>
                </Button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex items-center justify-center py-2 text-base font-medium text-slate-700 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Log in
                  </Link>
                  <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 shadow-md">
                    <Link href="/register" onClick={() => setIsOpen(false)}>
                      Become a Partner
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
