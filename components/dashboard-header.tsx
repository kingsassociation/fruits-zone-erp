"use client"

import { Bell, Search, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

import { signOut } from "next-auth/react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function DashboardHeader({ 
  user, 
  toggleSidebar 
}: { 
  user: any; 
  toggleSidebar: () => void;
}) {
  const router = useRouter()
  const role = user?.role

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const q = formData.get("q") as string
    if (q) {
      const target = role === "ADMIN" ? "/dashboard/fruits" : "/dashboard/inventory"
      router.push(`${target}?q=${encodeURIComponent(q)}`)
    }
  }
  return (

    <header className="h-20 bg-white border-b border-slate-200 px-4 lg:px-10 flex items-center justify-between sticky top-0 z-40 shadow-sm shadow-slate-100/50">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-all lg:hidden"
        >
          <Menu size={24} />
        </button>

        <form onSubmit={handleSearch} className="relative max-w-md w-full hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input
            name="q"
            placeholder="Quick search fruits..."
            className="pl-10 h-11 bg-slate-50 border-slate-100 rounded-xl focus:bg-white transition-all shadow-none w-[300px] lg:w-[400px]"
          />
        </form>
      </div>

      <div className="flex items-center gap-4 lg:gap-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors group">
              <Bell size={22} className="group-hover:rotate-12 transition-transform" />
              <Badge className="absolute top-1 right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500 border-2 border-white rounded-full text-[10px] animate-bounce">
                3
              </Badge>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-2 rounded-2xl border-slate-100 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
             <div className="px-4 py-3 border-b border-slate-50">
               <p className="text-xs font-black uppercase tracking-widest text-slate-900">Recent Activity</p>
             </div>
             <div className="py-2">
                <div className="px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group">
                   <p className="text-[11px] font-bold text-slate-900 leading-tight">New Vendor Registration</p>
                   <p className="text-[10px] text-slate-400 mt-0.5">Fresh Farm Pro just joined the network.</p>
                </div>
                <div className="px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group">
                   <p className="text-[11px] font-bold text-slate-900 leading-tight">Stock Alert: Mango</p>
                   <p className="text-[10px] text-slate-400 mt-0.5">Vendor 'Fruitopia' is low on Rajshahi Mango.</p>
                </div>
                <div className="px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group">
                   <p className="text-[11px] font-bold text-emerald-600 leading-tight">Campaign Launched</p>
                   <p className="text-[10px] text-slate-400 mt-0.5">Festive Summer Sale is now live.</p>
                </div>
             </div>
             <div className="p-2 mt-1 border-t border-slate-50">
                <Button variant="ghost" className="w-full text-[10px] font-black uppercase tracking-widest text-slate-400 py-1 h-8 rounded-lg">View All Hub Alerts</Button>
             </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="h-6 w-[1px] bg-slate-200 hidden sm:block" />

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 p-1 rounded-full hover:bg-slate-50 transition-all outline-none group border border-transparent hover:border-slate-100">
            <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white ring-2 ring-orange-500 ring-offset-2 overflow-hidden shadow-lg shadow-orange-100">
              {user?.image ? (
                <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <User size={20} />
              )}
            </div>
            <div className="hidden sm:block text-left pr-2">
              <p className="text-sm font-bold text-slate-900 truncate leading-none">
                {user?.name || "User Name"}
              </p>
              <p className="text-xs text-slate-400 font-medium">
                {user?.email}
              </p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 p-2 rounded-2xl border-slate-100 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <DropdownMenuLabel className="font-bold text-slate-900 p-2 text-xs uppercase tracking-widest text-slate-400">Hub Management</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-100" />
            <DropdownMenuItem asChild className="rounded-xl py-3 focus:bg-orange-50 focus:text-orange-700 cursor-pointer transition-colors group">
              <Link href="/dashboard/settings?tab=profile" className="flex items-center gap-3 w-full">
                <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 group-focus:bg-orange-600 group-focus:text-white transition-colors">
                  <User size={16} />
                </div>
                <span className="font-bold">Profile Details</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="rounded-xl py-3 focus:bg-orange-50 focus:text-orange-700 cursor-pointer transition-colors group">
              <Link href="/dashboard/settings?tab=notifications" className="flex items-center gap-3 w-full">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 group-focus:bg-emerald-600 group-focus:text-white transition-colors">
                  <Bell size={16} />
                </div>
                <span className="font-bold">Notifications</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="rounded-xl py-3 focus:bg-orange-50 focus:text-orange-700 cursor-pointer transition-colors group">
              <Link href="/dashboard/settings?tab=security" className="flex items-center gap-3 w-full">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-focus:bg-blue-600 group-focus:text-white transition-colors">
                  <Search size={16} />
                </div>
                <span className="font-bold">Security Sync</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-100" />
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="rounded-xl py-4 mx-1 text-red-500 focus:bg-red-50 focus:text-red-600 cursor-pointer transition-colors font-black text-[10px] uppercase tracking-[0.2em] flex justify-center"
            >
              Terminate Session
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
