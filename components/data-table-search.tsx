"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useTransition, useEffect, useState } from "react"
import { Search, Loader2, X } from "lucide-react"
import { Input } from "@/components/ui/input"

export function DataTableSearch({ placeholder = "Search..." }: { placeholder?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  
  const [value, setValue] = useState(searchParams.get("q") || "")

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set("q", value)
    } else {
      params.delete("q")
    }

    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    })
  }, [value, pathname, router, searchParams])

  return (
    <div className="relative w-full md:max-w-md group">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors">
        {isPending ? <Loader2 size={18} className="animate-spin" /> : <Search size={18} />}
      </div>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="pl-10 h-12 bg-white border-slate-200 rounded-xl focus:ring-orange-500 shadow-none transition-all pr-10"
      />
      {value && (
        <button 
          onClick={() => setValue("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}
