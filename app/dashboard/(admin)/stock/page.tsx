import { getGlobalInventory } from "@/lib/inventory-actions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Package, 
  Search, 
  AlertTriangle, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingUp,
  History,
  Layers
} from "lucide-react"
import { Input } from "@/components/ui/input"

export default async function GlobalStockPage() {
  const inventory = await getGlobalInventory()
  const lowStockCount = inventory.filter(i => i.quantity <= i.lowStockAlert).length

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold font-outfit text-slate-900 tracking-tight">Central Hub Inventory</h1>
          <p className="text-slate-500 uppercase tracking-[0.2em] font-black text-[10px]">
             Monitoring and managing global stock levels for all FruitsZone partners.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-12 px-6 rounded-xl border-slate-200 flex items-center gap-2 font-bold text-xs uppercase tracking-widest">
              <History size={18} /> Stock Logs
           </Button>
           <Button className="bg-slate-900 hover:bg-slate-800 h-12 px-6 rounded-xl text-white shadow-xl shadow-slate-200 flex items-center gap-2 font-bold text-xs uppercase tracking-widest">
              <Layers size={18} /> Batch Entry
           </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-2x">
            <CardHeader className="pb-2">
               <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Stock Value</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="text-3xl font-black text-slate-900 font-outfit">৳12.8M</div>
            </CardContent>
         </Card>
         <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-2xl">
            <CardHeader className="pb-2">
               <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest">Low Stock Items</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="text-3xl font-black text-orange-600 font-outfit">{lowStockCount} Items</div>
            </CardContent>
         </Card>
         <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-2xl">
            <CardHeader className="pb-2">
               <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest">Top Supplier</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="text-3xl font-black text-emerald-600 font-outfit">Rajshahi Hub</div>
            </CardContent>
         </Card>
         <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-2xl">
            <CardHeader className="pb-2">
               <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest">Monthly Turnover</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="text-3xl font-black text-blue-600 font-outfit">+14.2%</div>
            </CardContent>
         </Card>
      </div>

      <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-2xl overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input 
                placeholder="Search inventory by fruit name..." 
                className="pl-10 h-10 bg-white border-slate-200 rounded-xl focus:ring-slate-900 shadow-none transition-all"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto overflow-y-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] bg-slate-50/30">
                  <th className="px-8 py-5">Fruit Identifier</th>
                  <th className="px-8 py-5">Available Quantity</th>
                  <th className="px-8 py-5">Current Unit Price</th>
                  <th className="px-8 py-5">Safety Threshold</th>
                  <th className="px-8 py-5 text-right">Inventory Logic</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {inventory.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold border border-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                          {item.fruit.name[0]}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 leading-tight">{item.fruit.name}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{item.fruit.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <span className={`text-xl font-black font-outfit ${item.quantity <= item.lowStockAlert ? 'text-red-600' : 'text-slate-900'}`}>
                           {item.quantity}
                        </span>
                        <span className="text-xs text-slate-400 font-bold uppercase">{item.fruit.unit}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                       <p className="font-outfit font-black text-slate-900">৳{Number(item.fruit.basePrice).toLocaleString()}</p>
                    </td>
                    <td className="px-8 py-5">
                       <Badge className="bg-slate-50 text-slate-500 border-none px-3 py-1 font-bold text-[10px] rounded-full">
                          {item.lowStockAlert} {item.fruit.unit}
                       </Badge>
                    </td>
                    <td className="px-8 py-5 text-right">
                       <Button variant="ghost" className="h-10 px-4 rounded-xl font-black text-[10px] uppercase tracking-widest text-emerald-600 hover:bg-emerald-50">
                          Add Stock
                       </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
