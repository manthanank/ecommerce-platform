"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PRODUCTS, CATEGORIES, Product } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import {
  ArrowRight,
  Star,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Sliders,
  ChevronRight,
  Plus,
  ShoppingBag,
  Sparkles,
  Award,
  Globe2,
  Cpu,
} from "lucide-react";

export default function HomePage() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [calculatorSpend, setCalculatorSpend] = useState<number>(350);
  const [includeWarranty, setIncludeWarranty] = useState<boolean>(true);
  const [selectedBundle, setSelectedBundle] = useState<"standard" | "pro" | "studio">("pro");
  const [addedItemName, setAddedItemName] = useState<string | null>(null);

  // Bundle calculations
  const bundleDiscounts = {
    standard: 0.1, // 10%
    pro: 0.2, // 20%
    studio: 0.28, // 28%
  };

  const discountRate = bundleDiscounts[selectedBundle];
  const bundleSavings = Math.round(calculatorSpend * discountRate);
  const warrantyFee = includeWarranty ? 29 : 0;
  const netEstimatedTotal = Math.max(0, calculatorSpend - bundleSavings + warrantyFee);

  const filteredProducts =
    activeCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    setAddedItemName(product.name);
    setTimeout(() => setAddedItemName(null), 2500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Toast Notification */}
      {addedItemName && (
        <div className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-indigo-400/40 animate-bounce">
          <ShoppingBag className="w-5 h-5" />
          <span className="text-sm font-medium">Added &quot;{addedItemName}&quot; to your cart!</span>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-800 bg-gradient-to-b from-slate-900/60 via-slate-950 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.15),rgba(255,255,255,0))]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Next-Gen Minimalist Peripherals & Acoustic Gear</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-none">
              Precision Crafted. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-indigo-200">
                Engineered for Masters.
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Explore titanium field chronographs, beryllium acoustic audio, CNC machined gasket keyboards, and weatherproof technical shells. Verified Stripe checkout simulation with real-time stock reservations.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/shop"
                className="w-full sm:w-auto px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 group"
              >
                <span>Explore Full Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#calculator"
                className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2"
              >
                <Sliders className="w-4 h-4 text-indigo-400" />
                <span>Tier Savings Calculator</span>
              </a>
            </div>

            {/* Trust Metrics Bar */}
            <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-2xl font-bold text-white font-mono">4.92 / 5.0</p>
                <p className="text-xs text-slate-500 mt-1 flex items-center justify-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span>3,400+ Verified Reviews</span>
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-indigo-400 font-mono">2-Year</p>
                <p className="text-xs text-slate-500 mt-1">Direct Hardware Warranty</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white font-mono">&lt; 24 Hours</p>
                <p className="text-xs text-slate-500 mt-1">Global Dispatch Guarantee</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-emerald-400 font-mono">100%</p>
                <p className="text-xs text-slate-500 mt-1">PCI-DSS Encrypted Checkout</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections by Category */}
      <section className="py-16 md:py-20 border-b border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
                Curated Categories
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Precision Equipment Pillars
              </h2>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 hover:text-indigo-400 transition"
            >
              <span>View all categories</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className="group relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 hover:border-indigo-500/50 transition-all duration-300 flex flex-col h-72"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-75 group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-6 flex flex-col justify-end">
                  <span className="text-xs font-mono text-indigo-300 mb-1">{cat.itemCount} items</span>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Product & Bundle Discount Simulator */}
      <section id="calculator" className="py-16 md:py-24 border-b border-slate-800 bg-slate-900/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
              Live Pricing Calculator
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Tiered Bundle Discount Engine
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Test how volume tiers, promotional codes, and warranty plans impact checkout totals in real-time.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur">
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex justify-between items-center text-sm font-semibold mb-2">
                  <label htmlFor="spend-range" className="text-slate-300">Target Cart Value</label>
                  <span className="font-mono text-indigo-400 text-base">${calculatorSpend}</span>
                </div>
                <input
                  id="spend-range"
                  type="range"
                  min="100"
                  max="1200"
                  step="50"
                  value={calculatorSpend}
                  onChange={(e) => setCalculatorSpend(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
                  <span>$100 Starter</span>
                  <span>$600 Enthusiast</span>
                  <span>$1,200 Studio</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">
                  Select Membership Tier / Bundle
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {(
                    [
                      { id: "standard", label: "Standard", desc: "10% off" },
                      { id: "pro", label: "Pro Member", desc: "20% off" },
                      { id: "studio", label: "Studio Studio", desc: "28% off" },
                    ] as const
                  ).map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => setSelectedBundle(tier.id)}
                      className={`p-3 rounded-xl border text-left transition ${
                        selectedBundle === tier.id
                          ? "bg-indigo-600/20 border-indigo-500 text-white"
                          : "bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-white"
                      }`}
                    >
                      <p className="text-xs font-semibold">{tier.label}</p>
                      <p className="text-[11px] text-indigo-300 mt-0.5">{tier.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/40 border border-slate-800">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-indigo-400" />
                  <div>
                    <p className="text-xs font-semibold text-white">Apex Care+ Extended Replacement</p>
                    <p className="text-[11px] text-slate-500">24-month accidental drop and spill protection</p>
                  </div>
                </div>
                <button
                  onClick={() => setIncludeWarranty(!includeWarranty)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                    includeWarranty ? "bg-indigo-600" : "bg-slate-700"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      includeWarranty ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Right Summary Card */}
            <div className="lg:col-span-5 bg-slate-950 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
                  <span className="font-semibold text-slate-300 uppercase tracking-wider">Order Estimate</span>
                  <span className="px-2 py-0.5 bg-indigo-500/10 text-indigo-400 rounded-md font-mono">
                    Save {Math.round(discountRate * 100)}%
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400">
                    <span>Retail Gross</span>
                    <span className="text-white font-mono">${calculatorSpend}.00</span>
                  </div>
                  <div className="flex justify-between text-emerald-400">
                    <span>Tier Discount Savings</span>
                    <span className="font-mono">-${bundleSavings}.00</span>
                  </div>
                  {includeWarranty && (
                    <div className="flex justify-between text-slate-400">
                      <span>Apex Care+ Plan</span>
                      <span className="text-white font-mono">+$29.00</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-400">
                    <span>Express Shipping</span>
                    <span className="text-emerald-400 font-semibold font-mono">FREE ($0.00)</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-baseline">
                  <div>
                    <p className="text-xs text-slate-500">Estimated Total</p>
                    <p className="text-2xl font-bold font-mono text-indigo-400">${netEstimatedTotal}.00</p>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">USD</span>
                </div>
              </div>

              <Link
                href="/shop"
                className="mt-6 w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold text-center transition shadow-md shadow-indigo-600/20"
              >
                Apply To Store Catalog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="py-16 md:py-24 border-b border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
                Master Craft
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Featured Flagship Models
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition ${
                  activeCategory === "all"
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                All Gear
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition ${
                    activeCategory === cat.slug
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden hover:border-slate-700 transition flex flex-col justify-between"
              >
                <div>
                  {/* Image container */}
                  <Link href={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden bg-slate-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.compareAtPrice && (
                      <span className="absolute top-3 left-3 px-2 py-1 bg-indigo-600 text-[10px] font-bold text-white rounded-md tracking-wider">
                        SAVE ${product.compareAtPrice - product.price}
                      </span>
                    )}
                    {product.isNew && (
                      <span className="absolute top-3 right-3 px-2 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold rounded-md">
                        NEW
                      </span>
                    )}
                  </Link>

                  {/* Body */}
                  <div className="p-4">
                    <div className="flex items-center gap-1.5 text-xs text-amber-400 mb-1.5">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-semibold">{product.rating}</span>
                      <span className="text-slate-500 font-mono">({product.reviewsCount})</span>
                    </div>

                    <Link href={`/product/${product.slug}`}>
                      <h3 className="font-semibold text-sm text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Color Swatches */}
                    <div className="mt-3 flex items-center gap-1.5">
                      {product.colors.map((c) => (
                        <span
                          key={c.name}
                          title={c.name}
                          className="w-3.5 h-3.5 rounded-full border border-slate-700 shadow-sm"
                          style={{ backgroundColor: c.hex }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer with price & quick buy */}
                <div className="p-4 pt-0 border-t border-slate-800/60 mt-3 flex items-center justify-between">
                  <div>
                    <span className="text-base font-bold text-white font-mono">${product.price}</span>
                    {product.compareAtPrice && (
                      <span className="ml-2 text-xs text-slate-500 line-through font-mono">
                        ${product.compareAtPrice}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white border border-slate-700 hover:border-indigo-500 transition shadow-sm"
                    title="Add to Cart"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Craftsmanship Section */}
      <section className="py-16 md:py-24 border-b border-slate-800 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
              Uncompromising Standards
            </span>
            <h2 className="text-3xl font-bold text-white mt-1">
              Engineered With Zero Cut Corners
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Every screw, switch, transducer, and woven fiber is vetted against military drop and sonic distortion benchmarks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-base text-white mb-2">CNC Milled Titanium & Aluminum</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tolerances within 0.02 millimeters. Solid billet machining provides structural rigidity, zero chassis flex, and sublime tactile handfeel.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-base text-white mb-2">Lossless 24-Bit / 96kHz Protocol</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ultra-low latency RF wireless transmissions bypass operating system compression pipelines for bit-perfect audio reproduction.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-base text-white mb-2">Sustainable Circular Sourcing</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                100% recycled aerospace metals, non-mulesed ZQ certified Merino wool, and plastic-free plant cellulose shipping enclosures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Spotlight */}
      <section className="py-16 md:py-24 border-b border-slate-800 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
              Community Endorsements
            </span>
            <h2 className="text-3xl font-bold text-white mt-1">
              Praised by Audio Engineers & Designers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "The Aura Pro headphones completely replaced my Sennheiser HD800S at my desk. The beryllium driver tuning is laser flat and the noise cancellation creates absolute silence.",
                author: "Julian Vance",
                role: "Senior Audio Mastering Engineer, Berlin",
                product: "Aura Pro Wireless",
              },
              {
                quote:
                  "The Linear 75 keyboard has the best acoustic profile out of the box I have ever tested. The gasket mounting completely eliminates fatigue during 12-hour coding marathons.",
                author: "Sarah Lindqvist",
                role: "Principal Systems Architect, Stockholm",
                product: "Linear 75 Mechanical Keyboard",
              },
              {
                quote:
                  "The Chronos Titanium tool watch is virtually indestructible. I wore it through two weeks of backcountry ice climbs in Patagonia and it kept time within +2 sec/day.",
                author: "Devon Reed",
                role: "Expedition Mountaineer & Designer, Vancouver",
                product: "Chronos Titanium Watch",
              },
            ].map((review, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed italic">&quot;{review.quote}&quot;</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <p className="text-xs font-semibold text-white">{review.author}</p>
                  <p className="text-[11px] text-slate-500">{review.role}</p>
                  <span className="inline-block mt-2 text-[10px] text-indigo-400 font-mono">
                    Verified Buyer: {review.product}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 md:py-20 border-b border-slate-800 bg-slate-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
              Direct Inquiries
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "How does the Stripe checkout integration work?",
                a: "The checkout route processes live PCI-compliant 256-bit Stripe payments with test card support. Order submissions generate cryptographic receipts, persist orders to the Logistics portal, and trigger live status updates in the Merchant cockpit.",
              },
              {
                q: "What countries do you deliver to and what are the shipping times?",
                a: "We ship internationally to over 85 countries via DHL Express and FedEx Priority. Typical delivery times are 2-3 business days to North America and Europe, and 3-5 business days to the rest of the world. Free shipping applies on all orders above $150.",
              },
              {
                q: "What is covered under the 2-Year Precision Warranty?",
                a: "Our warranty covers all mechanical switch failure, acoustic transducer degradation, battery life drops beyond 20%, and manufacturing defects. Defective units are swapped with brand new replacements with zero deductible.",
              },
              {
                q: "Can I manage product inventory and view live revenue metrics?",
                a: "Yes! Visit the Admin Console from the top navigation to view revenue velocity curves, inspect active orders, edit stock levels, and toggle fulfillment statuses.",
              },
            ].map((faq, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <h4 className="font-semibold text-sm text-white mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-slate-400 pl-6 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-gradient-to-tr from-indigo-950 via-slate-950 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-white">Upgrade Your Daily Carry Today</h2>
            <p className="mt-3 text-sm text-slate-400">
              Join over 24,000 engineers, creators, and audio purists who rely on Apex hardware every single day.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/shop"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition shadow-lg shadow-indigo-600/30"
              >
                Browse All Equipment
              </Link>
              <Link
                href="/admin"
                className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl text-sm font-semibold transition"
              >
                Inspect Merchant Admin
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

