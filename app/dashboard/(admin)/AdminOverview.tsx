import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Package, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  ShoppingCart, 
  ArrowUpRight, 
  ArrowDownRight
} from "lucide-react"

export default async function AdminDashboardPage() {
  const session = await auth()
  
  if (!session || (session.user as any).role !== "ADMIN") {
    return null;
  }


  const kpis = [
    {
      title: "Total Revenue",
      value: "৳1,24,500",
      description: "+12.5% from last month",
      icon: <TrendingUp className="w-5 h-5 text-orange-500" />,
      trend: "up",
    },
    {
      title: "Active Vendors",
      value: "42",
      description: "4 pending approvals",
      icon: <Users className="w-5 h-5 text-blue-500" />,
      trend: "up",
    },
    {
      title: "Total Fruits",
      value: "128",
      description: "Across 6 categories",
      icon: <Package className="w-5 h-5 text-orange-500" />,
      trend: "neutral",
    },
    {
      title: "Pending Orders",
      value: "14",
      description: "Requires immediate action",
      icon: <ShoppingCart className="w-5 h-5 text-purple-500" />,
      trend: "down",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold font-outfit text-slate-900 tracking-tight">Admin Overview</h1>
        <p className="text-slate-500">Welcome back, {session.user?.name}. Here&apos;s what&apos;s happening with FruitsZone today.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, idx) => (
          <Card key={idx} className="border-none shadow-sm shadow-slate-200/50 hover:shadow-md transition-shadow duration-300 bg-white rounded-2xl overflow-hidden group">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-widest">{kpi.title}</CardTitle>
              <div className="p-2 bg-slate-50 rounded-xl group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                {kpi.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-slate-900 font-outfit">{kpi.value}</div>
              <div className="flex items-center gap-1 mt-1">
                {kpi.trend === "up" && <ArrowUpRight className="w-4 h-4 text-orange-500" />}
                {kpi.trend === "down" && <ArrowDownRight className="w-4 h-4 text-red-500" />}
                <p className={`text-xs font-semibold ${
                  kpi.trend === "up" ? "text-orange-600" : 
                  kpi.trend === "down" ? "text-red-600" : "text-slate-400"
                }`}>
                  {kpi.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
        {/* Low Stock Alerts */}
        <Card className="lg:col-span-4 border-none shadow-sm shadow-slate-200/50 bg-white rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl font-bold font-outfit text-slate-900">Low Stock Alerts</CardTitle>
              <p className="text-sm text-slate-500">Fruits currently under the safety threshold.</p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-amber-600">
               <AlertTriangle size={20} />
            </div>
          </CardHeader>
          <CardContent>
             <div className="space-y-6 pt-4">
                {[
                  { name: "Green Apple (Premium)", stock: 8, threshold: 15, category: "Fresh Fruits" },
                  { name: "Roasted Almonds (USA)", stock: 4, threshold: 10, category: "Nuts" },
                  { name: "Thai Guava", stock: 12, threshold: 20, category: "Fresh Fruits" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center font-bold text-slate-400 border border-slate-100 group-hover:border-amber-200 transition-colors">
                         {item.name[0]}
                       </div>
                       <div>
                         <p className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{item.name}</p>
                         <p className="text-xs text-slate-400">{item.category}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-sm font-bold text-red-500">{item.stock} {item.stock < 5 ? 'critical' : 'kg'} Left</p>
                       <p className="text-[10px] uppercase font-bold text-slate-400">Min Threshold: {item.threshold}kg</p>
                    </div>
                  </div>
                ))}
             </div>
          </CardContent>
        </Card>

        {/* Recent Vendor Activity */}
        <Card className="lg:col-span-3 border-none shadow-sm shadow-slate-200/50 bg-white rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold font-outfit text-slate-900">Recent Activity</CardTitle>
            <p className="text-sm text-slate-500">Latest updates from your vendor portal.</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-8 pt-4">
               {[
                 { user: "Rahman Fruits", action: "placed an order", time: "10 mins ago", amount: "৳4,200", status: "PENDING" },
                 { user: "City Dry Fruits", action: "registered as partner", time: "2 hours ago", amount: null, status: "APPROVAL" },
                 { user: "Fresh Market", action: "uploaded sales report", time: "5 hours ago", amount: "৳12,500", status: "SYNCED" }
               ].map((activity, i) => (
                 <div key={i} className="flex gap-4 relative">
                   {i !== 2 && <div className="absolute left-5 top-10 bottom-0 w-[1px] bg-slate-100 -translate-x-1/2" />}
                   <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold shrink-0 z-10">
                     {activity.user[0]}
                   </div>
                   <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-900">
                        <span className="font-bold">{activity.user}</span> {activity.action}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{activity.time}</span>
                        {activity.amount && <span className="text-[10px] font-black text-orange-600">{activity.amount}</span>}
                      </div>
                   </div>
                 </div>
               ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
