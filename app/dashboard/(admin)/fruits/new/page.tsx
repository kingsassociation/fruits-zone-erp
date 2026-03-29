"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { 
  ArrowLeft, 
  Save, 
  Loader2, 
  ImagePlus, 
  AlertCircle,
  PackageCheck,
  Tag,
  Scale
} from "lucide-react"
import Link from "next/link"
import { createFruit } from "@/lib/fruit-actions"
import { toast } from "sonner"

const fruitFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  category: z.string().min(1, { message: "Please select a category." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number.",
  }),
  unit: z.string().min(1, { message: "Please select a unit." }),
  imageUrl: z.string().optional(),
})

type FruitFormValues = z.infer<typeof fruitFormSchema>

export default function NewFruitPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FruitFormValues>({
    resolver: zodResolver(fruitFormSchema),
    defaultValues: {
      unit: "kg",
      category: "fresh-fruits",
    },
  })

  const onSubmit = async (data: FruitFormValues) => {
    setLoading(true)
    setError(null)
    
    // Casting price string to number for server action
    const response = await createFruit({
      ...data,
      price: Number(data.price),
    })

    if (response.error) {
      toast.error(response.error)
      setLoading(false)
    } else {
      toast.success("Fruit created successfully!")
      router.push("/dashboard/fruits")
      router.refresh()
    }
  }

  const categories = [
    { value: "fresh-fruits", label: "Fresh Fruits" },
    { value: "dry-fruits", label: "Dry Fruits" },
    { value: "nuts", label: "Nuts & Seeds" },
    { value: "combos", label: "Value Combos" },
    { value: "gift-packs", label: "Premium Gift Packs" },
  ]

  const units = [
    { value: "kg", label: "Kilogram (kg)" },
    { value: "gm", label: "Gram (gm)" },
    { value: "pcs", label: "Pieces (pcs)" },
    { value: "box", label: "Box / Cartons" },
    { value: "packet", label: "Packets" },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:bg-slate-100 transition-all">
          <Link href="/dashboard/fruits">
            <ArrowLeft size={20} />
          </Link>
        </Button>
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold font-outfit text-slate-900 tracking-tight leading-none">Add New Fruit</h1>
          <p className="text-slate-500 text-sm">Create a new entry in your global fruit catalog.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-3xl overflow-hidden p-4">
            <CardHeader className="pb-4">
               <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-[0.2em] mb-2">
                 <PackageCheck size={16} /> Basic Details
               </div>
               <CardTitle className="text-xl font-bold font-outfit text-slate-900 leading-none">Product Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-0">
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-700 tracking-wider uppercase px-1">Fruit Name*</label>
                 <Input 
                   {...register("name")}
                   placeholder="e.g. Alphonso Mango (Premium)" 
                   className="h-14 bg-slate-50 border-slate-100 rounded-2xl focus:bg-white transition-all shadow-none focus:ring-emerald-500" 
                 />
                 {errors.name && <p className="text-xs text-red-500 px-1">{errors.name.message}</p>}
               </div>

               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-700 tracking-wider uppercase px-1">Detailed Description*</label>
                 <Textarea 
                   {...register("description")}
                   placeholder="Provide details about the source, taste, and quality standards..." 
                   className="min-h-[150px] bg-slate-50 border-slate-100 rounded-2xl focus:bg-white transition-all shadow-none focus:ring-emerald-500 resize-none p-4"
                 />
                 {errors.description && <p className="text-xs text-red-500 px-1">{errors.description.message}</p>}
               </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-3xl overflow-hidden p-4">
            <CardHeader className="pb-4">
               <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-[0.2em] mb-2">
                 <Tag size={16} /> Commercials
               </div>
               <CardTitle className="text-xl font-bold font-outfit text-slate-900 leading-none">Price & Unit Settings</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-0">
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-700 tracking-wider uppercase px-1">Standard Rate (৳)*</label>
                 <div className="relative">
                   <div className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">৳</div>
                   <Input 
                     {...register("price")}
                     placeholder="0.00" 
                     className="h-14 pl-10 bg-slate-50 border-slate-100 rounded-2xl focus:bg-white transition-all shadow-none focus:ring-emerald-500 font-outfit text-lg font-bold" 
                   />
                 </div>
                 {errors.price && <p className="text-xs text-red-500 px-1">{errors.price.message}</p>}
               </div>

               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-700 tracking-wider uppercase px-1">Base Unit*</label>
                 <Select 
                   onValueChange={(val) => setValue("unit", val || "kg")} 
                   defaultValue="kg"
                 >
                   <SelectTrigger className="h-14 bg-slate-50 border-slate-100 rounded-2xl focus:ring-emerald-500 shadow-none border font-medium">
                     <SelectValue placeholder="Select Unit" />
                   </SelectTrigger>
                   <SelectContent className="rounded-2xl border-slate-100 shadow-2xl p-2">
                     {units.map((unit) => (
                       <SelectItem key={unit.value} value={unit.value} className="rounded-xl py-2 my-1 focus:bg-emerald-50 focus:text-emerald-700 cursor-pointer">
                         {unit.label}
                       </SelectItem>
                     ))}
                   </SelectContent>
                 </Select>
               </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-8">
           <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-3xl overflow-hidden p-4">
             <CardHeader className="pb-4">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-[0.2em] mb-2">
                  <Scale size={16} /> Categorization
                </div>
                <CardTitle className="text-xl font-bold font-outfit text-slate-900 leading-none">Classify Product</CardTitle>
             </CardHeader>
             <CardContent className="pt-0">
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-700 tracking-wider uppercase px-1">Product Category*</label>
                 <Select 
                   onValueChange={(val) => setValue("category", val || "")}
                   defaultValue="fresh-fruits"
                 >
                   <SelectTrigger className="h-14 bg-slate-50 border-slate-100 rounded-2xl focus:ring-emerald-500 shadow-none border font-medium">
                     <SelectValue placeholder="Select Category" />
                   </SelectTrigger>
                   <SelectContent className="rounded-2xl border-slate-100 shadow-2xl p-2">
                     {categories.map((cat) => (
                       <SelectItem key={cat.value} value={cat.value} className="rounded-xl py-2 my-1 focus:bg-emerald-50 focus:text-emerald-700 cursor-pointer">
                         {cat.label}
                       </SelectItem>
                     ))}
                   </SelectContent>
                 </Select>
               </div>
             </CardContent>
           </Card>

           <Card className="border-none shadow-sm shadow-slate-200/50 bg-white rounded-3xl overflow-hidden p-4">
             <CardHeader className="pb-4">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-[0.2em] mb-2">
                  <ImagePlus size={16} /> Asset Media
                </div>
                <CardTitle className="text-xl font-bold font-outfit text-slate-900 leading-none">Product Image</CardTitle>
             </CardHeader>
             <CardContent className="pt-0 space-y-4">
               <div className="aspect-square bg-slate-50 border-2 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center text-center p-6 transition-all hover:bg-white hover:border-emerald-200 group cursor-pointer">
                 <div className="p-4 bg-white rounded-full text-slate-400 group-hover:text-emerald-600 shadow-sm transition-all mb-4">
                   <ImagePlus size={32} />
                 </div>
                 <p className="text-sm font-bold text-slate-900 leading-none mb-1">Click to Upload</p>
                 <p className="text-[10px] text-slate-400 font-medium px-4">PNG, JPG or WebP. Max 4MB size.</p>
               </div>
               <p className="text-[10px] text-center text-slate-400 italic font-medium">* Image upload powered by UploadThing</p>
             </CardContent>
           </Card>

           <div className="space-y-4 pt-4">
              
              <Button 
                type="submit" 
                className="w-full h-16 bg-emerald-600 hover:bg-emerald-700 text-xl font-bold rounded-2xl shadow-xl shadow-emerald-200 gap-3 transition-all"
                disabled={loading}
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Save size={24} /> Create Fruit</>}
              </Button>
              <Button asChild variant="ghost" className="w-full h-14 rounded-2xl text-slate-500 font-bold hover:bg-slate-50">
                <Link href="/dashboard/fruits">Cancel and Go Back</Link>
              </Button>
           </div>
        </div>
      </form>
    </div>
  )
}
