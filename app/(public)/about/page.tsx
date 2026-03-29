import Image from "next/image"
import { ShieldCheck, Target, Heart, Users, ArrowRight, Zap, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  const mission = [
    {
      title: "Our Mission",
      bnTitle: "আমাদের লক্ষ্য",
      desc: "To digitize the local fruit retail chain in Bangladesh, providing vendors with modern tools to win the future.",
      icon: <Target className="w-8 h-8 text-orange-600" />
    },
    {
      title: "Our Vision",
      bnTitle: "আমাদের স্বপ্ন",
      desc: "Every fruit shop in Chattogram and beyond should have access to premium global inventory with a single tap.",
      icon: <Zap className="w-8 h-8 text-blue-600" />
    },
    {
      title: "Our Values",
      bnTitle: "আমাদের আদর্শ",
      desc: "Transparency, Freshness, and Partner Growth guide every single delivery and digital entry we make.",
      icon: <Heart className="w-8 h-8 text-rose-600" />
    }
  ]

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 md:pt-40 md:pb-48 bg-slate-50 text-slate-900 overflow-hidden rounded-b-[4rem] border-b border-slate-100">
        <div className="absolute top-0 right-0 w-[60%] h-full bg-orange-600/5 blur-[150px] -z-10 animate-pulse duration-[8s]" />
        <div className="absolute bottom-0 left-0 w-[40%] h-full bg-emerald-600/5 blur-[120px] -z-10" />
        <div className="container mx-auto px-6 text-center space-y-8 animate-in fade-in zoom-in duration-1000">
          <p className="text-orange-600 font-black text-sm uppercase tracking-[0.4em]">Inside FruitsZone</p>
          <h1 className="text-6xl md:text-9xl font-black font-outfit tracking-tighter leading-[0.8] uppercase text-slate-900">
             Building the <br /> <span className="text-orange-600 underline decoration-orange-100 underline-offset-8">Fresh Future.</span>
          </h1>
          <p className="text-2xl text-slate-500 font-black uppercase tracking-tight">ফল ব্যবসার নতুন দিগন্ত।</p>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
             FruitsZone ERP isn&apos;t just software. We are a team of agriculturists, technologists, and logistics experts working to transform the fruit retail ecosystem of Bangladesh.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 md:py-40">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
             <div className="w-16 h-1 bg-orange-600 rounded-full" />
             <h2 className="text-5xl md:text-6xl font-black font-outfit text-slate-900 tracking-tighter leading-[0.9] uppercase">
                Born in the Hub <br /> of <span className="text-orange-600">Chattogram.</span>
              </h2>
             <p className="text-lg text-slate-600 leading-relaxed font-medium">
                Started as a small collection point for premium dates and exotic fruits, FruitsZone identified a massive gap: **Transparency.** 
                Local vendors struggled with unstable pricing and inconsistent quality. 
             </p>
             <p className="text-lg text-slate-600 leading-relaxed font-medium">
                We built this ERP to give the power back to the shop owner. Secure tracking, verified stock, and a professional digital identity for every partner.
             </p>
             <div className="flex items-center gap-6 pt-6">
                <div className="p-4 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 font-black text-4xl font-outfit">5+</div>
                 <div>
                    <p className="font-black text-slate-900 leading-none">Years of Trust</p>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">৫ বছরের নিরবচ্ছিন্ন সেবা</p>
                 </div>
             </div>
          </div>
          <div className="grid grid-cols-2 gap-6 relative">
             <div className="space-y-6 pt-12">
                <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                   <Image src="/products/IMG-20251122-WA0013.jpg" width={400} height={600} alt="Market" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square bg-orange-600 rounded-3xl p-8 text-white flex flex-col justify-end">
                   <p className="text-5xl font-black font-outfit">500+</p>
                   <p className="text-xs font-black uppercase tracking-widest leading-none mt-2">Active Partners</p>
                </div>
             </div>
             <div className="space-y-6">
                 <div className="aspect-square bg-slate-50 border border-slate-100 rounded-3xl p-8 text-slate-900 flex flex-col justify-end relative overflow-hidden group hover:border-orange-200 transition-colors">
                    <ShieldCheck className="absolute top-8 right-8 text-orange-600 group-hover:scale-110 transition-transform" size={32} />
                    <p className="text-4xl font-black font-outfit uppercase leading-tight">100% <br /> <span className="text-orange-600">Secure</span></p>
                 </div>
                <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                   <Image src="/products/Delivery.png" width={400} height={600} alt="Delivery" className="w-full h-full object-cover" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Mission Cards */}
      <section className="py-24 md:py-40 bg-slate-50">
        <div className="container mx-auto px-6">
           <div className="grid md:grid-cols-3 gap-12">
              {mission.map((item, i) => (
                <div key={i} className="bg-white p-12 rounded-[3.5rem] space-y-8 shadow-sm hover:shadow-2xl transition-all duration-700 group">
                   <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all">
                      {item.icon}
                   </div>
                    <div className="space-y-4">
                       <div>
                          <h3 className="text-3xl font-black font-outfit text-slate-900 uppercase tracking-tighter">{item.title}</h3>
                          <p className="text-sm font-bold text-orange-500 italic leading-none mt-1">{item.bnTitle}</p>
                       </div>
                       <p className="text-slate-600 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-24 md:py-40 text-center">
         <div className="container mx-auto px-6 space-y-12">
            <h2 className="text-5xl md:text-7xl font-black font-outfit text-slate-900 tracking-tighter leading-none animate-bounce-subtle">
               Become a part of <br /> the <span className="text-orange-600 underline">Fresh Revolution.</span>
            </h2>
            <Button asChild className="bg-orange-600 hover:bg-orange-700 h-20 px-12 rounded-[2rem] text-2xl font-black gap-4 shadow-2xl shadow-orange-100 group">
               <Link href="/register">Start Your Journey <ArrowRight className="group-hover:translate-x-3 transition-transform" /></Link>
            </Button>
         </div>
      </section>
    </div>
  )
}
