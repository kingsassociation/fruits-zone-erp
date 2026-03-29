"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Settings2, Loader2, AlertTriangle } from "lucide-react"
import { useState, useTransition } from "react"
import { updateVendorThreshold } from "@/lib/inventory-actions"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface InventoryThresholdDialogProps {
  id: string
  fruitName: string
  currentThreshold: number
}

export function InventoryThresholdDialog({ id, fruitName, currentThreshold }: InventoryThresholdDialogProps) {
  const [open, setOpen] = useState(false)
  const [threshold, setThreshold] = useState(currentThreshold.toString())
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleUpdate = () => {
    const val = parseInt(threshold)
    if (isNaN(val) || val < 0) {
      toast.error("Please enter a valid positive number")
      return
    }

    startTransition(async () => {
      const result = await updateVendorThreshold(id, val)
      if (result.success) {
        toast.success(`Threshold for ${fruitName} updated`)
        setOpen(false)
        router.refresh()
      } else {
        toast.error(result.error || "Failed to update threshold")
      }
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all">
          <Settings2 size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white rounded-3xl border-slate-100 shadow-2xl p-8 max-w-sm animate-in fade-in zoom-in-95 duration-200">
        <DialogHeader className="space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 mb-2">
            <AlertTriangle size={28} />
          </div>
          <DialogTitle className="text-2xl font-black font-outfit text-slate-900 leading-tight uppercase tracking-tight">
            Safety Level
          </DialogTitle>
          <DialogDescription className="text-slate-500 font-medium leading-relaxed">
            Set the minimum quantity for **{fruitName}** before the system triggers a low-stock alert.
          </DialogDescription>
        </DialogHeader>
        <div className="py-6">
          <div className="space-y-3">
             <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">Alert Threshold</label>
             <Input 
               type="number"
               value={threshold}
               onChange={(e) => setThreshold(e.target.value)}
               className="h-14 bg-slate-50 border-slate-100 rounded-2xl focus:ring-orange-500 transition-all font-bold text-slate-900 shadow-none" 
               placeholder="e.g. 10"
             />
          </div>
        </div>
        <DialogFooter className="mt-2">
          <Button 
            onClick={handleUpdate}
            disabled={isPending}
            className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl shadow-slate-100"
          >
            {isPending ? <Loader2 size={18} className="animate-spin" /> : "Save Threshold"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
