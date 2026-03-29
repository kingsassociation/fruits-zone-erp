import { CheckCircle2, Star, Zap, ShieldCheck, ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      bnTitle: "স্টার্টার প্ল্যান",
      price: "0",
      desc: "For small shops starting their digital journey.",
      bnDesc: "নতুন দোকানদারদের জন্য দারুণ শুরু।",
      features: [
        "Up to 50 sales/month",
        "Simple Digital Ledger",
        "Marketplace Access",
        "Basic Reports"
      ],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Pro",
      bnTitle: "প্রো প্ল্যান",
      price: "1500",
      desc: "For growing businesses with high daily traffic.",
      bnDesc: "দ্রুত বর্ধনশীল ব্যবসার জন্য সেরা সমাধান।",
      features: [
        "Up to 200 sales/month",
        "Advanced Analytics",
        "Low Stock Alerts",
        "Priority Support",
        "Inventory Sync"
      ],
      cta: "Join Pro",
      popular: true
    },
    {
      name: "Enterprise",
      bnTitle: "এন্টারপ্রাইজ",
      price: "5000",
      desc: "Complete ERP solution for large networks.",
      bnDesc: "বড় পরিসরে ব্যবসার জন্য পূর্ণাঙ্গ সল্যুশন।",
      features: [
        "Unlimited sales",
        "Custom Location Hubs",
        "Staff Accounts",
        "Dedicated Manager",
        "API Integration"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ]

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-32 md:pt-40 md:pb-48 bg-orange-50 relative overflow-hidden rounded-b-[4rem]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-[100px] -z-10" />
        <div className="container mx-auto px-6 text-center space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-1000">
           <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-100/50 rounded-full text-orange-800 text-xs font-black uppercase tracking-[0.3em]">
             <Zap size={14} className="fill-orange-600" /> Professional Solutions
           </div>
           <h1 className="text-6xl md:text-9xl font-black font-outfit tracking-tighter leading-[0.8] uppercase text-slate-900">
             Choose Your <br /> <span className="text-orange-600">Growth Path.</span>
           </h1>
           <p className="text-3xl text-slate-500 font-extrabold uppercase tracking-tight">আপনার ব্যবসার জন্য সঠিক প্ল্যান বেছে নিন।</p>
           <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
             From free starter tools to enterprise-level ERP power. Pay as you grow. No hidden charges.
           </p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="py-24 md:py-48 -mt-24">
        <div className="container mx-auto px-6">
           <div className="grid md:grid-cols-3 gap-10">
              {plans.map((plan, i) => (
                <div key={i} className={`relative flex flex-col p-12 rounded-[4rem] bg-white border ${plan.popular ? 'border-orange-500 shadow-2xl scale-105 z-10' : 'border-slate-100 shadow-sm'} transition-all duration-700 hover:shadow-2xl hover:-translate-y-2 group`}>
                   {plan.popular && (
                     <div className="absolute top-8 right-8 bg-orange-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-orange-200">
                        Most Popular
                     </div>
                   )}
                   
                   <div className="space-y-2 mb-10">
                      <h3 className="text-3xl font-black font-outfit text-slate-900 uppercase tracking-tighter leading-none">{plan.name}</h3>
                      <p className="text-sm font-bold text-orange-600 italic leading-none">{plan.bnTitle}</p>
                   </div>
                   <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-4xl font-black text-slate-900 font-outfit leading-none uppercase">৳{plan.price}</span>
                      <span className="text-slate-500 font-bold text-sm uppercase">/ Month</span>
                   </div>
                   <div className="space-y-4 mb-12 flex-grow">
                      <p className="text-slate-600 font-medium leading-relaxed mb-8">{plan.desc} <span className="block text-slate-500 text-xs font-bold mt-1">{plan.bnDesc}</span></p>
                      <ul className="space-y-4">
                         {plan.features.map((feature, idx) => (
                           <li key={idx} className="flex gap-3 text-slate-600 font-medium items-center">
                              <div className="w-5 h-5 rounded-full bg-orange-50 flex items-center justify-center text-orange-600"><Check size={12} strokeWidth={4} /></div>
                              <span className="text-sm">{feature}</span>
                           </li>
                         ))}
                      </ul>
                   </div>
                   
                   <Button asChild className={`w-full h-16 rounded-3xl font-black text-lg uppercase tracking-widest transition-all ${plan.popular ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-xl shadow-orange-100' : 'bg-slate-50 text-slate-900 hover:bg-slate-100 shadow-none hover:shadow-lg'}`}>
                      <Link href="/register">{plan.cta}</Link>
                   </Button>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* FAQ Sneak Peek */}
       <section className="py-24 md:py-40 bg-slate-50 text-slate-900 rounded-[4rem] mx-4 mb-24 overflow-hidden relative border border-slate-100">
        <div className="absolute top-0 left-0 w-[60%] h-full bg-orange-600/5 blur-[150px] -z-10 animate-pulse duration-[8s]" />
        <div className="absolute bottom-0 right-0 w-[40%] h-full bg-emerald-600/5 blur-[120px] -z-10" />
        <div className="container mx-auto px-10 text-center space-y-12">
            <h2 className="text-5xl md:text-7xl font-black font-outfit tracking-tighter leading-none uppercase text-slate-900">
               Frequently Asked <br /> <span className="text-orange-600 underline decoration-orange-100 underline-offset-8">Questions.</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto text-left">
               <div className="space-y-4 p-8 bg-white border border-slate-100 rounded-3xl group hover:border-orange-200 transition-colors shadow-sm hover:shadow-xl">
                  <p className="font-black text-lg text-orange-600 font-outfit uppercase group-hover:text-orange-700 transition-colors">Can I switch plans later?</p>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">Yes! You can upgrade or downgrade your plan anytime from your account settings.</p>
               </div>
               <div className="space-y-4 p-8 bg-white border border-slate-100 rounded-3xl group hover:border-orange-200 transition-colors shadow-sm hover:shadow-xl">
                  <p className="font-black text-lg text-orange-600 font-outfit uppercase group-hover:text-orange-700 transition-colors">What about data security?</p>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">Your data is encrypted and backed up daily on secure cloud servers based in the USA.</p>
               </div>
            </div>
            <Button variant="ghost" className="text-slate-600 hover:text-orange-600 font-black uppercase text-xs tracking-[0.3em] gap-2 pt-8">
               View All FAQ <ArrowRight size={14} />
            </Button>
        </div>
      </section>
    </div>
  )
}
