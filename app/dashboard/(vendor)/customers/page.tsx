"use client"

import { useState, useEffect } from "react"
import { getVendorCustomers, createCustomer } from "@/lib/khata-actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  Users, 
  UserPlus, 
  Search, 
  Phone, 
  MapPin, 
  Wallet, 
  Plus, 
  Loader2, 
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from "lucide-react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { toast } from "sonner"

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [addLoading, setAddLoading] = useState(false)

  const loadCustomers = async () => {
    setLoading(true)
    const data = await getVendorCustomers()
    setCustomers(data)
    setLoading(false)
  }

  useEffect(() => {
    loadCustomers()
  }, [])

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setAddLoading(true)
    
    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      address: formData.get("address"),
    }

    const response = await createCustomer(data)
    if (response.error) {
       toast.error(response.error)
       setAddLoading(false)
    } else {
       setIsAddOpen(false)
       loadCustomers()
       setAddLoading(false)
    }
  }

  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    (c.phone && c.phone.includes(search))
  )

  const totalDue = customers.reduce((acc, curr) => acc + Number(curr.totalDue), 0)

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold font-outfit text-slate-900 tracking-tight leading-none">Customer Khata</h1>
          <p className="text-slate-500 text-sm">Manage your local digital ledger and track udhar (dues).</p>
        </div>
        
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger render={
            <Button className="h-12 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-2 shadow-lg shadow-emerald-100">
              <UserPlus size={18} /> Add Customer
            </Button>
          } />
          <DialogContent className="rounded-[2rem] border-none shadow-2xl p-8 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold font-outfit text-slate-900">New Customer</DialogTitle>
              <p className="text-slate-500 text-sm">Add a local buyer to your digital khata book.</p>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-6 pt-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 tracking-wider uppercase px-1">Customer Name*</label>
                <Input name="name" placeholder="e.g. Mahabub Alam" required className="h-14 bg-slate-50 border-slate-100 rounded-2xl focus:bg-white transition-all shadow-none focus:ring-emerald-500" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 tracking-wider uppercase px-1">Phone Number</label>
                <Input name="phone" placeholder="01XXX XXXXXX" className="h-14 bg-slate-50 border-slate-100 rounded-2xl focus:bg-white transition-all shadow-none focus:ring-emerald-500" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 tracking-wider uppercase px-1">Address</label>
                <Input name="address" placeholder="Area, Chattogram" className="h-14 bg-slate-50 border-slate-100 rounded-2xl focus:bg-white transition-all shadow-none focus:ring-emerald-500" />
              </div>
              <DialogFooter className="pt-4">
                <Button type="submit" disabled={addLoading} className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-bold text-lg">
                  {addLoading ? <Loader2 className="animate-spin" /> : "Save Customer"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-3xl overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest mb-1">
                <Users size={16} /> Community
              </div>
              <CardTitle className="text-3xl font-black text-slate-900 font-outfit leading-none">{customers.length}</CardTitle>
              <CardDescription className="text-xs font-medium">Total Registered Buyers</CardDescription>
            </CardHeader>
         </Card>
         <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-3xl overflow-hidden border-l-4 border-l-orange-500">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-widest mb-1">
                <Wallet size={16} /> Total Udhar
              </div>
              <CardTitle className="text-3xl font-black text-slate-900 font-outfit leading-none">৳{totalDue.toLocaleString()}</CardTitle>
              <CardDescription className="text-xs font-medium">Outstanding Credit Receivable</CardDescription>
            </CardHeader>
         </Card>
         <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-3xl overflow-hidden bg-emerald-600 text-white">
            <CardHeader className="pb-3 text-white">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest mb-1 opacity-80">
                <CheckCircle2 size={16} /> Shop Health
              </div>
              <CardTitle className="text-3xl font-black font-outfit leading-none">Strong</CardTitle>
              <CardDescription className="text-xs font-medium text-emerald-100">Credit utilization within safe limits.</CardDescription>
            </CardHeader>
         </Card>
      </div>

      <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-3xl overflow-hidden p-6">
        <div className="flex items-center justify-between mb-8 gap-4">
           <div className="relative flex-grow max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 pointer-events-none" />
              <Input 
                placeholder="Search by name or phone..." 
                className="h-12 pl-12 bg-slate-50 border-slate-100 rounded-2xl focus:bg-white transition-all shadow-none focus:ring-emerald-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
           </div>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4 opacity-50">
               <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
               <p className="font-bold font-outfit text-slate-400">Loading ledger data...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 space-y-4 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
               <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center text-slate-200 shadow-sm">
                  <Users size={32} />
               </div>
               <div className="space-y-1">
                  <p className="font-bold text-slate-900">No customers found.</p>
                  <p className="text-sm text-slate-500">Add your first local customer to start tracking udhar.</p>
               </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {filtered.map((customer) => (
                 <div key={customer.id} className="group relative bg-white border border-slate-100 p-6 rounded-[2rem] hover:border-emerald-200 hover:shadow-xl hover:shadow-slate-100 transition-all">
                    <div className="flex justify-between items-start mb-4">
                       <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 font-bold group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                          {customer.name.charAt(0)}
                       </div>
                       {Number(customer.totalDue) > 0 && (
                         <div className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
                            Due: ৳{Number(customer.totalDue).toLocaleString()}
                         </div>
                       )}
                    </div>
                    <div className="space-y-4">
                       <div>
                          <h4 className="font-bold text-slate-900 text-lg leading-tight mb-1">{customer.name}</h4>
                          <p className="text-slate-400 text-xs flex items-center gap-1.5 font-medium italic"><MapPin size={12} /> {customer.address || "Area undisclosed"}</p>
                       </div>
                       <div className="flex items-center gap-4 text-xs font-bold text-slate-600 pt-2 border-t border-slate-50">
                          <span className="flex items-center gap-1.5"><Phone size={12} className="text-slate-400" /> {customer.phone || "No phone"}</span>
                       </div>
                    </div>
                    <Button variant="ghost" size="icon" className="absolute bottom-6 right-6 w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                       <ArrowRight size={18} />
                    </Button>
                 </div>
               ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
