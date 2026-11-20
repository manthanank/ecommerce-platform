"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import {
  CreditCard,
  Lock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
  Truck,
  RotateCcw,
  Sparkles,
} from "lucide-react";

export default function CheckoutPage() {
  const { cart, subtotal, discount, shipping, total, couponCode, clearCart } = useCart();

  const [formData, setFormData] = useState({
    firstName: "Alex",
    lastName: "Mercer",
    email: "alex.mercer@gmail.com",
    address: "742 Evergreen Terrace",
    city: "Seattle",
    state: "WA",
    postalCode: "98101",
    country: "United States",
    cardNumber: "4242 •••• •••• 4242",
    exp: "08/29",
    cvc: "891",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    orderId: string;
    trackingNumber: string;
    total: number;
    email: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedOrderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}-US`;
      const generatedTracking = `APX-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

      setCompletedOrder({
        orderId: generatedOrderId,
        trackingNumber: generatedTracking,
        total: total || 498,
        email: formData.email,
      });

      clearCart();
      setIsProcessing(false);
    }, 1800);
  };

  if (completedOrder) {
    return (
      <div className="min-h-screen bg-slate-950 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-indigo-500 to-cyan-400" />

          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-semibold">
            Payment Verified via Stripe Mock Gateway
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-4">Order Confirmed!</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-md mx-auto">
            We have dispatched a cryptographic receipt to <strong className="text-white">{completedOrder.email}</strong>. Your hardware will be packaged and prepared for shipping.
          </p>

          <div className="my-8 p-5 rounded-2xl bg-slate-950 border border-slate-800/80 text-left space-y-3 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Order Reference:</span>
              <span className="text-white font-bold">{completedOrder.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Carrier & Tracking:</span>
              <span className="text-indigo-400 font-semibold">{completedOrder.trackingNumber} (DHL Express)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Total Billed:</span>
              <span className="text-emerald-400 font-bold">${completedOrder.total.toFixed(2)} USD</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/orders"
              className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition flex items-center justify-center gap-2"
            >
              <Truck className="w-4 h-4" />
              <span>Track In Order Portal</span>
            </Link>
            <Link
              href="/shop"
              className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
            Simulated Stripe Checkout
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Complete Your Order</h1>
          <p className="text-xs text-slate-400 mt-1">
            PCI-DSS simulated 256-bit encrypted transaction tunnel
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Checkout Form */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer info */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center">
                    1
                  </span>
                  <span>Contact & Shipping Details</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">First Name</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Last Name</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-xs text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-xs text-slate-400 mb-1">Street Address</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">State / Prov</label>
                    <input
                      type="text"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <div className="pt-6 border-t border-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] font-bold flex items-center justify-center">
                      2
                    </span>
                    <span>Stripe Payment Sandbox</span>
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>256-bit TLS</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Card Number (Simulated)</label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400" />
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full pl-9 pr-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Expiration</label>
                      <input
                        type="text"
                        value={formData.exp}
                        onChange={(e) => setFormData({ ...formData, exp: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">CVC Code</label>
                      <input
                        type="text"
                        value={formData.cvc}
                        onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 px-6 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 text-white rounded-2xl font-bold text-sm transition shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Processing with Stripe Simulation...</span>
                  </span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Authorize Payment of ${(total || 498).toFixed(2)}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Cart Review Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center justify-between">
                <span>Summary ({cart.length ? cart.reduce((a, b) => a + b.quantity, 0) : 2} items)</span>
                <span className="text-xs text-indigo-400 font-mono">USD Currency</span>
              </h3>

              {/* Items */}
              <div className="divide-y divide-slate-800 space-y-3 mb-6">
                {cart.length === 0 ? (
                  <div className="text-xs text-slate-400 py-2">
                    <p className="italic">Cart preview: Sample items loaded for demonstration</p>
                    <div className="mt-3 flex gap-3 items-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
                        alt="Aura Pro"
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-white">Aura Pro Spatial Headphones</p>
                        <p className="text-[11px] text-slate-500">1x • $349.00</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-12 h-12 rounded-lg object-cover bg-slate-800"
                        />
                        <div>
                          <p className="text-xs font-semibold text-white line-clamp-1">{item.product.name}</p>
                          <p className="text-[11px] text-slate-400">
                            Qty: {item.quantity} {item.color && `• ${item.color}`}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-semibold text-white">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Numbers */}
              <div className="space-y-2 text-xs border-t border-slate-800 pt-4 text-slate-400">
                <div className="flex justify-between">
                  <span>Gross Subtotal</span>
                  <span className="text-white font-mono">${(subtotal || 349).toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Coupon Discount</span>
                    <span className="font-mono">-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express DHL Shipping</span>
                  <span className="text-emerald-400 font-mono">FREE</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-slate-800 text-sm font-bold text-white">
                  <span>Grand Total</span>
                  <span className="text-indigo-400 font-mono">${(total || 349).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Guarantees */}
            <div className="p-5 rounded-2xl bg-slate-900/30 border border-slate-800/60 space-y-3 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Simulated webhook reserves inventory in real-time</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-indigo-400" />
                <span>Dispatches from Frankfurt Global Distribution Center</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
