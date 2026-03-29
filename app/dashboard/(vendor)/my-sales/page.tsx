import { getVendorSales, deleteSale } from "@/lib/sale-actions"
import { getFruits } from "@/lib/fruit-actions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Plus,
  Calendar,
  Receipt,
  Clock,
  Wallet,
  TrendingUp
} from "lucide-react"
import Link from "next/link"
import { DataTableSearch } from "@/components/data-table-search"
import { DeleteConfirm } from "@/components/delete-confirm"

export default async function VendorSalesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const sales = await getVendorSales(q)
  const totalRevenue = sales.reduce((sum, sale) => sum + Number(sale.totalAmount), 0)
  const todaySales = sales.filter(s => new Date(s.createdAt).toDateString() === new Date().toDateString()).length

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold font-outfit text-slate-900 tracking-tight uppercase">Tali-Khata</h1>
          <p className="text-slate-500 uppercase tracking-[0.2em] font-black text-[10px]">
             Manage daily shop sales, customer credit, and history.
          </p>
        </div>
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700 h-14 px-8 rounded-2xl shadow-xl shadow-emerald-100 flex items-center gap-3 group transition-all w-full sm:w-auto">
          <Link href="/dashboard/my-sales/new">
            <Plus size={22} className="group-hover:rotate-90 transition-transform duration-500" />
            <span className="font-black text-xs uppercase tracking-[0.2em] text-white">Record New Sale</span>
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-2xl hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
              Total Revenue
              <TrendingUp size={14} className="text-emerald-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900 font-outfit">৳{totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-2xl hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
              Today's Orders
              <Clock size={14} className="text-blue-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-emerald-600 font-outfit">{todaySales}</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-2xl hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
              Customer Credit
              <Wallet size={14} className="text-red-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-red-600 font-outfit">৳0.00</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-2xl hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest">Avg. Ticket</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-blue-600 font-outfit">৳{(totalRevenue / (sales.length || 1)).toFixed(0)}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-2xl overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
             <DataTableSearch placeholder="Search sales by fruit..." />
             <div className="flex items-center gap-3">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest hidden lg:block whitespace-nowrap">
                 Ledger Entries: <span className="text-slate-900">{sales.length}</span> recorded
               </p>
             </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto overflow-y-hidden scrollbar-hide">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] bg-slate-50/30">
                  <th className="px-8 py-5">Date & Time</th>
                  <th className="px-8 py-5">Customer Profile</th>
                  <th className="px-8 py-5 hidden md:table-cell">Items Managed</th>
                  <th className="px-8 py-5 text-center">Transaction Total</th>
                  <th className="px-8 py-5 hidden sm:table-cell">Payment</th>
                  <th className="px-8 py-5 text-right">Authority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {sales.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-32 text-center space-y-4">
                      <div className="mx-auto w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 border border-slate-100 animate-pulse">
                        <Receipt size={40} />
                      </div>
                      <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Your sales ledger is currently empty.</p>
                      <Button asChild variant="link" className="text-emerald-600 font-black tracking-widest uppercase text-xs decoration-2 underline-offset-4">
                        <Link href="/dashboard/my-sales/new">Record first sale</Link>
                      </Button>
                    </td>
                  </tr>
                ) : (
                  sales.map((sale) => (
                    <tr key={sale.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="bg-slate-50 p-2 rounded-xl text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all border border-slate-100">
                            <Calendar size={16} />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-slate-900">{new Date(sale.createdAt).toLocaleDateString()}</p>
                            <p className="text-[10px] text-slate-400 font-black uppercase mt-0.5">{new Date(sale.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-black text-white border border-slate-800 uppercase shadow-sm">
                            {(sale.customer?.name?.[0] || "W").toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-700 leading-none">{sale.customer?.name || "Walk-in"}</p>
                            <p className="text-[9px] text-slate-400 font-bold uppercase mt-1 sm:hidden">{sale.paymentStatus}</p>
                            <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Ref: {sale.id.slice(-6).toUpperCase()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 hidden md:table-cell">
                        <div className="flex flex-wrap gap-2 max-w-[200px]">
                          {sale.items.map((item: any, i: number) => (
                            <Badge key={i} className="bg-white border-slate-200 text-slate-600 font-black text-[9px] uppercase tracking-tighter px-2 py-0.5 rounded-md hover:bg-slate-50 transition-colors">
                              {item.fruit.name} (x{item.quantity})
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <p className="font-outfit font-black text-slate-900 text-lg tracking-tight">৳{Number(sale.totalAmount).toLocaleString()}</p>
                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{sale.items.length} Line(s)</p>
                      </td>
                      <td className="px-8 py-5 hidden sm:table-cell">
                        <Badge className={`border-none px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.1em] ${sale.paymentStatus === 'CASH' ? 'bg-emerald-100 text-emerald-800' :
                            sale.paymentStatus === 'CREDIT' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
                          }`}>
                          {sale.paymentStatus}
                        </Badge>
                      </td>
                      <td className="px-8 py-5 text-right pr-4">
                         <DeleteConfirm id={sale.id} title="Sales Record" onDelete={deleteSale} />
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
