import React from "react";
import Link from "next/link";
import { Layers, ShieldCheck, Truck, RotateCcw, CreditCard } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-sm mt-20">
      {/* Value props banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white text-xs sm:text-sm">Global Express Delivery</p>
              <p className="text-xs text-slate-500">Free priority shipping on orders over $150</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white text-xs sm:text-sm">2-Year Precision Warranty</p>
              <p className="text-xs text-slate-500">Comprehensive hardware & craftsmanship coverage</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white text-xs sm:text-sm">30-Day Risk-Free Trial</p>
              <p className="text-xs text-slate-500">Hassle-free worldwide returns and instant exchanges</p>
            </div>
          </div>
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-white text-xs sm:text-sm">Stripe 256-bit Security</p>
              <p className="text-xs text-slate-500">Encrypted checkout with Apple Pay & Google Pay</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Layers className="w-4 h-4" />
            </div>
            <span className="font-bold text-white text-lg tracking-tight">
              APEX<span className="text-indigo-400 font-mono">.store</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-4">
            Industrial-grade tech peripherals, machined minimalist tools, and acoustic engineering. Powered by Next.js 15, PostgreSQL, and Stripe checkout pipelines.
          </p>
          <div className="text-xs text-slate-500 font-mono">
            Part of the 10 Full-Stack Applications Portfolio Suite
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Catalog</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/shop?category=audio" className="hover:text-indigo-400 transition">Audio & Acoustics</Link></li>
            <li><Link href="/shop?category=workspace" className="hover:text-indigo-400 transition">Desk & Workspaces</Link></li>
            <li><Link href="/shop?category=edc" className="hover:text-indigo-400 transition">Everyday Carry</Link></li>
            <li><Link href="/shop?category=apparel" className="hover:text-indigo-400 transition">Minimalist Wear</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Customer Area</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/orders" className="hover:text-indigo-400 transition">Track Active Order</Link></li>
            <li><Link href="/checkout" className="hover:text-indigo-400 transition">Checkout Portal</Link></li>
            <li><Link href="/settings" className="hover:text-indigo-400 transition">Store Currency & API</Link></li>
            <li><Link href="/admin" className="hover:text-indigo-400 transition">Merchant Cockpit</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3">Stack Details</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>Next.js 15 App Router</li>
            <li>Prisma 6 + PostgreSQL</li>
            <li>Stripe Checkout Mock API</li>
            <li>Vercel Analytics & Speed</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800/80 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <div>© 2026 APEX Store. Engineered by Manthan Ankolekar. All rights reserved.</div>
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="hover:text-slate-400 transition">Privacy</Link>
          <Link href="/terms" className="hover:text-slate-400 transition">Terms</Link>
          <Link href="/sitemap.xml" className="hover:text-slate-400 transition">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}

