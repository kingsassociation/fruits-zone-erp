import prisma from "@/lib/prisma"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  History, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  CheckCircle2,
  Users,
  XCircle
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default async function VendorDashboardPage() {
  const session = await auth()
  
  if (!session) {
    redirect("/login")
  }

  const user = session.user as any
  const vendor = await prisma.vendor.findUnique({
    where: { userId: user.id },
    include: {
      subscription: {
        include: {
          plan: true
        }
      },
      inventory: true,
      customers: true,
      sales: true,
    }
  })

  if (!vendor) {
    return <div className="p-8 text-center text-slate-500 italic">Vendor profile not found. Please contact support.</div>;
  }


  // Calculate stats
  const totalSalesAmount = vendor.sales.reduce((acc: number, curr: any) => acc + Number(curr.totalAmount), 0)
  const totalDueAmount = vendor.customers.reduce((acc: number, curr: any) => acc + Number(curr.totalDue), 0)
  const totalInventoryUnits = vendor.inventory.reduce((acc: number, curr: any) => acc + curr.quantity, 0)
  const activeOrdersCount = await prisma.purchaseOrder.count({
    where: { vendorId: vendor.id, status: { in: ["PENDING", "PROCESSING", "SHIPPED"] } }
  })

  // Recent data
  const recentOrders = await prisma.purchaseOrder.findMany({
    where: { vendorId: vendor.id },
    orderBy: { createdAt: "desc" },
    take: 5
  })

  const recentSales = await prisma.sale.findMany({
    where: { vendorId: vendor.id },
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { items: { include: { fruit: true } } }
  })

  const kpis = [
    {
      title: "Current Stock",
      value: `${totalInventoryUnits} Units`,
      description: `Across ${vendor.inventory.length} Varieties`,
      icon: <Package className="w-5 h-5 text-orange-500" />,
      trend: "up",
    },
    {
      title: "Total Sales",
      value: `৳${totalSalesAmount.toLocaleString()}`,
      description: "Lifetime revenue",
      icon: <TrendingUp className="w-5 h-5 text-blue-500" />,
      trend: "up",
    },
    {
      title: "Udhar (Credit)",
      value: `৳${totalDueAmount.toLocaleString()}`,
      description: "Outstanding receivable",
      icon: <Users className="w-5 h-5 text-orange-500" />,
      trend: "neutral",
    },
    {
      title: "Active Orders",
      value: activeOrdersCount.toString(),
      description: "Stock requests pending",
      icon: <ShoppingCart className="w-5 h-5 text-purple-500" />,
      trend: "neutral",
    },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold font-outfit text-slate-900 tracking-tight">Partner Dashboard</h1>
        <p className="text-slate-500 uppercase tracking-[0.2em] font-black text-[10px] flex items-center gap-2">
           <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" /> {vendor.businessName} • Chattogram
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <Card key={idx} className="border-none shadow-sm shadow-slate-200/50 hover:shadow-md transition-shadow duration-300 bg-white rounded-2xl overflow-hidden group">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-widest leading-none">{kpi.title}</CardTitle>
              <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                {kpi.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-slate-900 font-outfit">{kpi.value}</div>
              <p className="text-xs font-semibold text-slate-400 mt-1">{kpi.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

          {/* Localized Identity Section */}
      <Card className="border-none shadow-sm bg-white p-8 rounded-3xl flex flex-col md:flex-row items-center gap-6">
        <div className="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 font-black text-3xl font-outfit shadow-inner">
           {vendor.businessName.charAt(0)}
        </div>
        <div className="flex-grow space-y-2 text-center md:text-left">
           <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
             <h2 className="text-2xl font-bold font-outfit text-slate-900">{vendor.businessName}</h2>
             <Badge className="bg-orange-100 text-orange-700 border-none uppercase text-[10px] font-black tracking-widest">{vendor.status}</Badge>
           </div>
           <p className="text-slate-500 text-sm max-w-md">Certified partner since {new Date(vendor.createdAt).toLocaleDateString()}. Operating from {vendor.address || "Chattogram Hub"}.</p>
        </div>
        <div className="flex gap-4">
           <Button variant="outline" className="h-12 px-6 rounded-xl border-slate-100 text-slate-600 font-bold text-xs uppercase tracking-widest">
              Print QR Code
           </Button>
           <Button className="h-12 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-widest">
              Edit Shop Profile
           </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
        {/* Recent Purchase Orders */}
        <Card className="lg:col-span-4 border-none shadow-sm bg-white rounded-3xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between bg-slate-50/50 border-b border-slate-100 px-8 py-6">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold font-outfit text-slate-900">Purchase Orders</CardTitle>
              <p className="text-sm text-slate-500 leading-none">Your recent stock requests from the hub.</p>
            </div>
            <Button variant="outline" className="h-10 px-4 rounded-xl border-slate-200 text-xs font-bold uppercase tracking-widest">
              View All
            </Button>
          </CardHeader>
          <CardContent className="p-0">
             <div className="divide-y divide-slate-50">
                {recentOrders.length === 0 ? (
                  <div className="px-8 py-10 text-center text-slate-400 italic">No recent stock requests.</div>
                ) : (
                  recentOrders.map((order: any) => (
                    <div key={order.id} className="px-8 py-5 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                       <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-500">
                             <ShoppingCart size={18} />
                          </div>
                          <div>
                             <p className="font-bold text-slate-900">#{order.id.slice(-6).toUpperCase()}</p>
                             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                               {new Date(order.createdAt).toLocaleDateString()}
                             </p>
                          </div>
                       </div>
                       <div className="flex items-center gap-6">
                          <p className="font-outfit font-black text-slate-900">৳{Number(order.totalAmount).toLocaleString()}</p>
                          <Badge className={`border-none px-3 py-1 font-bold rounded-full text-[10px] uppercase tracking-wider ${
                            order.status === 'DELIVERED' ? 'bg-orange-100 text-orange-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {order.status}
                          </Badge>
                       </div>
                    </div>
                  ))
                )}
             </div>
          </CardContent>
        </Card>

        {/* My Last Sales */}
        <Card className="lg:col-span-3 border-none shadow-sm bg-white rounded-3xl overflow-hidden self-start">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-8 py-6">
            <CardTitle className="text-xl font-bold font-outfit text-slate-900">Recent Sales</CardTitle>
            <p className="text-sm text-slate-500 leading-none">Your local consumer deliveries.</p>
          </CardHeader>
          <CardContent className="p-6">
             <div className="space-y-6">
                {recentSales.length === 0 ? (
                  <div className="text-center text-slate-400 italic text-sm py-4">No sales recorded yet.</div>
                ) : (
                  recentSales.map((sale: any) => (
                    <div key={sale.id} className="flex items-center justify-between group">
                      <div className="flex items-start gap-4">
                         <div className="w-2 h-10 rounded-full bg-orange-500/10 group-hover:bg-orange-500 transition-colors" />
                         <div>
                           <p className="text-sm font-bold text-slate-900 leading-tight">
                             {sale.items.map((item: any) => item.fruit.name).join(", ").slice(0, 30)}...
                           </p>
                           <p className="text-[10px] text-slate-400 font-medium">
                             {new Date(sale.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                           </p>
                         </div>
                      </div>
                      <p className="text-sm font-black text-orange-600 font-outfit">+ ৳{Number(sale.totalAmount).toLocaleString()}</p>
                    </div>
                  ))
                )}
             </div>
             <Button className="w-full mt-8 h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold uppercase tracking-widest gap-2">
               <History size={16} /> All Sales History
             </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
