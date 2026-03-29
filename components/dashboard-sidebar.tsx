"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  ShoppingBasket, 
  Package, 
  Tag, 
  Users, 
  BarChart3, 
  FileText, 
  ShoppingCart, 
  History, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Settings
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { signOut } from "next-auth/react"

export default function Sidebar({ 
  role, 
  user, 
  isOpen, 
  setIsOpen 
}: { 
  role: string; 
  user: any;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const adminLinks = [
    { name: "Overview", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Fruits", href: "/dashboard/fruits", icon: <Package size={20} /> },
    { name: "Stock", href: "/dashboard/stock", icon: <ShoppingBasket size={20} /> },
    { name: "Offers", href: "/dashboard/offers", icon: <Tag size={20} /> },
    { name: "Vendors", href: "/dashboard/vendors", icon: <Users size={20} /> },
    { name: "Reports", href: "/dashboard/reports", icon: <BarChart3 size={20} /> },
  ]

  const vendorLinks = [
    { name: "Overview", href: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "My Sales", href: "/dashboard/my-sales", icon: <History size={20} /> },
    { name: "Stock Request", href: "/dashboard/stock-request", icon: <FileText size={20} /> },
    { name: "Orders", href: "/dashboard/orders", icon: <ShoppingCart size={20} /> },
    { name: "Analytics", href: "/dashboard/analytics", icon: <BarChart3 size={20} /> },
  ]


  const links = role === "ADMIN" ? adminLinks : vendorLinks

  return (
    <aside 
      className={`bg-slate-900 text-slate-300 flex flex-col transition-all duration-300 border-r border-slate-800 fixed lg:static inset-y-0 left-0 z-50 ${
        isCollapsed ? "w-20" : "w-64"
      } ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
    >
      <div className="p-6 flex items-center justify-between">
        {!isCollapsed && (
          <Link href="/" className="flex items-center gap-2 animate-in fade-in duration-500">
             <div className="bg-orange-600 p-1 rounded-lg text-white shrink-0">
               <ShoppingBasket size={20} />
             </div>
             <span className="text-lg font-black font-outfit uppercase tracking-tight truncate">
               <span className="text-emerald-600">Fruits</span>
               <span className="text-orange-500">Zone</span>
             </span>
          </Link>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-white mx-auto"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="flex-1 px-4 space-y-2 py-4 overflow-y-auto">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all group ${
              pathname === link.href 
                ? "bg-orange-600/10 text-orange-400 border border-orange-600/20" 
                : "hover:bg-slate-800 hover:text-white"
            }`}
          >
            <div className={`shrink-0 transition-transform group-hover:scale-110 ${pathname === link.href ? "text-orange-500" : ""}`}>
              {link.icon}
            </div>
            {!isCollapsed && (
              <span className="text-sm font-medium animate-in fade-in slide-in-from-left-2 duration-300">
                {link.name}
              </span>
            )}
          </Link>
        ))}
      </div>

      <div className="p-4">
        <Separator className="bg-slate-800/50" />
        <p className="mt-4 text-[10px] text-center font-black uppercase tracking-widest text-slate-600 select-none">
          FruitsZone v1.2
        </p>
      </div>
    </aside>
  )
}
