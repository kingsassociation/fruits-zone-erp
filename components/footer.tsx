import Link from "next/link"
import { ShoppingBasket, Send, Mail, Phone, MapPin } from "lucide-react"
import { Facebook, Twitter, Instagram } from "@/components/social-icons"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const links = {
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Logistics", href: "/logistics" },
      { name: "Pricing Plans", href: "/pricing" },
      { name: "Contact Hub", href: "/contact" }
    ],
    legal: [
      { name: "Terms of Use", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Cookie Policy", href: "#" },
      { name: "Support Docs", href: "#" }
    ]
  }

  return (
    <footer className="bg-slate-50 border-t border-slate-100 pt-24 pb-12 text-slate-600 rounded-t-[4rem] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-orange-600/5 blur-[150px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Info */}
          <div className="space-y-10">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-orange-600 p-2 rounded-xl text-white shadow-lg shadow-orange-500/20">
                <ShoppingBasket size={24} />
              </div>
              <span className="text-2xl font-black font-outfit text-slate-900 tracking-tighter uppercase whitespace-nowrap">
                Fruits <span className="text-orange-600">Zone</span>
              </span>
            </Link>
            <p className="text-base leading-relaxed font-medium text-slate-600">
              Empowering local fruits vendors in Chattogram with digital ledger (Tali-Khata) and direct marketplace stock. 
              <span className="block mt-4 text-orange-600 font-black uppercase text-xs tracking-widest leading-none bg-orange-50 px-4 py-3 rounded-xl inline-block border border-orange-100">সহজ হিসাব, ডিজিটাল ব্যবসা।</span>
            </p>
            <div className="flex items-center gap-4">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <Link key={i} href="#" className="text-slate-400 hover:text-orange-600 transition-all bg-white p-3 rounded-2xl border border-slate-100 hover:border-orange-600 hover:scale-110 shadow-sm">
                  <Icon size={20} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8 lg:pl-10">
            <h4 className="text-slate-900 font-black uppercase tracking-[0.3em] text-[10px] leading-none opacity-50">
              Company
            </h4>
            <ul className="space-y-5">
              {links.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm font-black uppercase tracking-widest text-slate-600 hover:text-orange-600 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-8 lg:pl-10">
            <h4 className="text-slate-900 font-black uppercase tracking-[0.3em] text-[10px] leading-none opacity-50">
              Legal & Help
            </h4>
            <ul className="space-y-5">
              {links.legal.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm font-black uppercase tracking-widest text-slate-600 hover:text-orange-600 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div className="space-y-10">
            <h4 className="text-slate-900 font-black uppercase tracking-[0.3em] text-[10px] leading-none opacity-50">
               Newsletter
            </h4>
            <div className="space-y-4">
              <p className="text-sm font-medium text-slate-600">Join 500+ successful partners in Chattogram.</p>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-2xl py-4 h-14 px-6 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder:text-slate-400 font-bold shadow-sm"
                />
                <button className="absolute right-2 top-2 bg-orange-600 hover:bg-orange-700 p-2 rounded-xl text-white transition-colors shadow-lg shadow-orange-500/20">
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          <p>© {currentYear} FruitsZone Bangladesh. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <p className="hover:text-orange-600 transition-colors cursor-pointer">Designed for FruitsZone.com</p>
            <div className="w-[1px] h-4 bg-slate-200"></div>
            <p className="text-orange-600 whitespace-nowrap">Chattogram • Dhaka • Sylhet</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
