"use client";

import React, { useState } from "react";
import { PRODUCTS, MOCK_ORDERS } from "@/lib/data";
import { getStoredOrders, getStoredProducts } from "@/lib/store";
import {
  Settings,
  DollarSign,
  Key,
  Database,
  Download,
  ShieldCheck,
  Check,
  Globe,
  RefreshCw,
} from "lucide-react";

export default function SettingsPage() {
  const [currency, setCurrency] = useState("USD");
  const [stripeMode, setStripeMode] = useState<"sandbox" | "live">("sandbox");
  const [activeSchemaTab, setActiveSchemaTab] = useState<"Product" | "Category" | "Order">("Product");
  const [copiedKey, setCopiedKey] = useState(false);

  const stripePublishableKey = "pk_live_51MzApex94821039841029381029482109384";

  const handleCopy = () => {
    navigator.clipboard?.writeText(stripePublishableKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleExportJSON = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      store: "APEX E-commerce Platform",
      products: getStoredProducts(),
      orders: getStoredOrders(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `apex-storefront-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-8 mb-8">
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
            Configuration & Database
          </span>
          <h1 className="text-3xl font-extrabold text-white mt-1">Platform Settings</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Currency conversion, Stripe gateway keys, Prisma ORM schema, and telemetry exports
          </p>
        </div>

        <div className="space-y-8">
          {/* Currency Configuration */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Default Store Currency</h3>
                <p className="text-xs text-slate-400">Controls checkout exchange rates and catalog rendering</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {[
                { code: "USD", symbol: "$", name: "US Dollar", rate: "1.00" },
                { code: "EUR", symbol: "€", name: "Euro", rate: "0.92" },
                { code: "GBP", symbol: "£", name: "British Pound", rate: "0.79" },
                { code: "JPY", symbol: "¥", name: "Japanese Yen", rate: "154.2" },
              ].map((c) => (
                <button
                  key={c.code}
                  onClick={() => setCurrency(c.code)}
                  className={`p-3.5 rounded-xl border text-left transition ${
                    currency === c.code
                      ? "bg-indigo-600/20 border-indigo-500 text-white"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-white font-mono">{c.code}</span>
                    <span className="text-xs font-mono text-indigo-400">{c.symbol}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">{c.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Stripe API Credentials */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Stripe Checkout Gateway</h3>
                  <p className="text-xs text-slate-400">Configured via PCI-DSS Level 1 tokenization tunnel</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 p-1 rounded-xl text-xs">
                <button
                  onClick={() => setStripeMode("sandbox")}
                  className={`px-3 py-1 rounded-lg font-medium transition ${
                    stripeMode === "sandbox" ? "bg-indigo-600 text-white" : "text-slate-400"
                  }`}
                >
                  Test Sandbox
                </button>
                <button
                  onClick={() => setStripeMode("live")}
                  className={`px-3 py-1 rounded-lg font-medium transition ${
                    stripeMode === "live" ? "bg-indigo-600 text-white" : "text-slate-400"
                  }`}
                >
                  Production Live
                </button>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-between font-mono text-xs">
              <span className="text-slate-400 truncate mr-4">{stripePublishableKey}</span>
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg flex items-center gap-1.5 transition text-[11px] flex-shrink-0"
              >
                {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : null}
                <span>{copiedKey ? "Copied" : "Copy Key"}</span>
              </button>
            </div>
          </div>

          {/* Prisma Database Schema Explorer */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Prisma PostgreSQL Schema</h3>
                  <p className="text-xs text-slate-400">Relational data models mapped via schema.prisma</p>
                </div>
              </div>

              <div className="flex gap-2">
                {(["Product", "Category", "Order"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveSchemaTab(tab)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition ${
                      activeSchemaTab === tab
                        ? "bg-purple-600 text-white"
                        : "bg-slate-800 text-slate-400 hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
              {activeSchemaTab === "Product" && (
                <pre>{`model Product {
  id             String      @id @default(uuid())
  name           String
  slug           String      @unique
  description    String
  price          Float
  compareAtPrice Float?
  inventory      Int         @default(0)
  rating         Float       @default(4.8)
  reviewsCount   Int         @default(0)
  images         String[]
  tags           String[]
  isFeatured     Boolean     @default(false)
  categoryId     String
  category       Category    @relation(fields: [categoryId], references: [id])
  orderItems     OrderItem[]
  reviews        Review[]
  createdAt      DateTime    @default(now())
  updatedAt      DateTime    @updatedAt
}`}</pre>
              )}
              {activeSchemaTab === "Category" && (
                <pre>{`model Category {
  id          String    @id @default(uuid())
  name        String
  slug        String    @unique
  description String?
  products    Product[]
  createdAt   DateTime  @default(now())
}`}</pre>
              )}
              {activeSchemaTab === "Order" && (
                <pre>{`model Order {
  id              String      @id @default(uuid())
  orderNumber     String      @unique
  customerName    String
  customerEmail   String
  shippingAddress String
  totalAmount     Float
  discountAmount  Float       @default(0)
  shippingFee     Float       @default(0)
  status          String      @default("CONFIRMED")
  paymentStatus   String      @default("PAID")
  stripeSessionId String?
  items           OrderItem[]
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
}`}</pre>
              )}
            </div>
          </div>

          {/* Export Center */}
          <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Data Export & Backup</h3>
              <p className="text-xs text-slate-400">Download active products, order logs, and telemetry into standard JSON</p>
            </div>

            <button
              onClick={handleExportJSON}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition shadow-md shadow-indigo-600/20"
            >
              <Download className="w-4 h-4" />
              <span>Export Store JSON</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

