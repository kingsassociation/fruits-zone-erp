import { getVendorInventory, getLowStockAlerts } from "@/lib/inventory-actions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Package,
  AlertTriangle,
  Plus,
  Warehouse,
  History,
  Settings2
} from "lucide-react"
import Link from "next/link"
import { DataTableSearch } from "@/components/data-table-search"
import { InventoryThresholdDialog } from "@/components/inventory-threshold-dialog"

export default async function VendorInventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const inventory = await getVendorInventory(q)
  const lowStockItems = await getLowStockAlerts()
  const totalStockCount = inventory.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold font-outfit text-slate-900 tracking-tight uppercase">Shop Inventory</h1>
          <p className="text-slate-500 uppercase tracking-[0.2em] font-black text-[10px]">
            Real-time tracking of local shop stock levels and expiry alerts.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="outline" asChild className="h-12 px-6 rounded-xl border-slate-200 flex-1 sm:flex-none flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">
            <Link href="/dashboard/orders">
              <History size={18} /> <span className="hidden xs:inline">History</span>
            </Link>
          </Button>
          <Button asChild className="bg-orange-600 hover:bg-orange-700 h-12 px-6 rounded-xl text-white shadow-xl shadow-orange-100 flex-1 sm:flex-none flex items-center gap-2 font-black text-[10px] uppercase tracking-[0.2em] transition-all group">
            <Link href="/dashboard/stock-request">
              <Plus size={18} className="group-hover:rotate-90 transition-transform" /> <span className="hidden xs:inline">Request Stock</span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-2xl group hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
              Fruit Categories
              <Package size={14} className="text-slate-300" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-slate-900 font-outfit">{inventory.length} Valid</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-2xl group hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
              Total Quantity
              <Warehouse size={14} className="text-emerald-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-emerald-600 font-outfit">{totalStockCount} Units</div>
          </CardContent>
        </Card>
        <Card className={`border-none shadow-sm shadow-slate-200/50 bg-white rounded-2xl border-l-4 group hover:shadow-md transition-all ${lowStockItems.length > 0 ? 'border-l-red-500 bg-red-50/10' : 'border-l-slate-100'}`}>
          <CardHeader className="pb-2">
            <CardTitle className={`text-xs font-black uppercase tracking-widest flex items-center justify-between ${lowStockItems.length > 0 ? 'text-red-500' : 'text-slate-400'}`}>
              Restock Alerts
              <AlertTriangle size={14} className={lowStockItems.length > 0 ? 'text-red-500 animate-bounce' : 'text-slate-300'} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-4xl font-black font-outfit ${lowStockItems.length > 0 ? 'text-red-600' : 'text-slate-900'}`}>{lowStockItems.length} Warnings</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-2xl overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <DataTableSearch placeholder="Find items in shop inventory..." />
            <div className="flex items-center gap-2">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest hidden lg:block mr-2">
                 Active in Hub: <span className="text-slate-900">{inventory.length}</span> fruit types
               </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto overflow-y-hidden scrollbar-hide">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] bg-slate-50/30">
                  <th className="px-8 py-5">Fruit Detail</th>
                  <th className="px-8 py-5 hidden sm:table-cell">Category</th>
                  <th className="px-8 py-5 text-center">In Shop</th>
                  <th className="px-8 py-5 hidden md:table-cell">Safety Level</th>
                  <th className="px-8 py-5 text-right">Settings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {inventory.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-32 text-center space-y-4">
                      <div className="mx-auto w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 border border-slate-100 animate-pulse">
                        <Warehouse size={40} />
                      </div>
                      <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Your shop inventory is currently empty.</p>
                      <Button asChild variant="link" className="text-orange-600 font-black tracking-widest uppercase text-xs decoration-2 underline-offset-4">
                        <Link href="/dashboard/stock-request">Order stock now</Link>
                      </Button>
                    </td>
                  </tr>
                ) : (
                  inventory.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black shadow-lg border border-slate-800 group-hover:bg-orange-600 transition-colors">
                            {item.fruit.name[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 leading-tight group-hover:text-orange-600 transition-colors font-outfit">{item.fruit.name}</p>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5 sm:hidden">{item.fruit.category}</p>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">Unit: {item.fruit.unit}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 hidden sm:table-cell">
                        <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none px-3 py-1 rounded-lg font-black text-[9px] uppercase tracking-wider">
                          {item.fruit.category}
                        </Badge>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <div className="flex flex-col items-center">
                          <span className={`text-2xl font-black font-outfit leading-none ${item.quantity <= item.lowStockAlert ? 'text-red-500' : 'text-slate-900'}`}>
                            {item.quantity}
                          </span>
                          <span className="text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] block mt-1">{item.fruit.unit}</span>
                          <span className={`text-[8px] font-bold uppercase md:hidden mt-0.5 ${item.quantity <= item.lowStockAlert ? 'text-red-500' : 'text-emerald-500'}`}>
                            {item.quantity <= item.lowStockAlert ? 'Restock' : 'OK'}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5 hidden md:table-cell">
                        <div className="flex items-center gap-2">
                           <div className={`w-2 h-2 rounded-full ${item.quantity <= item.lowStockAlert ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
                           <span className={`text-[10px] font-black uppercase tracking-widest ${item.quantity <= item.lowStockAlert ? 'text-red-500 font-black' : 'text-slate-500'}`}>
                             {item.quantity <= item.lowStockAlert ? 'REPLENISH' : 'SAFETY ZONE'}
                           </span>
                        </div>
                        <p className="text-[9px] text-slate-400 font-bold px-4 uppercase mt-0.5">Alert at {item.lowStockAlert}</p>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <InventoryThresholdDialog 
                          id={item.id} 
                          fruitName={item.fruit.name} 
                          currentThreshold={item.lowStockAlert} 
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
