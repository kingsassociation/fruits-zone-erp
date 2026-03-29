"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ShoppingBasket, Search, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col relative selection:bg-orange-100 selection:text-orange-900">
      {/* Simple Header */}
      <header className="h-16 bg-white/70 backdrop-blur-md border-b border-slate-100 px-6 lg:px-10 flex items-center justify-between shrink-0 z-50">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-orange-600 p-1.5 rounded-lg text-white shadow-lg shadow-orange-100 group-hover:scale-105 transition-transform">
            <ShoppingBasket size={20} />
          </div>
          <span className="text-lg font-black font-outfit tracking-tighter uppercase">
            <span className="text-emerald-600">Fruits</span>
            <span className="text-orange-500">Zone</span>
          </span>
        </Link>
        <div className="hidden md:block text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">
          Digital Hub • Error 404
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Mesh Glows - Subtle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl aspect-square bg-gradient-to-tr from-orange-400/5 via-transparent to-emerald-400/5 blur-[100px] -z-10" />
        
        {/* Geometric Accents */}
        <div className="absolute inset-0 opacity-[0.3] -z-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, #E2E8F0 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="max-w-2xl w-full text-center space-y-6 animate-in fade-in zoom-in duration-700">
           <div className="relative inline-block">
              <div className="w-32 h-32 bg-white rounded-[2.5rem] border border-slate-100 flex items-center justify-center relative translate-y-2 -rotate-3 animate-bounce-subtle shadow-xl shadow-slate-200/50">
                 <ShoppingBasket size={54} className="text-orange-600" />
              </div>
              <div className="absolute -top-2 -right-2 bg-orange-600 text-white px-4 py-1 rounded-full text-base font-black font-outfit shadow-xl shadow-orange-500/20">404</div>
           </div>

           <div className="space-y-3">
              <h1 className="text-4xl md:text-6xl font-black font-outfit tracking-tighter leading-none uppercase text-slate-900">
                 Out of <br /> <span className="text-orange-600">Stock!</span>
              </h1>
              <p className="text-lg text-slate-500 font-black uppercase tracking-tight">আপনার কাঙ্ক্ষিত ফলটি পাওয়া যায়নি।</p>
           </div>

           <p className="text-base text-slate-600 max-w-md mx-auto leading-relaxed font-medium px-4">
             The page you are looking for has been harvested or never existed in our orchard. 
             Don&apos;t worry, the main marketplace is still open!
           </p>

           <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                onClick={() => router.back()} 
                variant="outline"
                className="h-14 px-8 rounded-2xl border-slate-200 bg-white hover:bg-slate-50 text-slate-600 font-black text-sm uppercase tracking-widest gap-3 active:scale-95 transition-all group shadow-sm"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" /> Go Back
              </Button>
              <Button asChild className="h-14 px-8 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-sm uppercase tracking-widest gap-3 shadow-lg shadow-slate-200 active:scale-95 transition-all">
                 <Link href="/"><Home size={18} /> Return Hub</Link>
              </Button>
           </div>
           
           <div className="pt-12 border-t border-dashed border-slate-200 opacity-50">
              <p className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-300">FruitsZone Digital Hub v2.0</p>
           </div>
        </div>
      </main>

      {/* Simple mini footer */}
      <header className="h-16 py-4 px-10 flex items-center justify-center text-center shrink-0">
         <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">© 2026 FruitsZone ERP. Premium Supply Chain Logic.</p>
      </header>
    </div>
  )
}
