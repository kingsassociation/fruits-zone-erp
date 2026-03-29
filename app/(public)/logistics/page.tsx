import { Truck, MapPin, ShieldCheck, Zap, Package, Globe, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function LogisticsPage() {
  const process = [
    {
      title: "Stock Sourcing",
      bnTitle: "সরাসরি সংগ্রহের ব্যবস্থা",
      desc: "Fruits sourced from central hubs and international partners are verified for quality.",
      icon: <Package className="w-8 h-8 text-orange-600" />
    },
    {
      title: "Smart Tracking",
      bnTitle: "স্মার্ট ট্র্যাকিং",
      desc: "Every crate is tracked via the ERP to ensure freshness and provenance.",
      icon: <Zap className="w-8 h-8 text-blue-600" />
    },
    {
      title: "Global Hubs",
      bnTitle: "ডেলিভারি নেটওয়ার্ক",
      desc: "Our distribution network in Chattogram ensures the fastest delivery in the region.",
      icon: <Globe className="w-8 h-8 text-orange-600" />
    }
  ]

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Hero Header */}
      <section className="relative pt-24 pb-32 md:pt-40 md:pb-48 bg-slate-50 text-slate-900 overflow-hidden rounded-b-[4rem] border-b border-slate-100">
        <div className="absolute top-0 right-0 w-[60%] h-full bg-orange-600/5 blur-[150px] -z-10 animate-pulse duration-[8s]" />
        <div className="absolute bottom-0 left-0 w-[40%] h-full bg-emerald-600/5 blur-[120px] -z-10" />
        <div className="container mx-auto px-6 text-center space-y-8 animate-in fade-in zoom-in duration-1000">
           <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-50 rounded-full text-orange-600 text-xs font-black uppercase tracking-[0.4em]">
             <Truck size={14} className="fill-orange-600" /> The Logistics Engine
           </div>
           <h1 className="text-6xl md:text-9xl font-black font-outfit tracking-tighter leading-[0.8] uppercase text-slate-900">
              Freshness, <br /> <span className="text-orange-500 underline decoration-orange-100 underline-offset-8 italic">Delivered.</span>
           </h1>
           <p className="text-2xl text-slate-500 font-black uppercase tracking-tight leading-none">আপনার দোকানে দ্রুততম সরবরাহ।</p>
           <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
              Our proprietary supply chain management ensures that premium fruits reach your shop in under 24 hours from our Chattogram hubs.
           </p>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-24 bg-slate-50/50 border-b border-slate-100">
        <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { val: "24h", label: "Delivery Time", bn: "২৪ ঘণ্টায় ডেলিভারি" },
              { val: "12+", label: "Main Hubs", bn: "১২+ ডেলিভারি হাব" },
              { val: "100%", label: "Freshness Sync", bn: "শতভাগ সতেজতা" },
              { val: "500+", label: "Stores Reached", bn: "৫০০+ দোকানে সেবা" }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                 <p className="text-5xl font-black text-slate-900 font-outfit tracking-tighter">{stat.val}</p>
                 <p className="text-xs font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                 <p className="text-[10px] text-orange-500 font-bold italic">{stat.bn}</p>
              </div>
            ))}
        </div>
      </section>

      {/* Logistics Process */}
      <section className="py-24 md:py-48 relative">
        <div className="container mx-auto px-6">
           <div className="grid md:grid-cols-2 gap-20 items-center">
              <div className="relative group">
                 <div className="aspect-square rounded-[4rem] overflow-hidden shadow-2xl relative z-10 rotate-[-2deg] group-hover:rotate-0 transition-transform duration-700">
                    <Image src="/products/Delivery.png" width={800} height={800} alt="Delivery Truck" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                 </div>
                 <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-orange-600 rounded-[3rem] p-8 text-white flex flex-col justify-end z-20 shadow-2xl animate-bounce-subtle">
                    <Truck size={40} className="mb-4" />
                    <p className="text-2xl font-black font-outfit uppercase tracking-tighter leading-none">Speed <br /> Kings</p>
                 </div>
                 <div className="absolute -top-16 -left-16 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl" />
              </div>
              
              <div className="space-y-12">
                 <div className="space-y-6">
                    <div className="w-16 h-1 bg-orange-600 rounded-full" />
                    <h2 className="text-5xl md:text-7xl font-black font-outfit text-slate-900 tracking-tighter leading-[0.85] uppercase">
                       A Smarter <br /><span className="text-orange-600">Supply Chain.</span>
                    </h2>
                    <p className="text-2xl text-slate-500 font-black uppercase tracking-tight">সঠিক সময়ে সতেজ ফল আপনার হাতে।</p>
                 </div>

                 <div className="space-y-10">
                    {process.map((p, i) => (
                      <div key={i} className="flex gap-8 group">
                         <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-orange-600 group-hover:text-white transition-all shadow-inner shrink-0 rotate-12 group-hover:rotate-0">
                            {p.icon}
                         </div>
                         <div className="space-y-1">
                            <h3 className="text-2xl font-black font-outfit text-slate-900 uppercase tracking-tighter leading-none">{p.title}</h3>
                            <p className="text-sm font-bold text-orange-600 italic uppercase leading-none mt-1">{p.bnTitle}</p>
                            <p className="text-base text-slate-600 font-medium leading-relaxed pt-2">{p.desc}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Safety Banner */}
       <section className="py-24 md:py-40 bg-orange-50 text-slate-900 rounded-[4rem] mx-4 mb-24 relative overflow-hidden group border border-orange-100/50">
          <div className="absolute top-0 right-0 w-full h-full bg-orange-600/5 blur-[150px] -z-10 animate-pulse duration-[10s]" />
          <div className="container mx-auto px-6 text-center space-y-12 animate-in slide-in-from-bottom-12 duration-1000">
             <h2 className="text-6xl md:text-8xl font-black font-outfit tracking-tighter leading-none uppercase text-slate-900">
                100% Guaranteed <br /> <span className="text-orange-600 underline underline-offset-8 decoration-orange-100">Freshness.</span>
             </h2>
             <p className="text-xl text-slate-600 font-medium max-w-3xl mx-auto italic">
               &quot;FruitsZone delivers with consistent speed and precision. Their direct-to-store logistics have cut our spoilage by 40%.&quot;
               <br />
               <span className="block mt-4 text-orange-700 font-black uppercase text-sm tracking-widest">— Md. Karim, Vendor Hub #12</span>
             </p>
            <Button asChild className="bg-orange-600 hover:bg-orange-700 h-20 px-12 rounded-[2.5rem] text-3xl font-black uppercase tracking-widest gap-6 shadow-2xl shadow-orange-200 transition-all active:scale-95 group">
                <Link href="/register">Join the Network <ArrowRight className="group-hover:translate-x-4 transition-transform" /></Link>
            </Button>
         </div>
      </section>
    </div>
  )
}
