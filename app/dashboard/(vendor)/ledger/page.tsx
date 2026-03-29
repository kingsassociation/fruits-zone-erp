"use client"

import { useState, useEffect } from "react"
import { getVendorCustomers, recordSale } from "@/lib/khata-actions"
import { getVendorInventory } from "@/lib/inventory-actions"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  Plus, 
  ShoppingCart, 
  User, 
  Package, 
  Coins, 
  History, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  X,
  PlusCircle,
  Trash2
} from "lucide-react"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog"

export default function LedgerPage() {
  const [customers, setCustomers] = useState<any[]>([])
  const [inventory, setInventory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isRecordOpen, setIsRecordOpen] = useState(false)
  const [isConfirmSaleOpen, setIsConfirmSaleOpen] = useState(false)
  const [recordLoading, setRecordLoading] = useState(false)

  // Form State
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("cash")
  const [items, setItems] = useState<any[]>([{ fruitId: "", quantity: 1, price: 0 }])
  const [amountPaid, setAmountPaid] = useState<number>(0)
  const [note, setNote] = useState("")

  const fetchData = async () => {
    setLoading(true)
    const [cData, iData] = await Promise.all([
      getVendorCustomers(),
      getVendorInventory()
    ])
    setCustomers(cData)
    setInventory(iData)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const addItem = () => {
    setItems([...items, { fruitId: "", quantity: 1, price: 0 }])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items]
    newItems[index][field] = value
    
    // Auto-update price if fruit changes
    if (field === "fruitId") {
      const fruit = inventory.find(i => i.fruitId === value)
      if (fruit) newItems[index].price = Number(fruit.fruit.basePrice)
    }
    
    setItems(newItems)
  }

  const totalAmount = items.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0)

  // Sync amountPaid with totalAmount if it's a cash customer
  useEffect(() => {
    if (selectedCustomerId === "cash") {
      setAmountPaid(totalAmount)
    }
  }, [totalAmount, selectedCustomerId])

  const handleRecord = async () => {
    setRecordLoading(true)

    const data = {
      customerId: selectedCustomerId === "cash" ? undefined : selectedCustomerId,
      items,
      totalAmount,
      amountPaid,
      note
    }

    const response = await recordSale(data)
    if ('error' in response) {
       toast.error(response.error as string)
       setRecordLoading(false)
    } else {
      toast.success("Sale recorded successfully!")
      setIsRecordOpen(false)
      fetchData()
      setRecordLoading(false)
      // Reset form
      setItems([{ fruitId: "", quantity: 1, price: 0 }])
      setAmountPaid(0)
      setNote("")
    }
  }

  const preSubmitCheck = () => {
    // Validation
    if (items.some(i => !i.fruitId)) {
      toast.error("Please select a fruit for all items.")
      return
    }
    
    if (totalAmount <= 0) {
      toast.error("Cart is empty.")
      return
    }

    setIsConfirmSaleOpen(true)
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold font-outfit text-slate-900 tracking-tight leading-none">Hisab Ledger</h1>
          <p className="text-slate-500 text-sm">Record new sales and manage shop balance.</p>
        </div>

        <Dialog open={isRecordOpen} onOpenChange={setIsRecordOpen}>
          <DialogTrigger render={
            <Button className="h-14 px-8 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold gap-3 shadow-xl shadow-slate-200">
              <PlusCircle size={20} /> Record New Sale
            </Button>
          } />
          <DialogContent className="rounded-[2.5rem] border-none shadow-2xl p-0 max-w-2xl overflow-hidden bg-white">
            <div className="p-8 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
               <div className="space-y-1">
                 <h2 className="text-2xl font-bold font-outfit text-slate-900 tracking-tight">Record Sale</h2>
                 <p className="text-slate-500 text-sm">Manage item list and payment split.</p>
               </div>
               <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-2xl font-black text-xl font-outfit">
                 ৳{totalAmount.toLocaleString()}
               </div>
            </div>
            
            <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-700 tracking-wider uppercase px-1">Customer Selection*</label>
                 <Select value={selectedCustomerId} onValueChange={(val) => setSelectedCustomerId(val || "cash")}>
                   <SelectTrigger className="h-14 bg-slate-50 border-slate-100 rounded-2xl focus:bg-white transition-all shadow-none focus:ring-emerald-500 font-medium">
                     <SelectValue placeholder="Select customer" />
                   </SelectTrigger>
                   <SelectContent className="rounded-2xl border-slate-100 p-2">
                     <SelectItem value="cash" className="rounded-xl py-3 focus:bg-emerald-50">Cash Customer</SelectItem>
                     {customers.map(c => (
                       <SelectItem key={c.id} value={c.id} className="rounded-xl py-3 focus:bg-emerald-50">
                          {c.name} {Number(c.totalDue) > 0 && `(Due: ৳${Number(c.totalDue)})`}
                       </SelectItem>
                     ))}
                   </SelectContent>
                 </Select>
               </div>

               <div className="space-y-4">
                 <div className="flex justify-between items-center px-1">
                    <label className="text-xs font-bold text-slate-700 tracking-wider uppercase">Purchase Items*</label>
                    <Button type="button" variant="ghost" size="sm" onClick={addItem} className="text-emerald-600 font-bold h-8 gap-1 hover:bg-emerald-50 hover:text-emerald-700 underline px-0">
                      <Plus size={14} /> Add Another
                    </Button>
                 </div>
                 
                 {items.map((item, idx) => (
                   <div key={idx} className="grid grid-cols-12 gap-3 items-end bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                      <div className="col-span-12 md:col-span-5 space-y-1">
                         <Select value={item.fruitId} onValueChange={(v) => updateItem(idx, "fruitId", v)}>
                           <SelectTrigger className="h-12 bg-white border-slate-100 rounded-xl focus:ring-emerald-500 font-medium">
                             <SelectValue placeholder="Item" />
                           </SelectTrigger>
                           <SelectContent className="rounded-xl">
                             {inventory.map(i => (
                               <SelectItem key={i.fruitId} value={i.fruitId} disabled={i.quantity <= 0}>
                                 {i.fruit.name} ({i.quantity} {i.fruit.unit} left)
                               </SelectItem>
                             ))}
                           </SelectContent>
                         </Select>
                      </div>
                      <div className="col-span-5 md:col-span-3">
                         <div className="relative">
                           <Input 
                             type="number" 
                             placeholder="Qty" 
                             value={item.quantity}
                             onChange={(e) => updateItem(idx, "quantity", Number(e.target.value))}
                             className="h-12 bg-white border-slate-100 rounded-xl focus:ring-emerald-500 pl-4"
                           />
                         </div>
                      </div>
                      <div className="col-span-5 md:col-span-3">
                         <div className="relative">
                           <Input 
                             type="number" 
                             placeholder="Price" 
                             value={item.price}
                             onChange={(e) => updateItem(idx, "price", Number(e.target.value))}
                             className="h-12 bg-white border-slate-100 rounded-xl focus:ring-emerald-500 pl-4"
                           />
                         </div>
                      </div>
                      <div className="col-span-2 md:col-span-1 flex justify-end">
                         <Button 
                           type="button" 
                           variant="ghost" 
                           size="icon" 
                           onClick={() => removeItem(idx)}
                           disabled={items.length === 1}
                           className="h-12 w-12 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50"
                         >
                           <Trash2 size={18} />
                         </Button>
                      </div>
                   </div>
                 ))}
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 tracking-wider uppercase px-1">Amount Received (Cash)৳</label>
                    <Input 
                      type="number" 
                      value={amountPaid} 
                      onChange={(e) => setAmountPaid(Number(e.target.value))}
                      disabled={selectedCustomerId === "cash"}
                      className="h-14 bg-slate-50 border-slate-100 rounded-2xl focus:bg-white transition-all shadow-none focus:ring-emerald-500 font-bold text-lg" 
                    />
                    {selectedCustomerId !== "cash" && amountPaid < totalAmount && (
                      <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest px-1 italic">
                        Rest ৳{(totalAmount - amountPaid)} will be added to Udhar.
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 tracking-wider uppercase px-1">Transaction Note</label>
                    <Input 
                      placeholder="e.g. Regular monthly tea pack" 
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="h-14 bg-slate-50 border-slate-100 rounded-2xl focus:bg-white transition-all shadow-none focus:ring-emerald-500" 
                    />
                  </div>
               </div>

            </div>

            <div className="p-8 bg-slate-50 border-t border-slate-100">
               <Button 
                 onClick={preSubmitCheck} 
                 disabled={recordLoading} 
                 className="w-full h-16 bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-bold text-xl shadow-xl shadow-emerald-100 gap-3"
               >
                 {recordLoading ? <Loader2 className="animate-spin" /> : <><CheckCircle2 size={24} /> Submit Hisab Entry</>}
               </Button>
            </div>

            {/* Critical Action Confirmation */}
            <Dialog open={isConfirmSaleOpen} onOpenChange={setIsConfirmSaleOpen}>
              <DialogContent className="rounded-[2.5rem] border-none shadow-2xl p-0 max-w-sm overflow-hidden bg-white">
                <div className="p-8 bg-slate-900 text-white space-y-2">
                   <DialogTitle className="text-xl font-bold font-outfit">Confirm Sale?</DialogTitle>
                </div>
                <div className="p-8 space-y-6">
                   <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm font-bold text-slate-500 uppercase tracking-widest">
                         <span>Total Value</span>
                         <span className="text-slate-900 font-extrabold font-outfit text-lg">৳{totalAmount}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm font-bold text-slate-500 uppercase tracking-widest">
                         <span>Cash Received</span>
                         <span className="text-emerald-600 font-extrabold font-outfit text-lg">৳{amountPaid}</span>
                      </div>
                      {totalAmount > amountPaid && (
                        <div className="flex justify-between items-center text-sm font-bold text-slate-500 uppercase tracking-widest">
                           <span>Due (Udhar)</span>
                           <span className="text-orange-600 font-extrabold font-outfit text-lg">৳{totalAmount - amountPaid}</span>
                        </div>
                      )}
                   </div>
                   <DialogFooter className="flex-col gap-2">
                      <Button variant="ghost" onClick={() => setIsConfirmSaleOpen(false)} className="h-12 rounded-xl font-bold">Cancel</Button>
                      <Button 
                        onClick={() => {
                          setIsConfirmSaleOpen(false)
                          handleRecord()
                        }} 
                        className="h-14 bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-bold text-white shadow-lg shadow-emerald-100"
                      >
                        Yes, Confirm Hisab
                      </Button>
                   </DialogFooter>
                </div>
              </DialogContent>
            </Dialog>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-3xl overflow-hidden p-6">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Today&apos;s Cash</p>
            <p className="text-3xl font-black text-slate-900 font-outfit">৳45,200</p>
         </Card>
         <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-3xl overflow-hidden p-6 border-l-4 border-l-orange-500">
            <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-1">Total Credit Issued</p>
            <p className="text-3xl font-black text-slate-900 font-outfit">৳12,150</p>
         </Card>
         <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-3xl overflow-hidden p-6">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Expenses</p>
            <p className="text-3xl font-black text-slate-900 font-outfit">৳2,500</p>
         </Card>
         <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-3xl overflow-hidden p-6 bg-emerald-600 text-white">
            <p className="text-[10px] font-bold text-emerald-100 uppercase tracking-widest mb-1">Current Profit</p>
            <p className="text-3xl font-black font-outfit">৳8,400</p>
         </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-[2.5rem] overflow-hidden">
               <CardHeader className="p-8 border-b border-slate-50 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold font-outfit text-slate-900">Recent Transactions</CardTitle>
                    <p className="text-xs text-slate-400 font-medium">Live sync of local shop activity.</p>
                  </div>
                  <History className="text-slate-200 w-8 h-8" />
               </CardHeader>
               <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead>
                         <tr className="border-b border-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50/30">
                           <th className="px-8 py-5">Product / Time</th>
                           <th className="px-8 py-5">Value</th>
                           <th className="px-8 py-5">Status</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-50">
                          <tr className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-8 py-6">
                               <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform">
                                     <Package size={20} />
                                  </div>
                                  <div>
                                     <p className="font-bold text-slate-900 leading-none mb-1">Fresh Mango (Combo)</p>
                                     <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">12:30 PM • 5 KG</p>
                                  </div>
                               </div>
                            </td>
                            <td className="px-8 py-6">
                               <p className="font-black text-slate-900 font-outfit">৳850</p>
                            </td>
                            <td className="px-8 py-6">
                               <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-widest">Cash</span>
                            </td>
                          </tr>
                          <tr className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-8 py-6">
                               <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                                     <User size={20} />
                                  </div>
                                  <div>
                                     <p className="font-bold text-slate-900 leading-none mb-1">Munir Ahmed (Standard)</p>
                                     <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">11:15 AM • 2 Items</p>
                                  </div>
                               </div>
                            </td>
                            <td className="px-8 py-6">
                               <p className="font-black text-slate-900 font-outfit">৳2,100</p>
                            </td>
                            <td className="px-8 py-6">
                               <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-[10px] font-bold uppercase tracking-widest">Udhar</span>
                            </td>
                          </tr>
                       </tbody>
                    </table>
                  </div>
               </CardContent>
            </Card>
         </div>

         <div className="space-y-6">
           <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-[2rem] overflow-hidden">
              <CardHeader className="pb-4">
                 <CardTitle className="text-lg font-bold font-outfit text-slate-900">Top Sale Items</CardTitle>
                 <CardDescription className="text-xs">Based on weekly performance.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 pt-0">
                 <div className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold">1</div>
                       <div>
                          <p className="font-bold text-slate-900 text-sm leading-tight">Thai Guava</p>
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">85 KG sold</p>
                       </div>
                    </div>
                    <ArrowRight size={16} className="text-slate-200 group-hover:text-emerald-500 transition-colors" />
                 </div>
                 <div className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center font-bold">2</div>
                       <div>
                          <p className="font-bold text-slate-900 text-sm leading-tight">Alphonso Mango</p>
                          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">42 KG sold</p>
                       </div>
                    </div>
                    <ArrowRight size={16} className="text-slate-200 group-hover:text-emerald-500 transition-colors" />
                 </div>
              </CardContent>
           </Card>

           <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-[2rem] overflow-hidden p-6 bg-slate-900 text-white relative">
              <div className="space-y-4">
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-emerald-400">
                    <Coins size={24} />
                 </div>
                 <div className="space-y-1">
                    <h4 className="font-bold font-outfit text-xl tracking-tight">Need More Stock?</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">Place a direct stock request from the central marketplace for next-day delivery.</p>
                 </div>
                 <Button className="w-full bg-emerald-600 hover:bg-emerald-700 h-12 rounded-xl font-bold shadow-xl shadow-emerald-950">
                    Browse Marketplace
                 </Button>
              </div>
           </Card>
         </div>
      </div>
    </div>
  )
}

function ArrowRight(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
