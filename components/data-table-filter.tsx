"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"
import { Filter, Loader2, Check } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function DataTableFilter({ 
  name, 
  options, 
  param = "category" 
}: { 
  name: string; 
  options: string[]; 
  param?: string 
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  
  const selected = searchParams.get(param)

  const handleSelect = (value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== "All") {
      params.set(param, value)
    } else {
      params.delete(param)
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-12 px-4 rounded-xl border-slate-200 flex items-center gap-2 group transition-all grow md:grow-0">
          {isPending ? <Loader2 size={18} className="animate-spin text-orange-500" /> : <Filter size={18} className="text-slate-400 group-hover:text-orange-500" />}
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
            {selected || name}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 p-2 rounded-2xl border-slate-100 shadow-2xl">
        <DropdownMenuLabel className="font-bold text-slate-900 p-2 text-[10px] uppercase tracking-widest text-slate-400">Filter By {name}</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-slate-100" />
        <DropdownMenuItem 
          onClick={() => handleSelect(null)}
          className="rounded-xl py-3 focus:bg-orange-50 focus:text-orange-700 cursor-pointer flex items-center justify-between"
        >
          <span className="font-bold">All {name}s</span>
          {!selected && <Check size={14} className="text-orange-600" />}
        </DropdownMenuItem>
        {options.map((opt) => (
          <DropdownMenuItem 
            key={opt}
            onClick={() => handleSelect(opt)}
            className="rounded-xl py-3 focus:bg-orange-50 focus:text-orange-700 cursor-pointer flex items-center justify-between"
          >
            <span className="font-bold">{opt}</span>
            {selected === opt && <Check size={14} className="text-orange-600" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
