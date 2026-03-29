"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  ArrowLeft,
  Save,
  Loader2,
  Tag,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Percent,
  Coins
} from "lucide-react"
import Link from "next/link"
import { createOffer } from "@/lib/offer-actions"
import { getFruits } from "@/lib/fruit-actions"
import { toast } from "sonner"

const offerFormSchema = z.object({
  fruitId: z.string().min(1, { message: "Please select a fruit." }),
  discount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Discount must be a positive number.",
  }),
  type: z.enum(["percentage", "fixed"]),
  startDate: z.string().min(1, { message: "Start date is required." }),
  endDate: z.string().min(1, { message: "End date is required." }),
})

type OfferFormValues = z.infer<typeof offerFormSchema>

export default function NewOfferPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fruits, setFruits] = useState<any[]>([])

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OfferFormValues>({
    resolver: zodResolver(offerFormSchema),
    defaultValues: {
      type: "percentage",
    },
  })

  // Watch for type to update UI icons
  const offerType = watch("type")

  useEffect(() => {
    async function loadFruits() {
      const data = await getFruits()
      setFruits(data)
    }
    loadFruits()
  }, [])

  const onSubmit = async (data: OfferFormValues) => {
    setLoading(true)
    setError(null)

    // Convert types for server action
    const response = await createOffer({
      ...data,
      discount: Number(data.discount),
    })

    if (response.error) {
      toast.error(response.error)
      setLoading(false)
    } else {
      toast.success("Campaign launched successfully!")
      router.push("/dashboard/offers")
      router.refresh()
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-slate-100 transition-all">
          <Link href="/dashboard/offers">
            <ArrowLeft size={20} />
          </Link>
        </Button>
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold font-outfit text-slate-900 tracking-tight leading-none">Create Campaign</h1>
          <p className="text-slate-500 text-sm">Design a new promotional offer for specific fruits.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-3xl overflow-hidden p-4">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-[0.2em] mb-2">
              <Tag size={16} /> Campaign Config
            </div>
            <CardTitle className="text-xl font-bold font-outfit text-slate-900 leading-none">Offer Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 pt-0">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 tracking-wider uppercase px-1">Select Fruit*</label>
              <Select
                onValueChange={(val: string | null) => setValue("fruitId", val || "")}
              >
                <SelectTrigger className="h-14 bg-slate-50 border-slate-100 rounded-2xl focus:ring-emerald-500 shadow-none border font-medium">
                  <SelectValue placeholder="Which fruit is this offer for?" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-slate-100 shadow-2xl p-2">
                  {fruits.map((fruit) => (
                    <SelectItem key={fruit.id} value={fruit.id} className="rounded-xl py-3 my-1 focus:bg-emerald-50 focus:text-emerald-700 cursor-pointer">
                      <div className="flex items-center justify-between w-full gap-4">
                        <span className="font-bold">{fruit.name}</span>
                        <span className="text-[10px] uppercase font-black tracking-widest text-slate-400">Current: ৳{fruit.basePrice}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.fruitId && <p className="text-xs text-red-500 px-1">{errors.fruitId.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 tracking-wider uppercase px-1">Discount Type*</label>
                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
                  <button
                    type="button"
                    onClick={() => setValue("type", "percentage")}
                    className={`h-11 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all ${offerType === "percentage" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                      }`}
                  >
                    <Percent size={16} /> Percentage
                  </button>
                  <button
                    type="button"
                    onClick={() => setValue("type", "fixed")}
                    className={`h-11 rounded-xl flex items-center justify-center gap-2 text-sm font-bold transition-all ${offerType === "fixed" ? "bg-white text-emerald-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                      }`}
                  >
                    <Coins size={16} /> Fixed BDT
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 tracking-wider uppercase px-1">Discount Value*</label>
                <div className="relative">
                  <Input
                    {...register("discount")}
                    placeholder={offerType === "percentage" ? "e.g. 15" : "e.g. 50"}
                    className="h-14 bg-slate-50 border-slate-100 rounded-2xl focus:bg-white transition-all shadow-none focus:ring-emerald-500 font-outfit text-lg font-bold pr-16"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-slate-300 pointer-events-none">
                    {offerType === "percentage" ? "%" : "BDT"}
                  </div>
                </div>
                {errors.discount && <p className="text-xs text-red-500 px-1">{errors.discount.message}</p>}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-3xl overflow-hidden p-4">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-[0.2em] mb-2">
              <Calendar size={16} /> Validity Loop
            </div>
            <CardTitle className="text-xl font-bold font-outfit text-slate-900 leading-none">Campaign Duration</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-0">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 tracking-wider uppercase px-1">Start Date*</label>
              <Input
                {...register("startDate")}
                type="date"
                className="h-14 bg-slate-50 border-slate-100 rounded-2xl focus:bg-white transition-all shadow-none focus:ring-emerald-500"
              />
              {errors.startDate && <p className="text-xs text-red-500 px-1">{errors.startDate.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 tracking-wider uppercase px-1">End Date*</label>
              <Input
                {...register("endDate")}
                type="date"
                className="h-14 bg-slate-50 border-slate-100 rounded-2xl focus:bg-white transition-all shadow-none focus:ring-emerald-500"
              />
              {errors.endDate && <p className="text-xs text-red-500 px-1">{errors.endDate.message}</p>}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4 pt-4">

          <Button
            type="submit"
            className="w-full h-16 bg-emerald-600 hover:bg-emerald-700 text-xl font-bold rounded-2xl shadow-xl shadow-emerald-200 gap-3 transition-all"
            disabled={loading}
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><CheckCircle2 size={24} /> Launch Campaign</>}
          </Button>
          <Button asChild variant="ghost" className="w-full h-14 rounded-2xl text-slate-500 font-bold hover:bg-slate-50">
            <Link href="/dashboard/offers">Discard and Go Back</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
