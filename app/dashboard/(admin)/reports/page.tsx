import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  ArrowUpRight, 
  ArrowDownRight,
  Download,
  Calendar,
  FileSpreadsheet
} from "lucide-react"
import { Button } from "@/components/ui/button"
import prisma from "@/lib/prisma"

export default async function AdminReportsPage() {
  const partnersCount = await prisma.vendor.count()
  const activeOffers = await prisma.offer.count({ where: { isActive: true } })
  
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold font-outfit text-slate-900 tracking-tight">Platform Intelligence</h1>
          <p className="text-slate-500 uppercase tracking-[0.2em] font-black text-[10px]">
             Comprehensive analytics and platform health metrics.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-12 px-6 rounded-xl border-slate-200 flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-slate-500">
              <Download size={18} /> Export
           </Button>
           <Button className="bg-slate-900 hover:bg-slate-800 h-12 px-6 rounded-xl text-white shadow-xl shadow-slate-200 flex items-center gap-2 font-bold text-xs uppercase tracking-widest">
              <Calendar size={18} /> Custom Range
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-2xl">
            <CardHeader className="pb-2">
               <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
                  Total Partners
                  <Users size={14} className="text-emerald-500" />
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-black text-slate-900 font-outfit">{partnersCount}</div>
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                     <ArrowUpRight size={12} /> 12%
                  </span>
               </div>
            </CardContent>
         </Card>
         <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-2xl">
            <CardHeader className="pb-2">
               <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
                  Platform GMV
                  <TrendingUp size={14} className="text-orange-500" />
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-black text-slate-900 font-outfit">৳4.2M</div>
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-0.5">
                     <ArrowUpRight size={12} /> 8.4%
                  </span>
               </div>
            </CardContent>
         </Card>
         <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-2xl">
            <CardHeader className="pb-2">
               <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
                  Active Campaigns
                  <ShoppingBag size={14} className="text-blue-500" />
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-black text-slate-900 font-outfit">{activeOffers}</div>
                  <span className="text-xs font-bold text-red-600 flex items-center gap-0.5">
                     <ArrowDownRight size={12} /> 2
                  </span>
               </div>
            </CardContent>
         </Card>
         <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-2xl">
            <CardHeader className="pb-2">
               <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
                  Support Tickets
                  <BarChart3 size={14} className="text-purple-500" />
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex items-baseline gap-2">
                  <div className="text-3xl font-black text-slate-900 font-outfit">14</div>
                  <span className="text-xs font-bold text-slate-400">Stable</span>
               </div>
            </CardContent>
         </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-3xl p-8 group">
            <div className="flex items-center justify-between mb-8">
               <div className="space-y-1">
                  <h4 className="text-lg font-black font-outfit text-slate-900">Partner Acquisition</h4>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Last 30 Days Growth</p>
               </div>
               <FileSpreadsheet className="text-emerald-500 opacity-20 group-hover:opacity-100 transition-opacity" size={40} />
            </div>
            <div className="space-y-6">
               <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  The platform has seen a healthy **12.4%** increase in partner registration. Most new signups are choosing the **"Pro"** subscription plan.
               </p>
               <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: '74%' }} />
               </div>
            </div>
         </Card>

         <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-3xl p-8 group">
            <div className="flex items-center justify-between mb-8">
               <div className="space-y-1">
                  <h4 className="text-lg font-black font-outfit text-slate-900">Platform Stability</h4>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Uptime & Latency</p>
               </div>
               <BarChart3 className="text-blue-500 opacity-20 group-hover:opacity-100 transition-opacity" size={40} />
            </div>
            <div className="space-y-6">
               <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  Edge response times are currently averaging **14ms**. All critical procurement systems are operational.
               </p>
               <div className="flex gap-1 h-8 items-end">
                  {[...Array(20)].map((_, i) => (
                     <div 
                        key={i} 
                        className="flex-1 bg-emerald-500/20 rounded-t group-hover:bg-emerald-500 transition-all duration-500"
                        style={{ height: `${Math.random() * 100}%` }}
                     />
                  ))}
               </div>
            </div>
         </Card>
      </div>
    </div>
  )
}
