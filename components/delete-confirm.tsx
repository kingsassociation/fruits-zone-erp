"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash2, Loader2, AlertTriangle } from "lucide-react"
import { useState, useTransition } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface DeleteConfirmProps {
  id: string
  title: string
  onDelete: (id: string) => Promise<{ success?: boolean; error?: string }>
  trigger?: React.ReactNode
  description?: string
}

export function DeleteConfirm({ id, title, onDelete, trigger, description }: DeleteConfirmProps) {
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleDelete = () => {
    startTransition(async () => {
      const result = await onDelete(id)
      if (result.success) {
        toast.success(`${title} removed successfully`)
        setOpen(false)
        router.refresh()
      } else {
        toast.error(result.error || `Failed to remove ${title}`)
      }
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
            <Trash2 size={18} />
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white rounded-3xl border-slate-100 shadow-2xl p-8 max-w-md animate-in fade-in zoom-in-95 duration-200">
        <AlertDialogHeader className="space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 mb-2">
            <AlertTriangle size={28} />
          </div>
          <AlertDialogTitle className="text-2xl font-black font-outfit text-slate-900 leading-tight uppercase tracking-tight">
            Confirm Destruction
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-500 font-medium leading-relaxed">
            {description || `Are you absolutely certain you want to remove '${title}'? This action is irreversible and will purge all associated records from the core hub.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-8 gap-3 sm:gap-0">
          <AlertDialogCancel
            variant="ghost"
            className="h-12 px-6 rounded-xl font-bold text-slate-400 hover:text-slate-900 hover:bg-slate-50"
          >
            Negate Action
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={(e) => {
              e.preventDefault()
              handleDelete()
            }}
            disabled={isPending}
            className="h-12 px-8 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-[11px] uppercase tracking-widest shadow-xl shadow-red-100"
          >
            {isPending ? <Loader2 size={18} className="animate-spin" /> : "Verify & Purge"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
