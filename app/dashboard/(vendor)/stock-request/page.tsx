"use client"

import { useState, useEffect, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  ShoppingCart, 
  Loader2, 
  AlertCircle,
  PackageCheck,
  Tag,
  Scale,
  CheckCircle2,
  Calendar
} from "lucide-react"
import Link from "next/link"
import { getFruits } from "@/lib/fruit-actions"
import { createPurchaseOrder } from "@/lib/inventory-actions"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface OrderItem {
  fruitId: string
  name: string
  quantity: number
  price: number
  unit: string
}

export default function StockRequestPage() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [fruits, setFruits] = useState<any[]>([])
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [selectedFruitId, setSelectedFruitId] = useState<string>("")
  const [quantity, setQuantity] = useState<string>("10")
  const [notes, setNotes] = useState<string>("")

  useEffect(() => {
    const fetchFruits = async () => {
      const data = await getFruits()
      setFruits(data)
    }
    fetchFruits()
  }, [])

  const handleAddItem = () => {
    const fruit = fruits.find(f => f.id === selectedFruitId)
    if (!fruit) return

    if (orderItems.some(item => item.fruitId === selectedFruitId)) {
      toast.error("Item already in request")
      return
    }

    const q = parseInt(quantity)
    if (isNaN(q) || q <= 0) {
      toast.error("Please enter a valid quantity")
      return
    }

    setOrderItems([...orderItems, {
      fruitId: fruit.id,
      name: fruit.name,
      quantity: q,
      price: Number(fruit.basePrice),
      unit: fruit.unit
    }])
    setSelectedFruitId("")
    setQuantity("10")
  }

  const handleRemoveItem = (id: string) => {
    setOrderItems(orderItems.filter(item => item.fruitId !== id))
  }

  const handleSubmit = () => {
    if (orderItems.length === 0) {
      toast.error("Please add at least one item to the request")
      return
    }

    startTransition(async () => {
      const result = await createPurchaseOrder(
        orderItems.map(item => ({
          fruitId: item.fruitId,
          quantity: item.quantity,
          price: item.price
        })),
        notes
      )

      if (result.success) {
        toast.success("Stock request submitted successfully!")
        router.push("/dashboard/inventory")
        router.refresh()
      } else {
        toast.error(result.error || "Failed to submit request")
      }
    })
  }

  const totalAmount = orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0)

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-slate-100 transition-all">
          <Link href="/dashboard/inventory">
            <ArrowLeft size={20} />
          </Link>
        </Button>
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold font-outfit text-slate-900 tracking-tight leading-none uppercase">Procurement Request</h1>
          <p className="text-slate-500 text-sm font-medium">Request stock from the global hub to replenish your local shop inventory.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Add Item Card */}
          <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-3xl overflow-hidden p-4">
            <CardHeader className="pb-4">
               <div className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase tracking-[0.2em] mb-2">
                 <PackageCheck size={16} /> Item Selection
               </div>
               <CardTitle className="text-xl font-bold font-outfit text-slate-900 leading-none">Add Stock Item</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Select Fruit</label>
                    <Select value={selectedFruitId} onValueChange={(val) => setSelectedFruitId(val || "")}>
                      <SelectTrigger className="h-14 bg-slate-50 border-slate-100 rounded-2xl focus:ring-orange-500 transition-all font-bold text-slate-900 shadow-none">
                        <SelectValue placeholder="Browse catalog..." />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border-slate-100 shadow-2xl p-2">
                        {fruits.map((fruit) => (
                          <SelectItem key={fruit.id} value={fruit.id} className="rounded-xl py-2 my-1 focus:bg-orange-50 focus:text-orange-700 cursor-pointer">
                            {fruit.name} (৳{Number(fruit.basePrice)}/{fruit.unit})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Quantity</label>
                    <div className="flex gap-2">
                      <Input 
                        type="number" 
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="h-14 bg-slate-50 border-slate-100 rounded-2xl focus:ring-orange-500 transition-all font-bold text-slate-900 shadow-none" 
                        placeholder="Qty"
                      />
                      <Button 
                        onClick={handleAddItem}
                        disabled={!selectedFruitId}
                        className="h-14 w-14 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white shadow-xl shadow-orange-100"
                      >
                        <Plus size={24} />
                      </Button>
                    </div>
                  </div>
               </div>
            </CardContent>
          </Card>

          {/* Request List Card */}
          <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-3xl overflow-hidden">
             <CardHeader className="p-8 pb-4">
                <CardTitle className="text-xl font-bold font-outfit text-slate-900 leading-none">Order Basket</CardTitle>
             </CardHeader>
             <CardContent className="p-0">
                <div className="overflow-x-auto min-h-[200px]">
                   <table className="w-full text-left">
                      <thead>
                         <tr className="border-b border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50/50">
                            <th className="px-8 py-4">Item</th>
                            <th className="px-8 py-4 text-center">Unit Price</th>
                            <th className="px-8 py-4 text-center">Qty</th>
                            <th className="px-8 py-4 text-center">Subtotal</th>
                            <th className="px-8 py-4 text-right">Action</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                         {orderItems.length === 0 ? (
                           <tr>
                             <td colSpan={5} className="py-20 text-center space-y-3">
                                <div className="mx-auto w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                                   <ShoppingCart size={24} />
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Your basket is currently empty.</p>
                             </td>
                           </tr>
                         ) : (
                           orderItems.map((item) => (
                             <tr key={item.fruitId} className="group hover:bg-slate-50 transition-colors">
                                <td className="px-8 py-4">
                                   <p className="font-bold text-slate-900 font-outfit">{item.name}</p>
                                   <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Base Unit: {item.unit}</p>
                                </td>
                                <td className="px-8 py-4 text-center font-bold text-slate-600">৳{item.price}</td>
                                <td className="px-8 py-4 text-center font-bold text-slate-900">{item.quantity}</td>
                                <td className="px-8 py-4 text-center font-black font-outfit text-slate-900 text-lg">৳{(item.quantity * item.price).toLocaleString()}</td>
                                <td className="px-8 py-4 text-right">
                                   <Button 
                                     variant="ghost" 
                                     size="icon" 
                                     onClick={() => handleRemoveItem(item.fruitId)}
                                     className="h-10 w-10 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl"
                                   >
                                      <Trash2 size={18} />
                                   </Button>
                                </td>
                             </tr>
                           ))
                         )}
                      </tbody>
                   </table>
                </div>
             </CardContent>
             <CardFooter className="bg-slate-50/50 p-8 border-t border-slate-100 flex justify-between items-center">
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estimated Total</p>
                   <p className="text-3xl font-black font-outfit text-slate-900 tracking-tighter">৳{totalAmount.toLocaleString()}.00</p>
                </div>
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   Pricing Synced with Hub
                </div>
             </CardFooter>
          </Card>
        </div>

        <div className="space-y-8">
           <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-3xl overflow-hidden p-4">
              <CardHeader className="pb-4">
                 <div className="flex items-center gap-2 text-slate-600 font-bold text-xs uppercase tracking-[0.2em] mb-2">
                   <Tag size={16} /> Procurement Notes
                 </div>
                 <CardTitle className="text-xl font-bold font-outfit text-slate-900 leading-none">Special Instructions</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                 <textarea 
                   value={notes}
                   onChange={(e) => setNotes(e.target.value)}
                   className="w-full min-h-[150px] bg-slate-50 border-slate-100 rounded-2xl p-4 text-sm font-medium focus:ring-slate-900 transition-all resize-none shadow-none border"
                   placeholder="e.g. Please ensure urgent delivery for Alphanso Mangoes. Requesting premium grade only."
                 />
              </CardContent>
           </Card>

           <div className="space-y-4 pt-4">
              <Button 
                onClick={handleSubmit}
                disabled={isPending || orderItems.length === 0}
                className="w-full h-16 bg-slate-900 hover:bg-slate-800 text-xl font-bold rounded-2xl shadow-xl shadow-slate-200 gap-3 transition-all active:scale-95"
              >
                {isPending ? <Loader2 size={24} className="animate-spin" /> : <><CheckCircle2 size={24} /> Submit Request</>}
              </Button>
              <Card className="border-none bg-orange-50 p-6 rounded-2xl flex gap-4 items-start border border-orange-100">
                 <AlertCircle className="text-orange-600 shrink-0 mt-0.5" size={20} />
                 <p className="text-xs text-orange-900 font-medium leading-relaxed">
                    Stock requests are reviewed by the hub admin. Once approved, your shop inventory will be automatically updated and procurement history updated.
                 </p>
              </Card>
           </div>
        </div>
      </div>
    </div>
  )
}
