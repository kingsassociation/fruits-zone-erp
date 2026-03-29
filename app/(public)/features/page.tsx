import { 
  LineChart, 
  Layers, 
  Truck, 
  ShieldCheck, 
  History, 
  Smartphone, 
  BarChart3, 
  ArrowRight,
  Zap,
  Users,
  CheckCircle2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function FeaturesPage() {
  const mainFeatures = [
    {
      title: "Digital Tali-Khata",
      bnTitle: "ডিজিটাল টালি-খাতা",
      desc: "Replace your paper records with a lightning-fast digital ledger. Record sales, track credit (Udhar), and see your daily profit in real-time.",
      icon: <LineChart className="w-10 h-10 text-orange-600" />,
      image: "/products/Avocado.png" // Placeholder for feature-specific visual
    },
    {
      title: "Smart Inventory Sync",
      bnTitle: "স্মার্ট ইনভেন্টরি সিঙ্ক",
      desc: "Connect directly to the central FruitsZone marketplace. Order exotic and premium fruits and see them added to your shop's stock automatically.",
      icon: <Layers className="w-10 h-10 text-emerald-600" />,
      image: "/products/Dragon.png"
    },
    {
      title: "Logistics Engine",
      bnTitle: "লজিস্টিকস ইঞ্জিন",
      desc: "Real-time tracking of your orders from the Chattogram hub to your shop front. Next-day delivery guaranteed for certified partners.",
      icon: <Truck className="w-10 h-10 text-orange-600" />,
      image: "/products/Delivery.png"
    }
  ]

  const technicalSpecs = [
    { name: "Cloud Backup", desc: "Your data is safe even if your phone is lost.", icon: <ShieldCheck className="text-emerald-500" /> },
    { name: "Offline Mode", desc: "No internet? No problem. Syncs when you're back online.", icon: <Smartphone className="text-orange-500" /> },
    { name: "Sales Reports", desc: "Detailed weekly and monthly growth analytics.", icon: <BarChart3 className="text-blue-500" /> },
    { name: "Customer Management", desc: "Build loyalty with your own digital customer list.", icon: <Users className="text-purple-500" /> }
  ]

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 md:pt-40 md:pb-48 bg-orange-50 text-slate-900 overflow-hidden rounded-b-[4rem] border-b border-orange-100/50">
        <div className="absolute top-0 right-0 w-[70%] h-full bg-orange-600/5 blur-[150px] -z-10 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[40%] h-full bg-emerald-600/5 blur-[120px] -z-10" />
        
        <div className="container mx-auto px-6 text-center space-y-8 animate-in fade-in slide-in-from-top-12 duration-1000">
           <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-100/50 rounded-full text-orange-800 text-xs font-black uppercase tracking-[0.4em]">
             <Zap size={14} className="fill-orange-600" /> Powered by Modern Tech
           </div>
           <h1 className="text-6xl md:text-9xl font-black font-outfit tracking-tighter leading-[0.8] uppercase text-slate-900">
              The Power to <br /> <span className="text-orange-600 underline decoration-orange-100 underline-offset-8">Scale Big.</span>
           </h1>
           <p className="text-2xl text-slate-500 font-black uppercase tracking-tight">সবুজ এবং সতেজ ব্যবসার আধুনিক হাতিয়ার।</p>
           <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
             Everything you need to run a modern fruit business. From digital ledger (Khata) to live marketplace synchronization.
           </p>
        </div>
      </section>

      {/* Main Features Showcase */}
      <section className="py-24 md:py-48">
        <div className="container mx-auto px-6 space-y-32 md:space-y-48">
           {mainFeatures.map((feature, i) => (
             <div key={i} className={`flex flex-col lg:flex-row items-center gap-16 md:gap-32 ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className="lg:w-1/2 space-y-8">
                   <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center shadow-inner group transition-all">
                      {feature.icon}
                   </div>
                   <div className="space-y-4">
                      <div className="w-16 h-1 bg-orange-600 rounded-full" />
                      <h2 className="text-4xl md:text-6xl font-black font-outfit text-slate-900 tracking-tighter leading-none uppercase">
                         {feature.title}
                      </h2>
                      <p className="text-xl font-bold text-orange-600 italic uppercase tracking-widest">{feature.bnTitle}</p>
                   </div>
                   <p className="text-xl text-slate-600 leading-relaxed font-medium">
                      {feature.desc}
                   </p>
                   <div className="pt-4">
                      <Button asChild className="h-16 px-8 rounded-2xl bg-slate-900 hover:bg-orange-600 text-white font-black uppercase tracking-widest transition-all gap-3 shadow-xl shadow-slate-200">
                         <Link href="/register">Try this feature <ArrowRight size={18} /></Link>
                      </Button>
                   </div>
                </div>
                <div className="lg:w-1/2 relative group">
                   <div className="absolute inset-0 bg-orange-600/10 rounded-[4rem] rotate-3 -z-10 group-hover:rotate-6 transition-transform duration-700" />
                   <div className="aspect-video md:aspect-[4/3] rounded-[4rem] bg-slate-50 border border-slate-100 shadow-2xl overflow-hidden relative p-12">
                      <Image 
                        src={feature.image} 
                        width={600} 
                        height={450} 
                        alt={feature.title} 
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-1000"
                      />
                      <div className="absolute top-8 right-8 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-900 flex items-center gap-2">
                        <CheckCircle2 size={12} className="text-emerald-500" /> Live Sync Active
                      </div>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* Grid Specs */}
      <section className="py-24 md:py-48 bg-slate-50/50 border-y border-slate-100">
        <div className="container mx-auto px-6">
           <div className="text-center max-w-3xl mx-auto space-y-6 mb-24">
              <h2 className="text-4xl md:text-6xl font-black font-outfit text-slate-900 tracking-tighter uppercase leading-none">Built for the <br /> <span className="text-orange-600">Next Generation.</span></h2>
              <p className="text-lg text-slate-500 font-bold uppercase tracking-tight">সব ধরণের ডিভাইসে কাজ করে সমানভাবে।</p>
           </div>
           
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {technicalSpecs.map((spec, i) => (
                <div key={i} className="bg-white p-10 rounded-[3rem] space-y-6 shadow-sm hover:shadow-2xl transition-all duration-700 group border border-transparent hover:border-orange-100">
                   <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      {spec.icon}
                   </div>
                   <div className="space-y-2">
                      <h4 className="text-xl font-black font-outfit text-slate-900 uppercase tracking-tight">{spec.name}</h4>
                      <p className="text-slate-500 text-sm font-medium leading-relaxed">{spec.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-48 relative overflow-hidden text-center">
         <div className="container mx-auto px-6 space-y-12">
            <h2 className="text-5xl md:text-8xl font-black font-outfit text-slate-900 tracking-tighter leading-none italic">
               Ready to upgrade <br /> your <span className="text-orange-600 underline">Fruit Business?</span>
            </h2>
            <Button asChild className="bg-orange-600 hover:bg-orange-700 h-24 px-16 rounded-[2.5rem] text-3xl font-black gap-6 shadow-2xl shadow-orange-200 active:scale-95 transition-all">
               <Link href="/register">Start Growing <ArrowRight className="w-10 h-10" /></Link>
            </Button>
         </div>
         
         <div className="absolute top-1/2 left-0 w-64 h-64 bg-orange-100/30 rounded-full blur-[100px] -z-10" />
         <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-100/20 rounded-full blur-[150px] -z-10" />
      </section>
    </div>
  )
}
