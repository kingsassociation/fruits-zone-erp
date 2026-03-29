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
import { ShoppingBasket, Loader2, AlertCircle, Eye, EyeOff } from "lucide-react"

import { login } from "@/lib/auth-actions"

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  // This is a placeholder for the actual login action in Phase 3
  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true)
    
    try {
      const response = await login(data)
      if (response?.error) {
        toast.error(response.error)
        setLoading(false)
      }
      // Success is handled by the server redirect in NextAuth v5
    } catch (err) {
      // In Next.js Server Actions, a redirect throws an error that should not be caught as an actual failure
      if (err instanceof Error && err.message === "NEXT_REDIRECT") {
        return;
      }
      toast.error("Invalid credentials or unexpected error. Please try again.")
      setLoading(false)
    }

  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4">
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

      <Card className="w-full max-w-md border-none shadow-2xl rounded-3xl overflow-hidden bg-white mt-12">
        <CardHeader className="space-y-4 pt-10 pb-6 text-center">
          <CardTitle className="text-3xl font-extrabold font-outfit text-slate-900 tracking-tight">Welcome Back</CardTitle>
          <CardDescription className="text-slate-500 text-lg">
            Access your vendor dashboard and manage your stocks.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 tracking-tight uppercase px-1">Email Address</label>
              <Input 
                {...register("email")}
                placeholder="vendor@example.com" 
                className={`h-14 bg-slate-50 border-slate-100 rounded-xl focus:bg-white transition-all shadow-none focus:ring-orange-500 ${errors.email ? "border-red-300" : ""}`}
                disabled={loading}
              />
              {errors.email && <p className="text-xs text-red-500 px-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-bold text-slate-700 tracking-tight uppercase">Password</label>
                <Link href="#" className="text-xs font-semibold text-orange-600 hover:text-orange-500">Forgot Password?</Link>
              </div>
              <div className="relative">
                <Input 
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  className={`h-14 bg-slate-50 border-slate-100 rounded-xl focus:bg-white transition-all shadow-none focus:ring-orange-500 pr-12 ${errors.password ? "border-red-300" : ""}`}
                  disabled={loading}
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

            <Button 
               type="submit" 
               className="w-full h-16 bg-orange-600 hover:bg-orange-700 text-xl font-bold rounded-2xl shadow-xl shadow-orange-100 gap-3 group transition-all mt-4"
               disabled={loading}
            >
               {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Sign In"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="bg-slate-50 px-8 py-8 justify-center border-t border-slate-100">
          <p className="text-slate-500">
            Not a partner yet?{" "}
            <Link href="/register" className="font-bold text-orange-600 hover:text-orange-500 transition-colors">
              Become a Partner
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
