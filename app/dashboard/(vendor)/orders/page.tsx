import { getVendorOrders } from "@/lib/order-actions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ShoppingBag, 
  Search, 
  Truck, 
  Package,
  History,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight
} from "lucide-react"
import { Input } from "@/components/ui/input"

export default async function VendorOrdersPage() {
  const orders = await getVendorOrders()
  
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold font-outfit text-slate-900 tracking-tight">Purchase Orders</h1>
          <p className="text-slate-500 uppercase tracking-[0.2em] font-black text-[10px]">
             Tracking and managing all bulk inventory requests from the Hub.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <Badge className="bg-orange-600 text-white rounded-full px-4 py-1 font-bold text-[10px] uppercase tracking-widest">
              Active Shipments: {orders.filter(o => o.status !== 'DELIVERED' && o.status !== 'CANCELLED').length}
           </Badge>
        </div>
      </div>

      <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-2xl overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input 
                placeholder="Search orders by ID or status..." 
                className="pl-10 h-12 bg-white border-slate-200 rounded-xl focus:ring-orange-500 shadow-none transition-all"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] bg-slate-50/30">
                  <th className="px-8 py-5">Order Reference</th>
                  <th className="px-8 py-5">Order Date</th>
                  <th className="px-8 py-5">Value (BN)</th>
                  <th className="px-8 py-5">Shipment Status</th>
                  <th className="px-8 py-5 text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-20 text-center space-y-4">
                       <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                         <Package size={32} />
                       </div>
                       <p className="text-slate-400 font-medium font-outfit uppercase tracking-widest text-[10px]">No historical orders found.</p>
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 font-bold border border-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                             <ShoppingBag size={18} />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 leading-tight">PO #{order.id.slice(-6).toUpperCase()}</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{order.items.length} Product Group(s)</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-sm font-bold text-slate-600">
                         {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-8 py-5">
                         <p className="font-outfit font-black text-slate-900">৳{Number(order.totalAmount).toLocaleString()}</p>
                      </td>
                      <td className="px-8 py-5">
                         <div className="flex items-center gap-2">
                            {order.status === 'DELIVERED' ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Clock size={14} className="text-orange-500" />}
                            <span className={`text-[10px] font-black uppercase tracking-widest ${
                               order.status === 'DELIVERED' ? 'text-emerald-600' : 'text-orange-600'
                            }`}>
                               {order.status}
                            </span>
                         </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                         <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all">
                            <ExternalLink size={18} />
                         </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <div className="p-8 bg-slate-900 rounded-3xl relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-10 opacity-10 scale-150 rotate-12 group-hover:scale-[2] transition-transform duration-1000">
            <Truck size={120} className="text-white" />
         </div>
         <div className="relative z-10 max-w-xl space-y-6">
            <h3 className="text-2xl font-black font-outfit text-white tracking-tight leading-none uppercase">Need Urgent Stock?</h3>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
               Our central hubs are operating with increased capacity. Orders placed before 10 PM are eligible for next-morning express delivery across the regional zone.
            </p>
            <Button className="bg-orange-600 hover:bg-orange-700 h-12 px-8 rounded-2xl text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-orange-900/40">
               Call Logistic Hub <ChevronRight size={14} className="ml-2" />
            </Button>
         </div>
      </div>
    </div>
  )
}
