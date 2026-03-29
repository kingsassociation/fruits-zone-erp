"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { ShoppingBasket, Loader2, AlertCircle, ArrowLeft, Building2, UserCircle, CreditCard, CheckCircle2, ChevronRight, Eye, EyeOff } from "lucide-react"

const registerSchema = z.object({
  fullName: z.string().min(3, { message: "Name must be at least 3 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  businessName: z.string().min(2, { message: "Business name is required." }),
  businessAddress: z.string().min(5, { message: "Detailed address is required." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  nid: z.string().min(10, { message: "National ID (NID) must be at least 10 digits." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  planId: z.string().min(1, { message: "Please select a plan." }),
})

type RegisterFormValues = z.infer<typeof registerSchema>

import { registerVendor, getSubscriptionPlans } from "@/lib/auth-actions"
import { useEffect } from "react"

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [plans, setPlans] = useState<any[]>([])
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      planId: "starter",
    }
  })

  const selectedPlanId = watch("planId")

  useEffect(() => {
    async function fetchPlans() {
      const dbPlans = await getSubscriptionPlans()
      if (dbPlans && dbPlans.length > 0) {
        setPlans(dbPlans)
      } else {
        // Fallback for visual stability during loading or if DB empty
        setPlans([
          { id: "starter", name: "Starter", price: 0, description: "Basic shop tools & 50 orders/mo" },
          { id: "pro", name: "Pro", price: 1500, description: "Advanced analytics & 200 orders/mo" },
          { id: "enterprise", name: "Enterprise", price: 5000, description: "Full ERP suite & unlimited scan" },
        ])
      }
    }
    fetchPlans()
  }, [])

  // Multistep validation logic
  const nextStep = async () => {
    let result = false
    if (step === 1) {
      result = await trigger(["fullName", "email", "password"])
    } else if (step === 2) {
      result = await trigger(["businessName", "phone", "businessAddress", "nid"])
    }
    
    if (result) {
      setStep(step + 1)
      window.scrollTo(0, 0)
    }
  }

  const onSubmit = async (data: RegisterFormValues) => {
    setLoading(true)
    
    const response = await registerVendor(data)

    if (response.error) {
      toast.error(response.error)
      setLoading(false)
    } else if (response.paymentUrl) {
      toast.success("Registration successful! Redirecting to payment...")
      window.location.href = response.paymentUrl
    } else {
      toast.success("Welcome aboard! Your account is active.")
      setStep(4)
      setLoading(false)
    }
  }

  const handlePreSubmit = async (e: any) => {
    e.preventDefault()
    const result = await trigger()
    if (result) {
      const currentPlan = plans.find(p => p.id === selectedPlanId)
      if (currentPlan && currentPlan.price > 0) {
        setIsConfirmOpen(true)
      } else {
        handleSubmit(onSubmit)()
      }
    }
  }

  const steps = [
    { title: "Account", icon: <UserCircle className="w-5 h-5" /> },
    { title: "Business", icon: <Building2 className="w-5 h-5" /> },
    { title: "Plan", icon: <CreditCard className="w-5 h-5" /> },
  ]

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4 pt-24 pb-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[100px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[100px] -ml-64 -mb-64" />

      <div className="absolute top-8 left-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-orange-600 p-1.5 rounded-lg text-white">
            <ShoppingBasket size={24} />
          </div>
          <span className="text-xl font-black font-outfit tracking-tight uppercase">
            <span className="text-emerald-600">Fruits</span>
            <span className="text-orange-500">Zone</span>
          </span>
        </Link>
      </div>

      <div className="w-full max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-700">
        {/* Step Indicator */}
        {step < 4 && (
          <div className="flex items-center justify-between mb-8 px-4 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10 -translate-y-1/2 px-12" />
            {steps.map((s, i) => (
              <div key={i} className="flex flex-col items-center gap-2 group">
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold border-4 transition-all duration-300 ${
                    step >= i + 1 
                      ? "bg-orange-600 border-orange-100 text-white" 
                      : "bg-white border-slate-50 text-slate-400"
                  }`}
                >
                  {step > i + 1 ? <CheckCircle2 className="w-6 h-6" /> : s.icon}
                </div>
                <span className={`text-xs font-bold uppercase tracking-widest ${step >= i + 1 ? "text-orange-600" : "text-slate-400"}`}>
                  {s.title}
                </span>
              </div>
            ))}
          </div>
        )}

        <Card className="border-none shadow-2xl rounded-[2.5rem] overflow-hidden bg-white">
          <form onSubmit={handlePreSubmit}>
            {step === 4 ? (
              <CardContent className="p-16 text-center space-y-8 animate-in zoom-in duration-500">
                <div className="mx-auto w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-4 shadow-inner">
                  <CheckCircle2 size={48} />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl font-extrabold font-outfit text-slate-900 leading-tight">Registration Received!</h2>
                  <p className="text-lg text-slate-600 max-w-sm mx-auto">
                    Welcome to the FruitsZone Partner network. Our team will review your business information and 
                    contact you within <span className="text-orange-600 font-bold">24 hours</span> to activate your dashboard.
                  </p>
                </div>
                <Button asChild className="h-16 px-12 rounded-2xl text-xl bg-slate-900 hover:bg-slate-800 shadow-xl shadow-slate-200 w-full">
                  <Link href="/">Back to Home</Link>
                </Button>
              </CardContent>
            ) : (
              <>
                <CardHeader className="space-y-4 pt-12 pb-8 text-center px-12 transition-all">
                  <CardTitle className="text-3xl font-extrabold font-outfit text-slate-900 tracking-tight leading-tight">
                    {step === 1 && "Create Your Account"}
                    {step === 2 && "Identity Verification"}
                    {step === 3 && "Select Membership Plan"}
                  </CardTitle>
                  <CardDescription className="text-slate-500 text-lg">
                    {step === 1 && "Start your journey as a certified vendor partner today."}
                    {step === 2 && "Standard business details required for ERP onboarding."}
                    {step === 3 && "Choose a toolset that fits your wholesale needs."}
                  </CardDescription>
                </CardHeader>

                <CardContent className="px-12 pb-10 space-y-6">

                  {step === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 tracking-wider uppercase px-1">Full Name*</label>
                        <Input {...register("fullName")} placeholder="e.g. Abdur Rahman" className="h-14 bg-slate-50 border-slate-100 rounded-xl focus:bg-white transition-all shadow-none focus:ring-orange-500" />
                        {errors.fullName && <p className="text-xs text-red-500 px-1">{errors.fullName.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 tracking-wider uppercase px-1">Email Address*</label>
                        <Input {...register("email")} placeholder="rahman@example.com" type="email" className="h-14 bg-slate-50 border-slate-100 rounded-xl focus:bg-white transition-all shadow-none focus:ring-orange-500" />
                        {errors.email && <p className="text-xs text-red-500 px-1">{errors.email.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 tracking-wider uppercase px-1">Create Password*</label>
                        <div className="relative">
                          <Input 
                            {...register("password")} 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Min 6 characters" 
                            className="h-14 bg-slate-50 border-slate-100 rounded-xl focus:bg-white transition-all shadow-none focus:ring-orange-500 pr-12" 
                          />
                          <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                        {errors.password && <p className="text-xs text-red-500 px-1">{errors.password.message}</p>}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 tracking-wider uppercase px-1">Business Shop Name*</label>
                        <Input {...register("businessName")} placeholder="e.g. Rahman Fresh Fruits Store" className="h-14 bg-slate-50 border-slate-100 rounded-xl focus:bg-white transition-all shadow-none focus:ring-orange-500" />
                        {errors.businessName && <p className="text-xs text-red-500 px-1">{errors.businessName.message}</p>}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-700 tracking-wider uppercase px-1">Active Phone No*</label>
                          <Input {...register("phone")} placeholder="+880 1XXX XXXXXX" className="h-14 bg-slate-50 border-slate-100 rounded-xl focus:bg-white transition-all shadow-none focus:ring-orange-500" />
                          {errors.phone && <p className="text-xs text-red-500 px-1">{errors.phone.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-700 tracking-wider uppercase px-1">National ID (NID)*</label>
                          <Input {...register("nid")} placeholder="1234567890" className="h-14 bg-slate-50 border-slate-100 rounded-xl focus:bg-white transition-all shadow-none focus:ring-orange-500" />
                          {errors.nid && <p className="text-xs text-red-500 px-1">{errors.nid.message}</p>}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-700 tracking-wider uppercase px-1">Detailed Hub Address*</label>
                        <Input {...register("businessAddress")} placeholder="House, Road, Area, Chattogram" className="h-14 bg-slate-50 border-slate-100 rounded-xl focus:bg-white transition-all shadow-none focus:ring-orange-500" />
                        {errors.businessAddress && <p className="text-xs text-red-500 px-1">{errors.businessAddress.message}</p>}
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                      {plans.map((p) => (
                        <div 
                          key={p.id}
                          onClick={() => setValue("planId", p.id)}
                          className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                            selectedPlanId === p.id 
                              ? "bg-orange-50 border-orange-600 shadow-lg shadow-orange-50" 
                              : "bg-white border-slate-100 hover:border-orange-200"
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2">
                             <div>
                               <h5 className="font-bold text-slate-900 text-lg">{p.name}</h5>
                               <p className="text-xs text-slate-500">{p.description}</p>
                             </div>
                             <div className="text-right">
                               <p className="text-xl font-black text-orange-600 font-outfit">৳{p.price}</p>
                               <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">per month</p>
                             </div>
                          </div>
                        </div>
                      ))}
                      <p className="text-[10px] text-slate-400 text-center px-4 italic leading-relaxed py-2">
                        By completing registration, you agree to FruitsZone partner terms. Paid plans will redirect to SSLCommerz.
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-8 border-t border-slate-100">
                    {step > 1 ? (
                      <Button 
                        type="button" 
                        variant="ghost" 
                        onClick={() => setStep(step - 1)}
                        className="text-slate-500 font-bold gap-2 px-6"
                      >
                        <ArrowLeft size={18} /> Back
                      </Button>
                    ) : <div />}
                    
                    {step < 3 ? (
                      <Button 
                        type="button" 
                        onClick={nextStep}
                        className="bg-orange-600 hover:bg-orange-700 h-14 px-8 rounded-xl font-bold flex items-center gap-2 text-white shadow-xl shadow-orange-100"
                      >
                        Continue <ChevronRight size={18} />
                      </Button>
                    ) : (
                      <Button 
                        type="submit" 
                        disabled={loading}
                        className="bg-slate-900 hover:bg-slate-800 h-14 px-10 rounded-xl font-bold flex items-center gap-2 text-white shadow-xl shadow-slate-200"
                      >
                        {loading ? <Loader2 className="animate-spin" /> : "Complete Registration"}
                      </Button>
                    )}
                  </div>
                </CardContent>

                {/* Sub-footer confirmation dialog for paid plans */}
                <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                  <DialogContent className="rounded-[2.5rem] border-none shadow-2xl p-0 max-w-md overflow-hidden bg-white">
                    <div className="p-10 bg-slate-900 text-white space-y-2">
                       <DialogTitle className="text-2xl font-black font-outfit">Confirm Subscription</DialogTitle>
                       <DialogDescription className="text-slate-400">You are choosing a paid membership plan.</DialogDescription>
                    </div>
                    <div className="p-10 space-y-6">
                       <p className="text-slate-600 font-medium">By proceeding, you will be redirected to the secure **SSLCommerz** gateway to complete your ৳{plans.find(p => p.id === selectedPlanId)?.price} payment.</p>
                       <DialogFooter className="flex-col sm:flex-row gap-3">
                          <Button variant="ghost" onClick={() => setIsConfirmOpen(false)} className="h-14 rounded-2xl font-bold">Cancel</Button>
                          <Button 
                            onClick={() => {
                              setIsConfirmOpen(false)
                              handleSubmit(onSubmit)()
                            }} 
                            className="h-14 bg-orange-600 hover:bg-orange-700 rounded-2xl font-bold flex-1"
                          >
                            Yes, Proceed to Payment
                          </Button>
                       </DialogFooter>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <CardFooter className="bg-slate-50 px-12 py-8 justify-center border-t border-slate-100">
                  <p className="text-slate-500 text-sm">
                    Already a partner?{" "}
                    <Link href="/login" className="font-bold text-orange-600 hover:text-orange-500 transition-colors">
                      Sign in here
                    </Link>
                  </p>
                </CardFooter>
              </>
            )}
          </form>
        </Card>
      </div>
    </div>
  )
}
