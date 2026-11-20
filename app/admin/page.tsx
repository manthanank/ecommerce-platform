"use client";

import React, { useState, useEffect } from "react";
import { PRODUCTS, MOCK_ORDERS, SALES_METRICS, CATEGORY_DISTRIBUTION, Product, Order } from "@/lib/data";
import {
  getStoredOrders,
  getStoredProducts,
  updateStoredOrderStatus,
  updateStoredProductStock,
  addStoredProduct,
} from "@/lib/store";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Line,
  ComposedChart,
} from "recharts";
import {
  Package,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Plus,
  RefreshCw,
  Edit2,
  Check,
  ChevronDown,
  Layers,
} from "lucide-react";

export default function AdminPage() {
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [ordersList, setOrdersList] = useState<Order[]>(MOCK_ORDERS);
  const [stockEditId, setStockEditId] = useState<string | null>(null);
  const [newStockVal, setNewStockVal] = useState<number>(0);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    setOrdersList(getStoredOrders());
    setProductsList(getStoredProducts());
  }, []);

  // New product form
  const [newProd, setNewProd] = useState({
    name: "",
    category: "audio",
    price: 199,
    inventory: 50,
    description: "",
  });

  const lowStockProducts = productsList.filter((p) => p.inventory < 20);

  const handleUpdateStock = (id: string) => {
    const updated = updateStoredProductStock(id, newStockVal);
    setProductsList(updated);
    setStockEditId(null);
  };

  const handleStatusChange = (orderId: string, nextStatus: Order["status"]) => {
    const updated = updateStoredOrderStatus(orderId, nextStatus);
    setOrdersList(updated);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Product = {
      id: `prod-${Date.now()}`,
      name: newProd.name,
      slug: newProd.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: newProd.category,
      price: Number(newProd.price),
      inventory: Number(newProd.inventory),
      rating: 5.0,
      reviewsCount: 1,
      description: newProd.description || "Precision engineered hardware peripheral.",
      features: ["Precision CNC Aluminum", "Ultra-low latency", "2-Year Warranty"],
      specs: { Material: "Aircraft Alloy", Connectivity: "USB-C / BT 5.3" },
      colors: [{ name: "Space Gray", hex: "#4b5563" }],
      images: [
        "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80",
      ],
      isNew: true,
    };
    const updated = addStoredProduct(created);
    setProductsList(updated);
    setShowAddModal(false);
    setNewProd({ name: "", category: "audio", price: 199, inventory: 50, description: "" });
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10">
      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
            <h3 className="font-bold text-lg text-white mb-4">Add SKU To Catalog</h3>
            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  placeholder="e.g. Apex Titanium Earbuds"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Category</label>
                  <select
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="audio">Audio & Acoustics</option>
                    <option value="workspace">Desk & Workspace</option>
                    <option value="edc">Everyday Carry</option>
                    <option value="apparel">Minimalist Wear</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Price (USD)</label>
                  <input
                    type="number"
                    required
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Initial Stock Units</label>
                <input
                  type="number"
                  required
                  value={newProd.inventory}
                  onChange={(e) => setNewProd({ ...newProd, inventory: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={newProd.description}
                  onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                  placeholder="Key materials, acoustic profile, hardware specs..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold"
                >
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-8 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
              Merchant Operations
            </span>
            <h1 className="text-3xl font-extrabold text-white mt-1">Enterprise Admin Cockpit</h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Inventory reservations, revenue velocity curves, and automated fulfillment pipelines
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 self-start md:self-auto transition shadow-lg shadow-indigo-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Create New SKU</span>
          </button>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>Gross 6-Mo Revenue</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold font-mono text-white">$426,300</p>
            <span className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1 font-mono">
              <TrendingUp className="w-3 h-3" />
              <span>+18.4% MoM growth</span>
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>Total Orders Dispatched</span>
              <Package className="w-4 h-4 text-indigo-400" />
            </div>
            <p className="text-2xl font-bold font-mono text-white">1,185</p>
            <span className="text-[11px] text-indigo-400 font-mono mt-1 block">
              Average Order: $360.20
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>Catalog SKUs Active</span>
              <Layers className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-2xl font-bold font-mono text-white">{productsList.length}</p>
            <span className="text-[11px] text-slate-500 font-mono mt-1 block">Across 4 Pillars</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
              <span>Low Inventory Alerts</span>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl font-bold font-mono text-amber-400">{lowStockProducts.length}</p>
            <span className="text-[11px] text-amber-400/80 font-mono mt-1 block">
              Units requiring factory restock
            </span>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Revenue Velocity Chart */}
          <div className="lg:col-span-8 p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-semibold text-white">Revenue & Velocity Trends</h3>
                <p className="text-xs text-slate-400">Monthly gross sales volume (USD)</p>
              </div>
              <span className="text-xs font-mono text-indigo-400 px-2 py-1 bg-indigo-500/10 rounded-lg">
                Recharts v2
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={SALES_METRICS}>
                  <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `$${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      borderColor: "#334155",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="revenue" fill="#6366f1" radius={[6, 6, 0, 0]} />
                  <Line type="monotone" dataKey="aov" stroke="#38bdf8" strokeWidth={2} dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution Donut */}
          <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white mb-1">Category Contribution</h3>
              <p className="text-xs text-slate-400 mb-4">Volume split across equipment lines</p>

              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={CATEGORY_DISTRIBUTION}
                      innerRadius={45}
                      outerRadius={65}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {CATEGORY_DISTRIBUTION.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0f172a",
                        borderColor: "#334155",
                        borderRadius: "12px",
                        fontSize: "12px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-4 border-t border-slate-800">
              {CATEGORY_DISTRIBUTION.map((c) => (
                <div key={c.name} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.fill }} />
                  <span className="text-slate-400 truncate">{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Inventory Stock Management Table */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-semibold text-white">Live Stock Inventory Control</h3>
              <p className="text-xs text-slate-400">Inline real-time inventory adjustments with zero downtime</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 text-slate-400">
                <tr>
                  <th className="pb-3 font-semibold">SKU / Item</th>
                  <th className="pb-3 font-semibold">Category</th>
                  <th className="pb-3 font-semibold">Unit Price</th>
                  <th className="pb-3 font-semibold">Current Stock</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {productsList.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-850/50 transition">
                    <td className="py-3 flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={prod.images[0]} alt={prod.name} className="w-10 h-10 rounded-lg object-cover bg-slate-800" />
                      <div>
                        <p className="font-semibold text-white">{prod.name}</p>
                        <p className="text-[11px] font-mono text-slate-500">{prod.slug}</p>
                      </div>
                    </td>
                    <td className="py-3 text-slate-400 capitalize">{prod.category}</td>
                    <td className="py-3 font-mono font-semibold text-white">${prod.price}.00</td>
                    <td className="py-3">
                      {stockEditId === prod.id ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={newStockVal}
                            onChange={(e) => setNewStockVal(Number(e.target.value))}
                            className="w-16 px-2 py-1 bg-slate-950 border border-indigo-500 rounded text-white font-mono"
                          />
                          <button
                            onClick={() => handleUpdateStock(prod.id)}
                            className="p-1 rounded bg-indigo-600 text-white"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <span
                          className={`font-mono font-semibold px-2 py-0.5 rounded-full text-[11px] ${
                            prod.inventory < 20
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              : "bg-emerald-500/10 text-emerald-400"
                          }`}
                        >
                          {prod.inventory} units
                        </span>
                      )}
                    </td>
                    <td className="py-3 text-right">
                      {stockEditId !== prod.id && (
                        <button
                          onClick={() => {
                            setStockEditId(prod.id);
                            setNewStockVal(prod.inventory);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition text-[11px]"
                        >
                          Adjust Stock
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Fulfillment Status Switcher */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8">
          <h3 className="text-base font-semibold text-white mb-2">Order Fulfillment Dispatch Queue</h3>
          <p className="text-xs text-slate-400 mb-6">Live state transitions update logistics status across the customer portal</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 text-slate-400">
                <tr>
                  <th className="pb-3 font-semibold">Order ID</th>
                  <th className="pb-3 font-semibold">Customer</th>
                  <th className="pb-3 font-semibold">Total Paid</th>
                  <th className="pb-3 font-semibold">Carrier</th>
                  <th className="pb-3 font-semibold text-right">Fulfillment Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {ordersList.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-850/50 transition">
                    <td className="py-3 font-mono font-bold text-white">{ord.orderNumber}</td>
                    <td className="py-3 text-slate-300">
                      {ord.customerName}
                      <span className="block text-[11px] text-slate-500">{ord.customerEmail}</span>
                    </td>
                    <td className="py-3 font-mono text-emerald-400 font-semibold">${ord.total.toFixed(2)}</td>
                    <td className="py-3 text-slate-400 font-mono">{ord.carrier}</td>
                    <td className="py-3 text-right">
                      <select
                        value={ord.status}
                        onChange={(e) => handleStatusChange(ord.id, e.target.value as any)}
                        className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

