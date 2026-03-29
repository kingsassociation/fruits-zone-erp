import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  const contacts = [
    {
      title: "Call Us",
      bnTitle: "আমাদের ফোন করুন",
      val: "+880 17XX-XXXXXX",
      icon: <Phone className="w-6 h-6 text-orange-600" />
    },
    {
      title: "Email Support",
      bnTitle: "ইমেইল করুন",
      val: "support@fruitszone.com",
      icon: <Mail className="w-6 h-6 text-blue-600" />
    },
    {
      title: "Central Hub",
      bnTitle: "আমাদের অফিস",
      val: "Khatungonj, Chattogram",
      icon: <MapPin className="w-6 h-6 text-orange-600" />
    }
  ]

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <section className="pt-24 pb-32 md:pt-40 md:pb-48 bg-slate-50 relative overflow-hidden rounded-b-[4rem]">
        <div className="absolute top-0 left-0 w-full h-full bg-orange-600/5 blur-[150px] -z-10" />
        <div className="container mx-auto px-6 text-center space-y-8 animate-in fade-in slide-in-from-top-12 duration-1000">
           <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-100/50 rounded-full text-orange-800 text-xs font-black uppercase tracking-[0.3em]">
             <MessageSquare size={14} className="fill-orange-600" /> We Are Here For You
           </div>
           <h1 className="text-6xl md:text-9xl font-black font-outfit tracking-tighter leading-[0.8] uppercase text-slate-900">
              Get in <br /> <span className="text-orange-600">Touch.</span>
           </h1>
           <p className="text-3xl text-slate-500 font-extrabold uppercase tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-slate-600 to-slate-400">সরাসরি আমাদের সাথে কথা বলুন।</p>
           <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
             Have questions about onboarding, pricing, or stock? Our team in Chattogram is ready to help your business grow.
           </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-24 md:py-48 -mt-20">
        <div className="container mx-auto px-6">
           <div className="grid lg:grid-cols-12 gap-16 items-start">
              {/* Left Side: Cards */}
              <div className="lg:col-span-5 space-y-10">
                 <div className="grid gap-6">
                    {contacts.map((c, i) => (
                      <div key={i} className="flex gap-6 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-700 group cursor-pointer">
                         <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all shadow-inner">
                            {c.icon}
                         </div>
                         <div className="space-y-1">
                            <h3 className="text-xl font-black font-outfit text-slate-900 uppercase tracking-tighter leading-none">{c.title}</h3>
                            <p className="text-[10px] font-bold text-orange-600 italic uppercase tracking-widest">{c.bnTitle}</p>
                            <p className="text-lg font-bold text-slate-600 pt-2 group-hover:text-orange-600 transition-colors">{c.val}</p>
                         </div>
                      </div>
                    ))}
                 </div>
                 
                 <div className="p-10 rounded-3xl bg-orange-50 text-slate-900 space-y-6 shadow-xl border border-orange-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-[80%] h-full bg-orange-600/5 blur-[80px] -z-10 animate-pulse duration-[6s]" />
                    <div className="space-y-2">
                       <p className="text-orange-600 font-black text-[10px] uppercase tracking-[0.4em] leading-none">Support Hours</p>
                       <h4 className="text-2xl font-black font-outfit uppercase tracking-tighter">Availability</h4>
                    </div>
                    <div className="space-y-4 pt-4 border-t border-orange-200/50">
                       <div className="flex justify-between items-center text-sm font-bold text-slate-600 uppercase tracking-widest">
                          <span className="flex gap-2 items-center"><Clock size={14} className="text-orange-600" /> Sat - Thu</span>
                          <span className="text-slate-900">09:00 - 20:00</span>
                       </div>
                       <div className="flex justify-between items-center text-sm font-bold text-slate-600 uppercase tracking-widest">
                          <span className="flex gap-2 items-center"><Globe size={14} className="text-orange-600" /> Online Chat</span>
                          <span className="text-orange-600">24/7 Support</span>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Right Side: Form */}
              <div className="lg:col-span-7 p-10 md:p-16 bg-white border border-slate-100 rounded-[4rem] shadow-2xl space-y-10 animate-in slide-in-from-right-12 duration-1000">
                 <div className="space-y-4">
                    <h2 className="text-4xl md:text-5xl font-black font-outfit text-slate-900 tracking-tighter leading-[0.9] uppercase">Send a <br /> <span className="text-orange-600 underline underline-offset-8 decoration-orange-100 italic">Message.</span></h2>
                    <p className="text-lg text-slate-500 font-bold uppercase tracking-tight">বার্তা পাঠান এবং আমরা শীঘ্রই যোগাযোগ করব।</p>
                 </div>
                 
                 <form className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                       <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] px-2">Your Name</label>
                          <Input placeholder="John Doe" className="h-16 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-orange-500 font-bold text-lg px-6" />
                       </div>
                       <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] px-2">Email Address</label>
                          <Input type="email" placeholder="john@example.com" className="h-16 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-orange-500 font-bold text-lg px-6" />
                       </div>
                    </div>
                    
                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] px-2">Store / Business Name</label>
                       <Input placeholder="FruitsZone Shop #12" className="h-16 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-orange-500 font-bold text-lg px-6" />
                    </div>

                    <div className="space-y-3">
                       <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] px-2">Your Message</label>
                       <Textarea placeholder="Tell us how we can help your growth..." className="min-h-[150px] rounded-[2rem] bg-slate-50 border-transparent focus:bg-white focus:ring-orange-500 font-medium text-lg p-8 leading-relaxed" />
                    </div>

                    <Button type="submit" className="w-full h-20 bg-orange-600 hover:bg-orange-700 text-white rounded-[2rem] font-black text-xl uppercase tracking-widest shadow-2xl shadow-orange-200 gap-4 group transition-all">
                       Submit Message <Send className="w-6 h-6 group-hover:translate-x-3 group-hover:-translate-y-2 transition-transform" />
                    </Button>
                 </form>
              </div>
           </div>
        </div>
      </section>
    </div>
  )
}
