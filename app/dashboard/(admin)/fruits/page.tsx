import Link from "next/link"
import { getFruits, deleteFruit } from "@/lib/fruit-actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Plus, ShoppingBasket } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DataTableSearch } from "@/components/data-table-search"
import { DataTableFilter } from "@/components/data-table-filter"
import { DeleteConfirm } from "@/components/delete-confirm"

export default async function FruitsListPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>
}) {
  const { q, category } = await searchParams
  const fruits = await getFruits(q, category)
  const categories = ["Fruit", "Dry Fruit", "Nut", "Combo"]

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold font-outfit text-slate-900 tracking-tight uppercase">Fruit Catalog</h1>
          <p className="text-slate-500 font-medium text-xs uppercase tracking-widest">Manage all premium imports and regional harvests.</p>
        </div>
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700 h-12 px-6 rounded-xl shadow-lg shadow-emerald-100 flex items-center gap-2 group w-full sm:w-auto">
          <Link href="/dashboard/fruits/new">
            <Plus size={20} className="group-hover:rotate-90 transition-transform" /> Add New Fruit
          </Link>
        </Button>
      </div>

      <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-2xl overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <DataTableSearch placeholder="Search name..." />
            <div className="flex items-center gap-3 w-full md:w-auto">
               <DataTableFilter name="Category" options={categories} />
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest hidden lg:block ml-4 whitespace-nowrap">
                 Results: <span className="text-slate-900">{fruits.length}</span>
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
                  <th className="px-8 py-5 text-center">Base Price</th>
                  <th className="px-8 py-5 hidden md:table-cell">Status Hub</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {fruits.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-24 text-center space-y-4">
                       <div className="mx-auto w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 border border-slate-100 animate-pulse">
                         <ShoppingBasket size={40} />
                       </div>
                       <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No matching fruits cataloged.</p>
                       <Button asChild variant="link" className="text-emerald-600 font-bold p-0 decoration-2 underline-offset-4">
                         <Link href="/dashboard/fruits/new">Add new fruit</Link>
                       </Button>
                    </td>
                  </tr>
                ) : (
                  fruits.map((fruit: any) => (
                    <tr key={fruit.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-emerald-600 font-black overflow-hidden border border-slate-100 shadow-sm group-hover:scale-105 transition-transform">
                             {fruit.imageUrl ? (
                               <img src={fruit.imageUrl} alt={fruit.name} className="w-full h-full object-cover" />
                             ) : (
                               fruit.name[0]
                             )}
                           </div>
                           <div>
                             <p className="font-bold text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors font-outfit uppercase">{fruit.name}</p>
                             <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5 sm:hidden">{fruit.category}</p>
                             <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">{fruit.unit}</p>
                           </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 hidden sm:table-cell">
                        <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none px-3 py-1 rounded-lg font-black text-[9px] uppercase tracking-wider">
                          {fruit.category}
                        </Badge>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <p className="font-outfit font-black text-slate-900 text-lg tracking-tight">৳{Number(fruit.basePrice).toLocaleString()}</p>
                        <p className="text-[9px] text-slate-400 font-black uppercase tracking-tighter">per {fruit.unit}</p>
                      </td>
                      <td className="px-8 py-5 hidden md:table-cell">
                        <div className="flex items-center gap-2">
                           <div className={`w-2 h-2 rounded-full ${fruit.basePrice > 0 ? 'bg-emerald-500 shadow-sm shadow-emerald-200' : 'bg-slate-300'}`} />
                           <span className={`text-[10px] font-black uppercase tracking-widest ${fruit.basePrice > 0 ? 'text-emerald-600' : 'text-slate-400'}`}>
                             {fruit.basePrice > 0 ? 'Live & Active' : 'Restocking'}
                           </span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right pr-4">
                         <div className="flex items-center justify-end gap-2">
                           <DeleteConfirm id={fruit.id} title={fruit.name} onDelete={deleteFruit} />
                         </div>
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
