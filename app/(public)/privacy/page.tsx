import { ShieldCheck, Lock, Eye, Cloud } from "lucide-react"

export default function PrivacyPage() {
  const sections = [
    {
      title: "Data Collection",
      content: "We collect basic business information, NID for verification, and shop transactions to provide digital ledger services within the FruitsZone network."
    },
    {
      title: "Data Privacy",
      content: "Your transaction history and customer credit (Udhar) records are private to your shop profile. FruitsZone only uses anonymized data for market-wide inventory insights."
    },
    {
      title: "Cloud Backup",
      content: "All data is encrypted before being backed up to our secure cloud servers, ensuring your business records are safe even if your physical devices are lost."
    },
    {
      title: "Partner Rights",
      content: "As a FruitsZone partner, you have the right to request a full export of your business data or close your account at any time via the Support Hub."
    }
  ]

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="pt-24 pb-24 md:pt-40 md:pb-32 bg-slate-900 text-white relative overflow-hidden rounded-b-[4rem]">
        <div className="absolute top-0 right-0 w-full h-full bg-orange-600/5 blur-[150px] -z-10" />
        <div className="container mx-auto px-6 text-center space-y-6 animate-in fade-in slide-in-from-top-12 duration-1000">
           <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 rounded-full text-orange-400 text-xs font-black uppercase tracking-[0.3em]">
             <Lock size={14} className="fill-orange-600" /> Data Protection
           </div>
           <h1 className="text-5xl md:text-8xl font-black font-outfit tracking-tighter leading-[0.9] uppercase text-white border-b-8 border-orange-500 inline-block px-10">
              Privacy <br /> <span className="text-orange-500">Policy.</span>
           </h1>
           <p className="text-lg text-slate-400 font-bold uppercase tracking-tight mt-6">সর্বশেষ আপডেট: মার্চ ২০২৬</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 md:py-40">
        <div className="container mx-auto px-6 max-w-4xl">
           <div className="space-y-16">
              {sections.map((sec, i) => (
                <div key={i} className="space-y-6 p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100/50 shadow-sm hover:shadow-xl transition-all duration-700">
                   <h2 className="text-3xl font-black font-outfit text-slate-900 tracking-tighter uppercase leading-none">{sec.title}</h2>
                   <p className="text-lg text-slate-500 leading-relaxed font-medium">{sec.content}</p>
                </div>
              ))}
           </div>
           
           <div className="mt-24 p-12 bg-orange-600 text-white rounded-[3rem] space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-4">
                 <ShieldCheck className="text-white" size={32} />
                 <h3 className="text-2xl font-black font-outfit tracking-tighter uppercase">Your Data, Your Ownership.</h3>
              </div>
              <p className="text-orange-50 text-sm leading-relaxed max-w-2xl font-medium">
                 We are committed to the highest standards of transparency. Your business data belongs to you. For data inquiries, reach out to privacy@fruitszone.com
              </p>
           </div>
        </div>
      </section>
    </div>
  )
}
