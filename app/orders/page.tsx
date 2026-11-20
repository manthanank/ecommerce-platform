"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MOCK_ORDERS, Order } from "@/lib/data";
import { getStoredOrders } from "@/lib/store";
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Search,
  ExternalLink,
  Printer,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<Order>(MOCK_ORDERS[0]);
  const [filterQuery, setFilterQuery] = useState("");
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  useEffect(() => {
    const loaded = getStoredOrders();
    if (loaded && loaded.length > 0) {
      setOrders(loaded);
      setSelectedOrder(loaded[0]);
    }
  }, []);

  const filteredOrders = orders.filter((o) => {
    if (!filterQuery.trim()) return true;
    const q = filterQuery.toLowerCase();
    return (
      o.orderNumber.toLowerCase().includes(q) ||
      o.customerName.toLowerCase().includes(q) ||
      o.customerEmail.toLowerCase().includes(q)
    );
  });

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Shipped":
        return "bg-sky-500/10 text-sky-400 border-sky-500/20";
      case "Processing":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      default:
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
    }
  };

  const steps = ["Confirmed", "Processing", "Shipped", "Delivered"];

  const getStepIndex = (status: Order["status"]) => {
    return steps.indexOf(status);
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10">
      {/* Invoice Modal */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="max-w-xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative text-slate-100">
            <div className="flex justify-between items-start pb-4 border-b border-slate-800">
              <div>
                <h3 className="font-bold text-lg text-white">Commercial Invoice</h3>
                <p className="text-xs text-slate-400 font-mono">{selectedOrder.orderNumber}</p>
              </div>
              <button
                onClick={() => setShowInvoiceModal(false)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded-lg bg-slate-800"
              >
                Close
              </button>
            </div>

            <div className="my-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                <div>
                  <p className="text-slate-500">Billed To:</p>
                  <p className="font-semibold text-white mt-0.5">{selectedOrder.customerName}</p>
                  <p className="text-slate-400">{selectedOrder.customerEmail}</p>
                  <p className="text-slate-500 mt-1">{selectedOrder.shippingAddress}</p>
                </div>
                <div>
                  <p className="text-slate-500">Order Metadata:</p>
                  <p className="text-white mt-0.5">Date: {selectedOrder.date}</p>
                  <p className="text-white">Status: {selectedOrder.status}</p>
                  <p className="text-indigo-400 font-mono mt-1">{selectedOrder.carrier}</p>
                </div>
              </div>

              <div className="divide-y divide-slate-800">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex justify-between">
                    <span>
                      {item.name} ({item.quantity}x)
                    </span>
                    <span className="font-mono">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800 space-y-1.5 font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span>${selectedOrder.subtotal.toFixed(2)}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount</span>
                    <span>-${selectedOrder.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-sm text-white pt-2 border-t border-slate-800">
                  <span>Total Paid</span>
                  <span className="text-indigo-400">${selectedOrder.total.toFixed(2)} USD</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official Invoice Copy</span>
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
                Customer Care & Logistics
              </span>
              <h1 className="text-3xl font-extrabold text-white mt-1">Order Tracking Hub</h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Real-time carrier tracking links, milestone fulfillment stages & digital invoices
              </p>
            </div>

            {/* Filter */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search by order ID or name..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Orders List */}
          <div className="lg:col-span-5 space-y-3">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Recent Dispatches ({filteredOrders.length})
            </h2>

            {filteredOrders.map((ord) => {
              const isSelected = selectedOrder.id === ord.id;
              return (
                <div
                  key={ord.id}
                  onClick={() => setSelectedOrder(ord)}
                  className={`p-4 rounded-2xl border transition cursor-pointer ${
                    isSelected
                      ? "bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/10"
                      : "bg-slate-900/40 border-slate-800/80 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-white">{ord.orderNumber}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusBadge(
                        ord.status
                      )}`}
                    >
                      {ord.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mt-2 font-medium">{ord.customerName}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{ord.items.length} items • {ord.date}</p>

                  <div className="mt-3 pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-mono">{ord.carrier}</span>
                    <span className="font-mono font-bold text-indigo-400">${ord.total.toFixed(2)}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Order Milestone Detail */}
          <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
              <div>
                <span className="text-xs font-mono text-indigo-400 font-semibold">{selectedOrder.orderNumber}</span>
                <h3 className="text-xl font-bold text-white mt-1">{selectedOrder.customerName}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{selectedOrder.shippingAddress}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowInvoiceModal(true)}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-white flex items-center gap-1.5 transition"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Invoice</span>
                </button>
              </div>
            </div>

            {/* Visual Tracking Stepper */}
            <div>
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-6">
                Fulfillment Milestone Tracker
              </h4>

              <div className="relative">
                <div className="absolute top-4 left-4 right-4 h-0.5 bg-slate-800 -z-0" />
                <div className="grid grid-cols-4 text-center relative z-10">
                  {steps.map((st, i) => {
                    const currentIndex = getStepIndex(selectedOrder.status);
                    const isPassed = i <= currentIndex;
                    return (
                      <div key={st} className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition ${
                            isPassed
                              ? "bg-indigo-600 text-white ring-4 ring-slate-950"
                              : "bg-slate-800 text-slate-500 ring-4 ring-slate-950"
                          }`}
                        >
                          {isPassed ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                        </div>
                        <span className={`text-[11px] font-medium mt-2 ${isPassed ? "text-white" : "text-slate-500"}`}>
                          {st}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Carrier Details */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Assigned Freight Carrier</p>
                  <p className="text-sm font-semibold text-white">{selectedOrder.carrier}</p>
                  <p className="text-xs font-mono text-indigo-400 mt-0.5">{selectedOrder.trackingNumber}</p>
                </div>
              </div>

              <a
                href={`https://www.google.com/search?q=${selectedOrder.trackingNumber}`}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 flex items-center gap-1.5 transition"
              >
                <span>Live Carrier GPS</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Included Line Items */}
            <div>
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                Included Inventory Items
              </h4>
              <div className="divide-y divide-slate-800/80 rounded-2xl border border-slate-800 overflow-hidden bg-slate-950">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover bg-slate-900" />
                      <div>
                        <p className="text-xs font-semibold text-white">{item.name}</p>
                        <p className="text-[11px] text-slate-400">
                          {item.quantity} unit(s) • {item.color || "Standard"}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-semibold text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

