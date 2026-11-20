"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PRODUCTS, Product } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import {
  Star,
  Check,
  Truck,
  ShieldCheck,
  RotateCcw,
  ShoppingBag,
  ArrowLeft,
  Share2,
  ChevronRight,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { addToCart } = useCart();

  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || "Default");
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes ? product.sizes[0] : "");
  const [quantity, setQuantity] = useState<number>(1);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);

  const handleAdd = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    setToastMsg(`Added ${quantity}x "${product.name}" (${selectedColor}) to cart!`);
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-indigo-400/40 animate-bounce">
          <ShoppingBag className="w-5 h-5" />
          <span className="text-sm font-medium">{toastMsg}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8">
          <Link href="/" className="hover:text-slate-300 transition">Storefront</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/shop" className="hover:text-slate-300 transition">Catalog</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-300 capitalize">{product.category}</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-indigo-400 font-medium truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Hero Workstation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 relative shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.compareAtPrice && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-indigo-600 text-xs font-bold text-white rounded-lg">
                  SAVE ${product.compareAtPrice - product.price}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                    selectedImage === idx ? "border-indigo-500 scale-105" : "border-slate-800 opacity-60 hover:opacity-100"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Actions & Variants */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
                    Category: {product.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-amber-400 font-medium">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-slate-500 font-mono">({product.reviewsCount} reviews)</span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 leading-tight">
                  {product.name}
                </h1>

                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-3xl font-bold font-mono text-white">${product.price}.00</span>
                  {product.compareAtPrice && (
                    <span className="text-lg font-mono text-slate-500 line-through">
                      ${product.compareAtPrice}.00
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {product.inventory > 15 ? "In Stock & Ready to Dispatch" : `Low Stock: Only ${product.inventory} Left`}
                  </span>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Color Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
                  Color Finish: <span className="text-white normal-case font-normal">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-3">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition ${
                        selectedColor === c.name
                          ? "bg-slate-800 border-indigo-500 text-white shadow-md shadow-indigo-500/20"
                          : "border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-slate-700" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection (if applicable) */}
              {product.sizes && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5">
                    Select Size: <span className="text-white normal-case font-normal">{selectedSize}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`w-10 h-10 rounded-xl border text-xs font-semibold transition flex items-center justify-center ${
                          selectedSize === s
                            ? "bg-indigo-600 border-indigo-500 text-white"
                            : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Adjuster & Add To Cart */}
              <div className="pt-4 border-t border-slate-800 flex items-center gap-4">
                <div className="flex items-center border border-slate-800 rounded-xl bg-slate-900 px-3 py-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-slate-400 hover:text-white font-bold px-1"
                  >
                    -
                  </button>
                  <span className="mx-4 text-xs font-mono font-bold text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-slate-400 hover:text-white font-bold px-1"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="flex-1 py-3.5 px-6 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart (${product.price * quantity}.00)</span>
                </button>
              </div>

              {/* Value Props */}
              <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 space-y-2.5 text-xs text-slate-400">
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-indigo-400" />
                  <span>Free tracked express shipping on orders over $150</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>2-Year comprehensive manufacturer hardware warranty</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <RotateCcw className="w-4 h-4 text-purple-400" />
                  <span>30-Day risk-free return trial with prepaid return label</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights & Specifications Table */}
        <div className="mt-16 pt-12 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Key Features */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Key Engineered Capabilities</h3>
            <ul className="space-y-3">
              {product.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Specs Table */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Technical Specifications</h3>
            <div className="rounded-2xl border border-slate-800 overflow-hidden divide-y divide-slate-800">
              {Object.entries(product.specs).map(([label, val], idx) => (
                <div key={idx} className="flex justify-between p-3.5 text-xs bg-slate-900/40">
                  <span className="text-slate-400 font-medium">{label}</span>
                  <span className="text-white font-mono text-right">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-slate-800">
            <h3 className="text-xl font-bold text-white mb-6">Complete The Modular Setup</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/product/${rel.slug}`}
                  className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition flex items-center gap-4 group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={rel.images[0]}
                    alt={rel.name}
                    className="w-16 h-16 rounded-xl object-cover bg-slate-800 flex-shrink-0"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-white group-hover:text-indigo-400 transition line-clamp-1">
                      {rel.name}
                    </h4>
                    <p className="text-xs font-mono text-indigo-400 mt-1">${rel.price}.00</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

