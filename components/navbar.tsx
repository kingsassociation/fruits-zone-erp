"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ShoppingBasket, ArrowRight, Zap } from "lucide-react"
import { useState, useEffect } from "react"
import { Session } from "next-auth"
import { cn } from "@/lib/utils"

export default function Navbar({ session }: { session: Session | null }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Change background on scroll for premium feel
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Features", href: "/features" },
    { name: "Logistics", href: "/logistics" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <nav className={cn(
      "fixed top-0 z-50 w-full transition-all duration-500",
      scrolled
        ? "bg-white/80 backdrop-blur-xl border-b border-slate-100 py-3 shadow-md"
        : "bg-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-orange-600 p-2 rounded-xl text-white shadow-lg shadow-orange-200 group-hover:scale-110 transition-transform">
                <ShoppingBasket size={24} />
              </div>
              <span className="text-2xl font-black font-outfit tracking-tighter uppercase whitespace-nowrap">
                <span className="text-emerald-600">Fruits</span>
                <span className="text-orange-500">Zone</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-xs font-black uppercase tracking-[0.2em] transition-all hover:text-orange-500 relative py-1",
                  pathname === link.href
                    ? "text-orange-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-orange-600 after:rounded-full"
                    : "text-slate-500"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {session ? (
              <Button asChild className="bg-slate-900 hover:bg-slate-800 text-white rounded-2xl px-8 h-12 font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-200">
                <Link href="/dashboard">
                  Dashboard
                </Link>
              </Button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-xs font-black uppercase tracking-widest text-slate-600 hover:text-orange-500 transition-colors mr-4"
                >
                  Log in
                </Link>
                <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white rounded-2xl px-8 h-12 font-black text-xs uppercase tracking-widest shadow-xl shadow-orange-200 gap-2">
                  <Link href="/register">Join Network <ArrowRight size={14} /></Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-900 border border-slate-100 p-2 rounded-xl bg-white/50 hover:bg-orange-50 transition-all"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="px-6 pt-4 pb-10 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "block px-4 py-4 rounded-2xl text-lg font-black uppercase tracking-widest transition-all",
                  pathname === link.href
                    ? "bg-orange-50 text-orange-600"
                    : "text-slate-700 hover:bg-slate-50"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-6 flex flex-col gap-4 border-t border-slate-100">
              {session ? (
                <Button asChild className="w-full h-16 bg-slate-900 hover:bg-slate-800 rounded-2xl font-black text-lg shadow-lg">
                  <Link href="/dashboard">
                    Go to Dashboard
                  </Link>
                </Button>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex items-center justify-center h-16 text-lg font-black uppercase tracking-widest text-slate-700 border-2 border-slate-100 rounded-2xl hover:bg-slate-50 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Log in
                  </Link>
                  <Button asChild className="w-full h-16 bg-orange-600 hover:bg-orange-700 rounded-2xl font-black text-xl uppercase tracking-widest shadow-xl shadow-orange-200 gap-3">
                    <Link href="/register" onClick={() => setIsOpen(false)}>
                      Join Network <ArrowRight size={24} />
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
