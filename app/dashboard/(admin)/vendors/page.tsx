import { getVendorsList } from "@/lib/vendor-actions"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  CheckCircle2, 
  Clock
} from "lucide-react"
import { DataTableSearch } from "@/components/data-table-search"
import { DataTableFilter } from "@/components/data-table-filter"
import StatusToggleButton from "./status-toggle-button"

export default async function VendorsManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>
}) {
  const { q, status } = await searchParams
  const vendors = await getVendorsList(q, status)
  const statuses = ["Active", "Pending", "Suspended", "Cancelled"]

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-extrabold font-outfit text-slate-900 tracking-tight uppercase">Partner Network</h1>
        <p className="text-slate-500 uppercase tracking-[0.2em] font-black text-[10px]">
           Manage registration, subscription and status of all FruitsZone partners.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
         <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-2xl hover:shadow-md transition-all">
            <CardHeader className="pb-2">
               <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
                 Active
                 <CheckCircle2 size={14} className="text-emerald-500" />
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="text-4xl font-black text-slate-900 font-outfit">
                  {vendors.filter(v => v.status === "ACTIVE").length}
               </div>
            </CardContent>
         </Card>
         <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-2xl hover:shadow-md transition-all">
            <CardHeader className="pb-2">
               <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
                   Pending
                  <Clock size={14} className="text-orange-500" />
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="text-4xl font-black text-orange-600 font-outfit">
                  {vendors.filter(v => v.status === "PENDING").length}
               </div>
            </CardContent>
         </Card>
         <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-2xl hover:shadow-md transition-all">
            <CardHeader className="pb-2">
               <CardTitle className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
                   Pro Hubs
                  <Badge className="bg-emerald-500 text-white rounded-md h-5 px-1.5 border-none font-black text-[10px]">PRO</Badge>
               </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="text-4xl font-black text-emerald-600 font-outfit">
                  {vendors.filter(v => v.subscription?.plan?.name === "Pro").length}
               </div>
            </CardContent>
         </Card>
      </div>

      <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-2xl overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <DataTableSearch placeholder="Search partners..." />
            <div className="flex items-center gap-3 w-full md:w-auto">
               <DataTableFilter name="Status" options={statuses} param="status" />
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest hidden lg:block ml-4 whitespace-nowrap">
                 Displaying: <span className="text-slate-900">{vendors.length}</span> Partners
               </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto overflow-y-hidden scrollbar-hide">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] bg-slate-50/30">
                  <th className="px-8 py-5">Business Profile</th>
                  <th className="px-8 py-5 hidden sm:table-cell">Contact Hub</th>
                  <th className="px-8 py-5 hidden md:table-cell">Growth Plan</th>
                  <th className="px-8 py-5">Current Status</th>
                  <th className="px-8 py-5 text-right">Settings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {vendors.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-24 text-center">
                       <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No partners match your criteria.</p>
                    </td>
                  </tr>
                ) : (
                  vendors.map((vendor) => (
                    <tr key={vendor.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black shadow-lg border border-slate-800 group-hover:bg-orange-600 transition-colors">
                            {vendor.businessName[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 leading-tight group-hover:text-orange-600 transition-colors font-outfit uppercase">{vendor.businessName}</p>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">{vendor.user.name}</p>
                            <p className="text-[10px] text-slate-400 font-black uppercase mt-1 sm:hidden">{vendor.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 hidden sm:table-cell">
                        <p className="text-xs font-bold text-slate-700">{vendor.phone}</p>
                        <p className="text-[10px] text-slate-400 font-medium truncate max-w-[180px]">{vendor.user.email}</p>
                      </td>
                      <td className="px-8 py-5 hidden md:table-cell">
                        <div className="space-y-1">
                          <Badge className={`border-none px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                             vendor.subscription?.plan?.name === "Starter" ? "bg-slate-100 text-slate-600" :
                             vendor.subscription?.plan?.name === "Pro" || "Enterprise" ? "bg-emerald-100 text-emerald-700" : 
                             vendor.subscription ? "bg-orange-100 text-orange-700" : "bg-slate-50 text-slate-400"
                          }`}>
                             {vendor.subscription?.plan?.name || "No Plan"}
                          </Badge>
                          {vendor.subscription && (
                            <p className="text-[9px] text-slate-400 font-bold px-1 uppercase tracking-tighter">Exp. {new Date(vendor.subscription.currentPeriodEnd).toLocaleDateString()}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-5">
                         <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                               vendor.status === "ACTIVE" ? 'bg-emerald-500 shadow-sm shadow-emerald-200' :
                               vendor.status === "PENDING" ? 'bg-orange-500 animate-pulse' : 'bg-red-500'
                            }`} />
                            <span className={`text-[10px] font-black uppercase tracking-widest ${
                               vendor.status === "ACTIVE" ? "text-emerald-600" :
                               vendor.status === "PENDING" ? "text-orange-600" : "text-red-600"
                            }`}>
                               {vendor.status}
                            </span>
                         </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                         <StatusToggleButton vendorId={vendor.id} currentStatus={vendor.status} />
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
