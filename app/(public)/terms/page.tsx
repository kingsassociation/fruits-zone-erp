import { ShieldCheck, FileText, Lock, Globe } from "lucide-react"

export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using the FruitsZone ERP Platform, you agree to be bound by these Terms of Use and all applicable laws and regulations in Bangladesh."
    },
    {
      title: "2. Partner Eligibility",
      content: "Authorized partners must be at least 18 years old and possess a valid NID or Business Trade License to operate within the FruitsZone ecosystem."
    },
    {
      title: "3. Digital Ledger Accuracy",
      content: "Vendors are responsible for the accuracy of all Tali-Khata entries. FruitsZone is not liable for data entry errors made by individual shop operators."
    },
    {
      title: "4. Subscription & Payments",
      content: "Paid plans are billed monthly via SSLCommerz. Failure to maintain an active subscription may result in limited access to advanced analytics."
    }
  ]

  return (
    <div className="bg-white min-h-screen font-sansSelection">
      {/* Header */}
      <section className="pt-24 pb-24 md:pt-40 md:pb-32 bg-slate-50 relative overflow-hidden rounded-b-[4rem]">
        <div className="container mx-auto px-6 text-center space-y-6 animate-in fade-in slide-in-from-top-12 duration-1000">
           <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-100/50 rounded-full text-orange-800 text-xs font-black uppercase tracking-[0.3em]">
             <FileText size={14} className="fill-orange-600" /> Legal Documentation
           </div>
           <h1 className="text-5xl md:text-8xl font-black font-outfit tracking-tighter leading-[0.9] uppercase text-slate-900 border-b-8 border-orange-500 inline-block px-10">
              Terms of <br /> <span className="text-orange-600">Use.</span>
           </h1>
           <p className="text-lg text-slate-400 font-bold uppercase tracking-tight mt-6">সর্বশেষ আপডেট: মার্চ ২০২৬</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 md:py-40">
        <div className="container mx-auto px-6 max-w-4xl">
           <div className="space-y-16">
              {sections.map((sec, i) => (
                <div key={i} className="space-y-6 p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100/50 shadow-sm hover:shadow-xl hover:bg-white transition-all duration-700">
                   <h2 className="text-3xl font-black font-outfit text-slate-900 tracking-tighter uppercase leading-none">{sec.title}</h2>
                   <p className="text-lg text-slate-500 leading-relaxed font-medium">{sec.content}</p>
                </div>
              ))}
           </div>
           
           <div className="mt-24 p-12 bg-slate-900 text-white rounded-[3rem] space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-4">
                 <ShieldCheck className="text-orange-500" size={32} />
                 <h3 className="text-2xl font-black font-outfit tracking-tighter">Your Trust, Our Priority.</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-2xl font-medium">
                 These terms are designed to protect both FruitsZone and our valued partners. For any clarifications, please contact our Legal Hub at legal@fruitszone.com
              </p>
           </div>
        </div>
      </section>
    </div>
  )
}
