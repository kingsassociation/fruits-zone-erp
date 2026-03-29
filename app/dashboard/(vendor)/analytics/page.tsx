import { getVendorSales } from "@/lib/sale-actions"
import { getVendorInventory } from "@/lib/inventory-actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
   TrendingUp,
   BarChart3,
   PieChart,
   ArrowUpRight,
   ArrowDownRight,
   TrendingDown,
   Activity,
   Layers,
   ArrowRight
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function VendorAnalyticsPage() {
   const sales = await getVendorSales()
   const inventory = await getVendorInventory()

   const totalRevenue = sales.reduce((sum, sale) => sum + Number(sale.totalAmount), 0)
   const totalItemsSold = sales.reduce((sum, sale) => sum + sale.items.length, 0)

   // Mock performance data for visual flair
   const performanceData = [
      { day: "Mon", sales: 1200 },
      { day: "Tue", sales: 1800 },
      { day: "Wed", sales: 1400 },
      { day: "Thu", sales: 2600 },
      { day: "Fri", sales: 2200 },
      { day: "Sat", sales: 3800 },
      { day: "Sun", sales: 3200 },
   ]

   const maxVal = Math.max(...performanceData.map(d => d.sales))

   return (
      <div className="space-y-8 animate-in fade-in duration-700">
         <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-extrabold font-outfit text-slate-900 tracking-tight">Business Intelligence</h1>
            <p className="text-slate-400 uppercase tracking-[0.2em] font-black text-[10px]">
               Advanced analytics and performance tracking for your FruitsZone shop.
            </p>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Revenue Overview */}
            <Card className="lg:col-span-2 border-none shadow-sm shadow-slate-200/50 bg-white rounded-3xl p-8">
               <div className="flex justify-between items-start mb-10">
                  <div className="space-y-1">
                     <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Revenue Growth (Weekly)</p>
                     <h3 className="text-4xl font-black font-outfit text-slate-900 tracking-tighter leading-none">৳{totalRevenue.toLocaleString()}</h3>
                  </div>
                  <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg px-3 py-1 font-bold text-xs flex items-center gap-1">
                     <ArrowUpRight size={14} /> +24.8%
                  </Badge>
               </div>

               <div className="h-64 flex items-end justify-between gap-4 px-2">
                  {performanceData.map((d, i) => (
                     <div key={i} className="flex-grow flex flex-col items-center group">
                        <div
                           className="w-full bg-slate-50 group-hover:bg-orange-600 rounded-xl transition-all duration-500 relative cursor-pointer"
                           style={{ height: `${(d.sales / maxVal) * 100}%` }}
                        >
                           <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              ৳{d.sales.toLocaleString()}
                           </div>
                        </div>
                        <p className="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">{d.day}</p>
                     </div>
                  ))}
               </div>
            </Card>

            <div className="space-y-8">
               {/* Quick Stats Column */}
               <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-3xl p-8 group hover:shadow-xl hover:shadow-emerald-50 transition-all duration-500">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                     <TrendingUp size={24} />
                  </div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Items Sold</p>
                  <h4 className="text-3xl font-black font-outfit text-slate-900 leading-none mb-4">{totalItemsSold} Units</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                     Your throughput has increased by **12%** compared to last period.
                  </p>
               </Card>

               <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-3xl p-8 group hover:shadow-xl hover:shadow-orange-50 transition-all duration-500">
                  <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:scale-110 transition-transform">
                     <Activity size={24} />
                  </div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Conversion Rate</p>
                  <h4 className="text-3xl font-black font-outfit text-slate-900 leading-none mb-4">68.4%</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                     Walk-in visitors to customer conversion is above regional average.
                  </p>
               </Card>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Inventory Health */}
            <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-3xl p-8 overflow-hidden relative">
               <div className="absolute top-0 right-0 p-8 text-slate-50 transform rotate-12 scale-150 -z-0">
                  <Layers size={80} />
               </div>
               <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                  <div className="space-y-1">
                     <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Inventory Diversity</p>
                     <h4 className="text-2xl font-black font-outfit text-slate-900">{inventory.length} Product Categories</h4>
                  </div>
                  <div className="space-y-4">
                     <div className="p-4 bg-orange-50 rounded-2xl flex items-center justify-between border border-orange-100/50">
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Low Stock Items</span>
                        <span className="text-lg font-black font-outfit text-orange-600">4 Items</span>
                     </div>
                     <Button asChild variant="ghost" className="w-full h-12 rounded-xl text-slate-400 hover:text-slate-900 group">
                        <Link href="/dashboard/inventory" className="flex items-center gap-2 font-black text-xs uppercase tracking-[0.2em]">
                           Full Stock Audit <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                     </Button>
                  </div>
               </div>
            </Card>

            {/* Sales Composition (Mock) */}
            <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-3xl p-8">
               <div className="space-y-1 mb-8">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Sales Composition</p>
                  <h4 className="text-2xl font-black font-outfit text-slate-900">Revenue by Category</h4>
               </div>
               <div className="space-y-6">
                  <div className="space-y-2">
                     <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">
                        <span>Fresh Fruits</span>
                        <span className="text-slate-900">62%</span>
                     </div>
                     <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: '62%' }} />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">
                        <span>Nuts & COMBO</span>
                        <span className="text-slate-900">28%</span>
                     </div>
                     <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 rounded-full transition-all duration-1000" style={{ width: '28%' }} />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500 px-1">
                        <span>Dry Fruits</span>
                        <span className="text-slate-900">10%</span>
                     </div>
                     <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-300 rounded-full transition-all duration-1000" style={{ width: '10%' }} />
                     </div>
                  </div>
               </div>
            </Card>
         </div>
      </div>
   )
}
