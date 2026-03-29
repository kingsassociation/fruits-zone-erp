import Link from "next/link"
import Image from "next/image"
import { 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  ShoppingCart, 
  Layers, 
  Globe, 
  Users,
  Star,
  Zap,
  PlusCircle,
  Truck,
  LineChart,
  ChevronRight,
  Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog"

export default function LandingPage() {
  const coreValues = [
    {
      title: "Simple Digital Ledger",
      banglaTitle: "সহজ ডিজিটাল হিসাব",
      desc: "Record every sale and credit (Udhar) with a single tap. No more paper khata.",
      icon: <LineChart className="w-6 h-6 text-orange-600" />
    },
    {
      title: "Smart Stock Sync",
      banglaTitle: "স্মার্ট ইনভেন্টরি",
      desc: "Direct link to central marketplace. Order stock and see it in your shop automatically.",
      icon: <Layers className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Fast Delivery",
      banglaTitle: "দ্রুত ডেলিভারি",
      desc: "Fresh fruits from the hub directly to your shop location next day.",
      icon: <Truck className="w-6 h-6 text-orange-600" />
    },
    {
      title: "Verified Quality",
      banglaTitle: "সুনিশ্চিত মান",
      desc: "Every fruit is inspected by FruitsZone experts for premium quality assurance.",
      icon: <ShieldCheck className="w-6 h-6 text-purple-600" />
    }
  ]

  const spotLightProducts = [
    { name: "Ajwa Dates", category: "Premium", img: "/products/Ajwa Dates.png", price: "৳1,250/kg" },
    { name: "Dragon Fruit", category: "Exotic", img: "/products/Dragon.png", price: "৳350/kg" },
    { name: "Avocado", category: "Health", img: "/products/Avocado.png", price: "৳850/kg" },
    { name: "Honey", category: "Organic", img: "/products/Honey.png", price: "৳650/kg" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-24 md:pb-32 overflow-hidden">
        {/* Dynamic Background Accents */}
        <div className="absolute top-0 right-[-10%] w-[60%] h-full bg-orange-50 rounded-full blur-[120px] opacity-40 -z-10" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-50/50 rounded-full blur-[100px] -z-10" />

        <div className="container mx-auto px-6 lg:flex items-center gap-16">
           <div className="lg:w-1/2 space-y-10 animate-in fade-in slide-in-from-left-12 duration-1000">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-50 rounded-full text-orange-700 text-xs font-black uppercase tracking-widest border border-orange-100/50">
                 <Sparkles size={14} className="fill-orange-600" /> Digital solution for Your Business
              </div>
              
              <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl font-black font-outfit text-slate-900 tracking-tighter leading-[0.85] uppercase">
                   Grow Fast. <br /> <span className="text-orange-600">Scale Big.</span>
                </h1>
                 <p className="text-4xl md:text-5xl font-black font-outfit text-slate-500 tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-slate-500 to-slate-400">
                    ব্যবসাকে সমৃদ্ধ করুন <br /> আধুনিক প্রযুক্তিতে।
                 </p>
              </div>

               <p className="text-xl text-slate-600 max-w-lg leading-relaxed font-medium border-l-4 border-orange-500 pl-6 bg-slate-50/50 py-4 rounded-r-2xl">
                 Your shop&apos;s digital partner. Manage sales, track credit, and buy premium fruits directly from the central hub. 
                 <span className="block mt-2 text-emerald-600 font-bold italic">সঠিক হিসাব, দ্রুত বৃদ্ধি।</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-5 pt-4">
                 <Dialog>
                   <DialogTrigger render={
                     <Button className="bg-orange-600 hover:bg-orange-700 text-white h-20 px-12 rounded-[2rem] text-2xl font-black gap-4 shadow-2xl shadow-orange-200 transition-all hover:scale-105 active:scale-95 group">
                        Join Now <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                     </Button>
                   } />
                   <DialogContent className="rounded-[3rem] border-none shadow-[0_35px_60px_-15px_rgba(249,115,22,0.3)] p-0 max-w-lg overflow-hidden bg-white">
                      <div className="p-12 bg-orange-600 text-white space-y-3 relative">
                        <DialogTitle className="text-4xl font-black font-outfit uppercase leading-none">Become a Partner</DialogTitle>
                        <DialogDescription className="text-orange-50 text-xl font-medium opacity-80">ঘরে বসেই ফল ব্যবসার ডিজিটাল সমাধান।</DialogDescription>
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                      </div>
                      <div className="p-12 space-y-8">
                        <div className="space-y-6">
                           {[
                             { step: 1, text: "Create profile with NID." },
                             { step: 2, text: "Choose a business plan." },
                             { step: 3, text: "Start selling digitally." }
                           ].map(item => (
                             <div key={item.step} className="flex gap-5 items-center">
                                <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 font-black text-xl shadow-inner">{item.step}</div>
                                <p className="text-slate-700 font-bold text-lg">{item.text}</p>
                             </div>
                           ))}
                        </div>
                        <Button asChild className="w-full h-16 bg-slate-900 hover:bg-slate-800 rounded-2xl font-black text-xl shadow-xl shadow-slate-200 uppercase tracking-widest">
                          <Link href="/register">Procced to Register</Link>
                        </Button>
                      </div>
                   </DialogContent>
                 </Dialog>
                 <Button variant="outline" className="h-20 px-10 rounded-[2rem] text-xl font-black border-slate-200 hover:bg-slate-50 transition-all hover:border-orange-600 uppercase tracking-widest text-slate-600">
                    Pricing Plans
                 </Button>
              </div>

              <div className="flex items-center gap-8 pt-10">
                 <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-14 h-14 rounded-2xl border-[6px] border-white bg-slate-200 overflow-hidden shadow-lg rotate-[10deg] group-hover:rotate-0 transition-transform">
                         <Image src={`https://i.pravatar.cc/150?u=${i+10}`} width={56} height={56} alt="Partner" />
                      </div>
                    ))}
                 </div>
                 <div className="space-y-1">
                    <p className="text-lg font-black text-slate-900 leading-none">500+ Local Vendors</p>
                    <p className="text-xs text-slate-500 font-black uppercase tracking-widest">৫০০+ সফল ব্যবসায়ী আমাদের সাথে আছেন</p>
                 </div>
              </div>
           </div>
           
           <div className="lg:w-1/2 mt-24 lg:mt-0 relative animate-in zoom-in-95 duration-1000 delay-200 group">
              <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] group-hover:scale-[1.02] transition-transform duration-1000 rotate-[3deg] group-hover:rotate-0">
                 <Image src="/hero-banner.png" width={800} height={1000} alt="Fruit Display" className="w-full h-auto" priority />
                 <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              </div>
              
              {/* Floating KPI Cards */}
              <div className="absolute -bottom-12 -left-12 z-20 w-72 p-8 rounded-[2.5rem] shadow-2xl border-none bg-white animate-bounce-subtle">
                 <div className="flex items-center gap-5 mb-5">
                    <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl shadow-inner"><TrendingUp size={28} /></div>
                    <div>
                       <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Daily Sales</p>
                      <p className="text-2xl font-black text-slate-900 font-outfit tracking-tighter">৳84,200+</p>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="h-2.5 w-full bg-slate-50 rounded-full overflow-hidden shadow-inner">
                       <div className="h-full w-[85%] bg-orange-500 rounded-full" />
                    </div>
                    <p className="text-[10px] text-right text-orange-600 font-black uppercase tracking-widest">Target Reached 85%</p>
                 </div>
              </div>

              <div className="absolute top-10 -right-8 z-20 w-48 p-6 rounded-[2rem] shadow-2xl border border-slate-100 bg-white animate-in slide-in-from-top-12 duration-1000 delay-1000">
                 <p className="text-[10px] font-black uppercase text-orange-600 tracking-widest mb-2 flex items-center gap-1.5 align-middle"><ShieldCheck size={12} /> Certified</p>
                 <p className="text-lg font-black font-outfit leading-[1.1] text-slate-900">Premium <br /> Quality Fruits</p>
                  <p className="text-[10px] text-slate-500 font-medium mt-2">সেরা মানের ফল নিশ্চিতে আমরা প্রতিশ্রুতিবদ্ধ</p>
              </div>
              
              <div className="absolute -top-16 -right-16 z-0 w-64 h-64 bg-orange-400/10 rounded-full blur-[80px]" />
           </div>
        </div>
      </section>

      {/* Trust & Impact Bar */}
      <section id="impact" className="py-24 bg-slate-50/50 border-y border-slate-100">
        <div className="container mx-auto px-6">
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                { label: "Active Partners", val: "500+", bn: "অ্যাকটিভ পার্টনার", icon: <Users size={24} className="text-orange-600" /> },
                { label: "Monthly Orders", val: "2.5K+", bn: "মাসিক অর্ডার", icon: <Zap size={24} className="text-orange-600" /> },
                { label: "Global Presence", val: "12 Hubs", bn: "ডেলিভারি হাব", icon: <Globe size={24} className="text-orange-600" /> },
                { label: "Partner Growth", val: "85%", bn: "ব্যবসায়ী প্রবৃদ্ধি", icon: <Sparkles size={24} className="text-orange-600" /> }
              ].map((stat, i) => (
                <div key={i} className="relative group text-center lg:text-left md:border-r border-slate-100 last:border-none p-4 hover:bg-white rounded-3xl transition-all duration-500">
                   <div className="mb-4 inline-block">{stat.icon}</div>
                   <p className="text-5xl font-black text-slate-900 font-outfit tracking-tighter mb-1 leading-none">{stat.val}</p>
                   <p className="text-xs font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                   <p className="text-[10px] text-orange-500 font-bold italic">{stat.bn}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Features Grid - Simple Words */}
      <section id="features" className="py-24 md:py-40 relative">
        <div className="container mx-auto px-6">
           <div className="max-w-3xl mb-24 space-y-6">
              <div className="w-16 h-1 bg-orange-600 rounded-full" />
              <h2 className="text-5xl md:text-7xl font-black font-outfit text-slate-900 tracking-tighter leading-[0.85] uppercase">
                 Tools Built for <br /><span className="text-orange-600">Your Shop.</span>
              </h2>
               <p className="text-2xl text-slate-500 font-black uppercase tracking-tight">ব্যবসায়ী হিসাব হোক সহজ এবং আধুনিক।</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
              {coreValues.map((f, i) => (
                <Card key={i} className="p-10 rounded-[3rem] border-none shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 group bg-slate-50/30 hover:bg-white relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-1000 scale-150 transform rotate-12">
                      {f.icon}
                   </div>
                   <CardContent className="p-0 space-y-8 relative z-10">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all duration-700 shadow-sm border border-slate-100/50">
                         {f.icon}
                      </div>
                      <div className="space-y-4">
                         <div>
                            <h3 className="text-2xl font-black font-outfit text-slate-900 uppercase tracking-tight leading-none group-hover:text-orange-600 transition-colors">{f.title}</h3>
                            <p className="text-sm font-bold text-orange-500 mt-1 italic">{f.banglaTitle}</p>
                         </div>
                          <p className="text-base text-slate-600 font-medium leading-relaxed">{f.desc}</p>
                      </div>
                      <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                         <Button variant="ghost" className="p-0 font-black text-xs uppercase tracking-widest text-orange-600 flex items-center gap-2">
                           Learn more <ChevronRight size={14} />
                         </Button>
                      </div>
                   </CardContent>
                </Card>
              ))}
           </div>
        </div>
      </section>

      {/* Product Highlight - Premium Catalog */}
       <section id="products" className="py-24 md:py-40 bg-slate-50 text-slate-900 rounded-[4rem] mx-4 mb-32 overflow-hidden relative border border-slate-100">
        <div className="absolute top-0 right-0 w-[60%] h-full bg-orange-600/5 blur-[150px] -z-10 animate-pulse duration-[10s]" />
        <div className="absolute bottom-0 left-0 w-[40%] h-full bg-emerald-600/5 blur-[120px] -z-10" />
        <div className="container mx-auto px-10">
           <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
              <div className="space-y-6">
                 <p className="text-orange-600 font-black text-sm uppercase tracking-[0.4em]">Collection 2026</p>
                 <h2 className="text-6xl md:text-8xl font-black font-outfit tracking-tighter leading-[0.8] uppercase">
                    The Premium <br /> <span className="text-orange-600 underline decoration-orange-100 underline-offset-8">Inventory.</span>
                 </h2>
                 <p className="text-2xl text-slate-500 font-black uppercase tracking-tight">সেরা মানের ফল এখন সরাসরি আপনার দোকানে।</p>
              </div>
              <Button asChild className="h-20 lg:h-24 px-12 rounded-full bg-slate-900 text-white hover:bg-orange-600 transition-all duration-500 text-2xl font-black uppercase tracking-tighter gap-4 shadow-2xl flex-shrink-0 group">
                 <Link href="/pricing">
                   Full Marketplace <ArrowRight className="group-hover:translate-x-3 transition-transform" />
                 </Link>
              </Button>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {spotLightProducts.map((p, i) => (
                <div key={i} className="group relative bg-white border border-slate-100 rounded-[3.5rem] p-10 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-100/50 transition-all duration-1000 overflow-hidden">
                   <div className="absolute -top-12 -right-12 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                   <div className="relative w-full aspect-square mb-10">
                      <Image src={p.img} width={400} height={400} alt={p.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-1000" />
                   </div>
                   <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em] group-hover:text-orange-600">{p.category}</p>
                      <h4 className="text-3xl font-black font-outfit text-slate-900 uppercase tracking-tighter leading-none">{p.name}</h4>
                      <p className="text-xl font-bold font-outfit text-orange-600 group-hover:text-orange-700 mt-4">{p.price}</p>
                   </div>
                   <div className="absolute bottom-10 right-10 w-14 h-14 bg-orange-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-50 group-hover:scale-100 shadow-xl shadow-orange-500/20">
                      <PlusCircle size={32} />
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* CTA Section - Simple & Effective */}
      <section className="py-24 md:py-48 relative overflow-hidden">
         <div className="container mx-auto px-6 text-center space-y-16">
            <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-12 duration-1000">
               <h2 className="text-7xl md:text-9xl font-black font-outfit text-slate-900 tracking-tighter leading-[0.8] uppercase">
                  Ready to <br /> <span className="text-orange-600 underline decoration-orange-100 underline-offset-8">Win?</span>
               </h2>
                <p className="text-3xl text-slate-600 font-black uppercase tracking-tight">আপনার ফল ব্যবসার সফলতা শুরু হোক এখান থেকেই।</p>
                <p className="text-xl text-slate-700 font-medium max-w-2xl mx-auto leading-relaxed">Join FruitsZone today. No complex setups. No hidden fees. Just simple tracking and growth.</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
               <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white h-24 px-16 rounded-[2.5rem] text-3xl font-black gap-6 shadow-2xl shadow-orange-200 group active:scale-95 transition-all">
                  <Link href="/register">Start Now <ArrowRight className="w-10 h-10 group-hover:translate-x-4 transition-transform" /></Link>
               </Button>
               <div className="text-left font-outfit p-4 px-10 border-l-[6px] border-slate-100">
                  <p className="text-slate-900 font-black text-2xl leading-tight uppercase tracking-widest">Free Trial</p>
                  <p className="text-orange-600 font-bold text-lg italic">১৫ দিন ফ্রি ট্রায়াল</p>
               </div>
            </div>
         </div>
         
         <div className="absolute top-1/2 left-0 w-64 h-64 bg-orange-100/30 rounded-full blur-[100px] -z-10" />
         <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-100/20 rounded-full blur-[150px] -z-10" />
      </section>
    </div>
  )
}
