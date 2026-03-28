import Link from "next/link"
import { ShoppingBasket, Facebook, Twitter, Instagram, Send } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-emerald-600 p-1.5 rounded-lg text-white">
                <ShoppingBasket size={24} />
              </div>
              <span className="text-xl font-bold font-outfit text-white tracking-tight">
                FruitsZone<span className="text-emerald-500 italic ml-0.5 mt-0.5 text-sm uppercase">ERP</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Empowering local fruits vendors in Chattogram with real-time inventory and direct stock management
              tools. Join the network of Freshness.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:text-emerald-500 transition-colors bg-slate-800 p-2 rounded-full border border-slate-700">
                <Facebook size={18} />
              </Link>
              <Link href="#" className="hover:text-emerald-500 transition-colors bg-slate-800 p-2 rounded-full border border-slate-700">
                <Twitter size={18} />
              </Link>
              <Link href="#" className="hover:text-emerald-500 transition-colors bg-slate-800 p-2 rounded-full border border-slate-700">
                <Instagram size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold flex items-center gap-2">
              <span className="w-8 h-[2px] bg-emerald-500 rounded-full"></span>
              Quick Links
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-500 transition-colors hover:translate-x-1 inline-block transform duration-200">
                  Partner Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-500 transition-colors hover:translate-x-1 inline-block transform duration-200">
                  About FruitsZone
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-emerald-500 transition-colors hover:translate-x-1 inline-block transform duration-200">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-emerald-500 transition-colors hover:translate-x-1 inline-block transform duration-200 text-emerald-500 font-medium">
                  Become a Partner
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold flex items-center gap-2">
              <span className="w-8 h-[2px] bg-emerald-500 rounded-full"></span>
              Support
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="#" className="hover:text-emerald-500 transition-colors hover:translate-x-1 inline-block transform duration-200">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-500 transition-colors hover:translate-x-1 inline-block transform duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-500 transition-colors hover:translate-x-1 inline-block transform duration-200">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-500 transition-colors hover:translate-x-1 inline-block transform duration-200">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold flex items-center gap-2">
              <span className="w-8 h-[2px] bg-emerald-500 rounded-full"></span>
              Join our Network
            </h4>
            <p className="text-sm">Get notified about new fruits and vendor offers.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-slate-800 border-slate-700 text-white rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all placeholder:text-slate-500"
              />
              <button className="absolute right-2 top-2 bg-emerald-600 hover:bg-emerald-700 p-1.5 rounded-md text-white transition-colors">
                <Send size={16} />
              </button>
            </div>
            <p className="text-xs italic opacity-60">* No spam, only partner updates.</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {currentYear} FruitsZone ERP. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <p>Designed for FruitsZone.com</p>
            <div className="w-[1px] h-4 bg-slate-800"></div>
            <p className="font-medium text-slate-300 tracking-wider uppercase">Chattogram, Bangladesh</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
