import { getOffersList, deleteOffer } from "@/lib/offer-actions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
   Tag,
   Plus,
   Calendar,
   Percent
} from "lucide-react"
import Link from "next/link"
import { DataTableSearch } from "@/components/data-table-search"
import { DataTableFilter } from "@/components/data-table-filter"
import { DeleteConfirm } from "@/components/delete-confirm"

export default async function OffersManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>
}) {
   const { q, status } = await searchParams
   const offers = await getOffersList(q, status)
   const activeOffers = offers.filter(o => o.isActive && new Date(o.endDate) > new Date()).length
   const statuses = ["Active", "Inactive"]

   return (
      <div className="space-y-8 animate-in fade-in duration-700">
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
               <h1 className="text-3xl font-extrabold font-outfit text-slate-900 tracking-tight uppercase">Campaign Hub</h1>
               <p className="text-slate-500 uppercase tracking-[0.2em] font-black text-[10px]">
                  Configure and manage seasonal discounts and promotional campaigns.
               </p>
            </div>
            <Button asChild className="bg-orange-600 hover:bg-orange-700 h-14 px-8 rounded-2xl shadow-xl shadow-orange-100 flex items-center gap-3 group w-full sm:w-auto transition-all">
               <Link href="/dashboard/offers/new">
                  <Plus size={22} className="group-hover:rotate-180 transition-transform duration-500" />
                  <span className="font-black text-xs uppercase tracking-widest text-white">Create Campaign</span>
               </Link>
            </Button>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-2xl hover:shadow-md transition-all">
               <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
                    Live Campaigns
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="text-4xl font-black text-slate-900 font-outfit">{activeOffers}</div>
               </CardContent>
            </Card>
            <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-2xl hover:shadow-md transition-all">
               <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest">Avg. Reach</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="text-4xl font-black text-orange-600 font-outfit">Dynamic</div>
               </CardContent>
            </Card>
            <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-2xl hover:shadow-md transition-all hidden lg:block">
               <CardHeader className="pb-2">
                  <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Hub Items</CardTitle>
               </CardHeader>
               <CardContent>
                  <div className="text-4xl font-black text-blue-600 font-outfit">{offers.length}</div>
               </CardContent>
            </Card>
         </div>

         <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-2xl overflow-hidden">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-8 py-6">
               <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <DataTableSearch placeholder="Search name..." />
                  <div className="flex items-center gap-2 w-full md:w-auto">
                     <DataTableFilter name="Status" options={statuses} param="status" />
                  </div>
               </div>
            </CardHeader>
            <CardContent className="p-0">
               <div className="overflow-x-auto overflow-y-hidden scrollbar-hide">
                  <table className="w-full text-left border-collapse min-w-[900px]">
                     <thead>
                        <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] bg-slate-50/30">
                           <th className="px-8 py-5">Promoted Fruit</th>
                           <th className="px-8 py-5 text-center">Discount logic</th>
                           <th className="px-8 py-5 hidden md:table-cell">Validity Period</th>
                           <th className="px-8 py-5 hidden sm:table-cell">Hub Status</th>
                           <th className="px-8 py-5 text-right">Actions</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {offers.length === 0 ? (
                           <tr>
                              <td colSpan={5} className="py-24 text-center">
                                 <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No active campaigns cataloged.</p>
                              </td>
                           </tr>
                        ) : (
                           offers.map((offer) => (
                              <tr key={offer.id} className="hover:bg-slate-50/50 transition-colors group">
                                 <td className="px-8 py-5">
                                    <div className="flex items-center gap-4">
                                       <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 font-bold border border-slate-100 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                                          <Tag size={20} />
                                       </div>
                                       <div>
                                          <p className="font-bold text-slate-900 leading-tight group-hover:text-orange-600 transition-colors font-outfit uppercase">{offer.fruit.name}</p>
                                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{offer.fruit.category}</p>
                                          <p className={`text-[9px] font-black uppercase tracking-widest mt-1 sm:hidden ${offer.isActive ? 'text-emerald-500' : 'text-slate-400'}`}>
                                            {offer.isActive ? 'Active' : 'Draft'}
                                          </p>
                                       </div>
                                    </div>
                                 </td>
                                 <td className="px-8 py-5 text-center">
                                    <div className="flex flex-col items-center">
                                       <div className="bg-orange-50 text-orange-600 px-3 py-1 rounded-lg border border-orange-100 inline-flex items-center gap-1 mb-1">
                                          <Percent size={12} /> <span className="font-outfit font-black text-lg">{Number(offer.discount)}%</span>
                                       </div>
                                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{offer.type}</p>
                                    </div>
                                 </td>
                                 <td className="px-8 py-5 hidden md:table-cell">
                                    <div className="space-y-1">
                                       <div className="flex items-center gap-2 text-xs font-black text-slate-600">
                                          <Calendar size={14} className="text-slate-400" />
                                          {new Date(offer.startDate).toLocaleDateString()} - {new Date(offer.endDate).toLocaleDateString()}
                                       </div>
                                       <p className={`text-[10px] font-black uppercase tracking-tighter ${new Date(offer.endDate) < new Date() ? "text-red-500" : "text-emerald-500"}`}>
                                          {new Date(offer.endDate) < new Date() ? "Expired" : "Live & Global"}
                                       </p>
                                    </div>
                                 </td>
                                 <td className="px-8 py-5 hidden sm:table-cell">
                                    <div className="flex items-center gap-2">
                                       <div className={`w-2 h-2 rounded-full ${offer.isActive ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                                       <span className={`text-[10px] font-black uppercase tracking-widest ${offer.isActive ? 'text-emerald-600' : 'text-slate-400'}`}>
                                          {offer.isActive ? 'Active' : 'Drafted'}
                                       </span>
                                    </div>
                                 </td>
                                 <td className="px-8 py-5 text-right pr-4">
                                    <DeleteConfirm id={offer.id} title={`${offer.fruit.name} Campaign`} onDelete={deleteOffer} />
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
