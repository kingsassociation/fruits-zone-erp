"use client"

import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  User, 
  Settings, 
  ShieldCheck, 
  Bell, 
  CreditCard, 
  Smartphone,
  CheckCircle2,
  Mail,
  Camera,
  ChevronRight,
  Loader2,
  Lock,
  Eye,
  EyeOff
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { toast } from "sonner"

function SettingsContent() {
  const { data: session, status } = useSession()
  const user = session?.user
  const searchParams = useSearchParams()
  const router = useRouter()
  const activeTab = searchParams.get("tab") || "profile"
  
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSync = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    toast.success("Security & Profile Hub Synchronized")
    setLoading(false)
  }

  const tabs = [
    { id: "profile", name: "General Profile", icon: <User size={18} /> },
    { id: "security", name: "Security Sync", icon: <ShieldCheck size={18} /> },
    { id: "notifications", name: "Notifications", icon: <Bell size={18} /> },
  ]

  if (status === "loading") return <div className="py-20 text-center font-black text-xs uppercase tracking-widest text-slate-400 animate-pulse">Synchronizing Hub...</div>

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-black font-outfit text-slate-900 tracking-tighter uppercase">Account Settings</h1>
        <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Manage your profile, security, and administrative preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        <aside className="md:col-span-1 space-y-6">
           <nav className="space-y-1">
              {tabs.map((item) => (
                <button
                  key={item.id}
                  onClick={() => router.push(`/dashboard/settings?tab=${item.id}`)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-black uppercase tracking-widest transition-all ${
                    activeTab === item.id ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                  }`}
                >
                  {item.icon}
                  <span className="hidden lg:block">{item.name}</span>
                </button>
              ))}
           </nav>
        </aside>

        <main className="md:col-span-3 space-y-10 pb-20">
           {activeTab === "profile" && (
             <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-500">
                <CardHeader className="bg-slate-50/50 border-b border-slate-100 p-8">
                   <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="relative group">
                         <div className="w-24 h-24 rounded-[2rem] bg-orange-600 flex items-center justify-center text-white text-4xl font-black font-outfit border-4 border-white shadow-2xl transition-transform group-hover:scale-105">
                            {user?.name?.[0].toUpperCase()}
                         </div>
                         <button className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-2 rounded-xl shadow-xl hover:bg-orange-600 transition-colors">
                            <Camera size={16} />
                         </button>
                      </div>
                      <div className="text-center sm:text-left space-y-1">
                         <h3 className="text-2xl font-black font-outfit text-slate-900 leading-none">{user?.name}</h3>
                         <p className="text-slate-400 font-bold text-sm">{user?.email}</p>
                         <div className="pt-2">
                            <div className="bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg px-3 py-0.5 text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-1">
                               <CheckCircle2 size={12} /> Verified Identity
                            </div>
                         </div>
                      </div>
                   </div>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Full Brand Name</label>
                         <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <Input defaultValue={user?.name || ""} className="pl-11 h-14 bg-slate-50/50 border-slate-100 rounded-2xl focus:ring-slate-900 transition-all font-bold text-slate-900 shadow-none border-none" />
                         </div>
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Global Identifier (Email)</label>
                         <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <Input readOnly defaultValue={user?.email || ""} className="pl-11 h-14 bg-slate-100/50 border-slate-100 rounded-2xl font-bold text-slate-400 select-none shadow-none border-none" />
                         </div>
                      </div>
                   </div>

                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Communication Channel</label>
                      <div className="relative">
                         <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                         <Input placeholder="+880 1XXX-XXXXXX" className="pl-11 h-14 bg-slate-50/50 border-slate-100 rounded-2xl focus:ring-slate-900 transition-all font-bold text-slate-900 shadow-none border-none" />
                      </div>
                   </div>

                   <div className="pt-4 flex justify-end">
                      <Button 
                        onClick={handleSync}
                        disabled={loading}
                        className="bg-slate-900 hover:bg-slate-800 h-14 px-10 rounded-2xl text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 active:scale-95 transition-all gap-2"
                      >
                         {loading ? <Loader2 size={16} className="animate-spin" /> : "Sync All Changes"}
                      </Button>
                   </div>
                </CardContent>
             </Card>
           )}

           {activeTab === "security" && (
             <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
                <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-3xl overflow-hidden p-8">
                   <div className="space-y-6">
                      <div className="space-y-1">
                        <h3 className="text-xl font-black font-outfit text-slate-900 uppercase">Change Secret Passphrase</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Ensures your hub remains protected from unauthorized access.</p>
                      </div>
                      <div className="space-y-4">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Current Passphrase</label>
                            <Input type="password" placeholder="••••••••" className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl focus:ring-slate-900 shadow-none border-none" />
                         </div>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">New Passphrase</label>
                               <Input type="password" placeholder="••••••••" className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl focus:ring-slate-900 shadow-none border-none" />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Verify New Passphrase</label>
                               <Input type="password" placeholder="••••••••" className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl focus:ring-slate-900 shadow-none border-none" />
                            </div>
                         </div>
                         <div className="pt-2">
                            <Button onClick={handleSync} disabled={loading} className="w-full h-14 bg-blue-600 hover:bg-blue-700 rounded-2xl font-black text-[10px] uppercase tracking-widest text-white shadow-xl shadow-blue-100">
                               {loading ? <Loader2 size={16} className="animate-spin" /> : "Update Credentials"}
                            </Button>
                         </div>
                      </div>
                   </div>
                </Card>

                <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-3xl overflow-hidden border-l-4 border-l-orange-500">
                   <CardContent className="p-8 flex items-center justify-between">
                      <div className="space-y-2">
                         <h4 className="text-xl font-black font-outfit text-slate-900 uppercase">Two-Factor Authentication</h4>
                         <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-sm">
                            Add an extra layer of protection to your account with 2FA using an authenticator app.
                         </p>
                      </div>
                      <Button variant="outline" className="h-12 px-6 rounded-2xl border-slate-100 text-slate-900 font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all">
                         Secure Hub
                      </Button>
                   </CardContent>
                </Card>
             </div>
           )}

           {activeTab === "notifications" && (
             <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-3xl overflow-hidden p-8 animate-in fade-in zoom-in-95 duration-500">
                <div className="space-y-8">
                   <div className="space-y-1">
                      <h3 className="text-xl font-black font-outfit text-slate-900 uppercase">Communication Preferences</h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Select how you want to receive hub updates and alerts.</p>
                   </div>
                   <div className="space-y-4">
                      {[
                        { title: "Order Management Updates", desc: "Get notified when a new order is received or processed." },
                        { title: "Security Alerts", desc: "Receive alerts for suspicious login attempts or credential changes." },
                        { title: "Marketing Campaigns", desc: "Stay updated on the latest seasonal offers and global campaigns." },
                        { title: "System Broadcasts", desc: "Important maintenance and feature update notifications." }
                      ].map((pref, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl hover:bg-white hover:shadow-md transition-all group border border-transparent hover:border-slate-100">
                           <div className="space-y-0.5">
                              <p className="text-sm font-black text-slate-900 uppercase tracking-tight">{pref.title}</p>
                              <p className="text-[10px] text-slate-400 font-bold">{pref.desc}</p>
                           </div>
                           <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer shadow-inner">
                              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                           </div>
                        </div>
                      ))}
                   </div>
                   <div className="pt-4">
                      <Button onClick={handleSync} disabled={loading} className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-black text-[10px] uppercase tracking-widest text-white shadow-xl shadow-emerald-100">
                         {loading ? <Loader2 size={16} className="animate-spin" /> : "Save Preferences"}
                      </Button>
                   </div>
                </div>
             </Card>
           )}
        </main>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <Suspense fallback={<div>Loading Settings Hub...</div>}>
      <SettingsContent />
    </Suspense>
  )
}
