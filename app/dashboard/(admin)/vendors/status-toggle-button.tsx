"use client"

import { useState, useTransition } from "react"
import { updateVendorStatus } from "@/lib/vendor-actions"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { MoreVertical, CheckCircle2, XCircle, Clock, Loader2, ShieldCheck, ShieldX } from "lucide-react"
import { toast } from "sonner"
import { VendorStatus } from "@prisma/client"

export default function StatusToggleButton({ 
  vendorId, 
  currentStatus 
}: { 
  vendorId: string; 
  currentStatus: VendorStatus 
}) {
  const [isPending, startTransition] = useTransition()

  const handleUpdate = (status: VendorStatus) => {
    if (status === currentStatus) return

    startTransition(async () => {
      const result = await updateVendorStatus(vendorId, status)
      if (result.success) {
        toast.success(`Partner status updated to ${status}`)
      } else {
        toast.error(result.error || "Failed to update status")
      }
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-10 w-10 transition-colors rounded-xl hover:bg-slate-100 disabled:opacity-50">
          {isPending ? <Loader2 size={18} className="animate-spin text-orange-600" /> : <MoreVertical size={18} />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white border-slate-100 rounded-2xl shadow-2xl p-2 w-56 animate-in fade-in zoom-in-95 duration-200">
         <div className="px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
           Change Authority
         </div>
         <DropdownMenuItem 
           onClick={() => handleUpdate("ACTIVE")}
           disabled={currentStatus === "ACTIVE"}
           className="rounded-xl font-bold text-xs uppercase tracking-widest text-emerald-600 cursor-pointer px-4 py-3 bg-emerald-50/50 focus:bg-emerald-100 flex items-center gap-3 transition-colors mb-1"
         >
            <ShieldCheck size={16} />
            Activate Partner
         </DropdownMenuItem>
         <DropdownMenuItem 
           onClick={() => handleUpdate("SUSPENDED")}
           disabled={currentStatus === "SUSPENDED"}
           className="rounded-xl font-bold text-xs uppercase tracking-widest text-red-600 cursor-pointer px-4 py-3 bg-red-50/50 focus:bg-red-100 flex items-center gap-3 transition-colors mb-1"
         >
            <ShieldX size={16} />
            Suspend Access
         </DropdownMenuItem>
         <DropdownMenuItem 
           onClick={() => handleUpdate("PENDING")}
           disabled={currentStatus === "PENDING"}
           className="rounded-xl font-bold text-xs uppercase tracking-widest text-orange-600 cursor-pointer px-4 py-3 bg-orange-50/50 focus:bg-orange-100 flex items-center gap-3 transition-colors"
         >
            <Clock size={16} />
            Revert to Pending
         </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
