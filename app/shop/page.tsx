"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { PRODUCTS, CATEGORIES, Product } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import {
  Search,
  SlidersHorizontal,
  Star,
  Plus,
  ShoppingBag,
  ArrowUpDown,
  Filter,
} from "lucide-react";

export default function ShopPage() {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(600);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== "all" && product.category !== selectedCategory) return false;

      // Price filter
      if (product.price > maxPrice) return false;

      // In stock
      if (inStockOnly && product.inventory <= 0) return false;

      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [searchQuery, selectedCategory, maxPrice, sortBy, inStockOnly]);

  const handleAdd = (product: Product) => {
    addToCart(product, 1);
    setToastMessage(`Added "${product.name}" to cart`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 py-10">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-indigo-400/40 animate-bounce">
          <ShoppingBag className="w-5 h-5" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
                Comprehensive Catalog
              </span>
              <h1 className="text-3xl font-extrabold text-white mt-1">Equipment Storefront</h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Showing {filteredProducts.length} of {PRODUCTS.length} premium engineering products
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search titanium, headphones, keyboard..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-semibold text-xs text-white flex items-center gap-2">
                  <Filter className="w-4 h-4 text-indigo-400" />
                  <span>Filters</span>
                </span>
                {(selectedCategory !== "all" || maxPrice !== 600 || inStockOnly || searchQuery) && (
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      setMaxPrice(600);
                      setInStockOnly(false);
                      setSearchQuery("");
                    }}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* Categories */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-2.5">Category</label>
                <div className="space-y-1.5">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition ${
                      selectedCategory === "all"
                        ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/40"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    All Categories ({PRODUCTS.length})
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition flex items-center justify-between ${
                        selectedCategory === cat.slug
                          ? "bg-indigo-600/20 text-indigo-300 border border-indigo-500/40"
                          : "text-slate-400 hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {PRODUCTS.filter((p) => p.category === cat.slug).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <div className="flex justify-between items-center text-xs mb-2">
                  <label htmlFor="shop-price-slider" className="text-slate-300 font-medium">Max Price</label>
                  <span className="font-mono text-indigo-400 font-semibold">${maxPrice}</span>
                </div>
                <input
                  id="shop-price-slider"
                  type="range"
                  min="50"
                  max="600"
                  step="25"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>$50</span>
                  <span>$600+</span>
                </div>
              </div>

              {/* In stock toggle */}
              <div className="pt-2 border-t border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-0"
                  />
                  <span>In Stock Units Only</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3 space-y-6">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800">
              <span className="text-xs text-slate-400">
                Found <strong className="text-white">{filteredProducts.length}</strong> items
              </span>

              {/* Sorting */}
              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-xs text-slate-400">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center rounded-2xl border border-slate-800 bg-slate-900/30">
                <SlidersHorizontal className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <h3 className="text-base font-semibold text-white">No matching equipment found</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                  Try adjusting your price ceiling or search terms to uncover more items in our inventory.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setMaxPrice(600);
                    setSearchQuery("");
                  }}
                  className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-medium transition"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden hover:border-slate-700 transition flex flex-col justify-between"
                  >
                    <div>
                      {/* Image */}
                      <Link href={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden bg-slate-800">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {product.compareAtPrice && (
                          <span className="absolute top-3 left-3 px-2 py-0.5 bg-indigo-600 text-[10px] font-bold text-white rounded-md tracking-wider">
                            SAVE ${product.compareAtPrice - product.price}
                          </span>
                        )}
                        <span className="absolute top-3 right-3 px-2 py-0.5 bg-slate-950/80 backdrop-blur text-[10px] font-mono text-slate-300 rounded-md border border-slate-700">
                          {product.inventory} in stock
                        </span>
                      </Link>

                      {/* Content */}
                      <div className="p-4">
                        <div className="flex items-center gap-1.5 text-xs text-amber-400 mb-1">
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

                        {/* Colors */}
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

                    {/* Bottom Action */}
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
                        onClick={() => handleAdd(product)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white border border-slate-700 hover:border-indigo-500 transition shadow-sm"
                        title="Add to Cart"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

