"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "./data";

export interface CartItem {
  id: string; // unique item id (productId + color + size)
  product: Product;
  quantity: number;
  color?: string;
  size?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  couponCode: string;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState<string>("");
  const [couponDiscountPercent, setCouponDiscountPercent] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("apex_cart");
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("apex_cart", JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart, isLoaded]);

  const addToCart = (product: Product, quantity = 1, color?: string, size?: string) => {
    const selectedColor = color || (product.colors?.[0]?.name ?? "Default");
    const selectedSize = size || (product.sizes?.[0] ?? "");
    const itemId = `${product.id}-${selectedColor}-${selectedSize}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: itemId, product, quantity, color: selectedColor, size: selectedSize }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode("");
    setCouponDiscountPercent(0);
  };

  const applyCoupon = (code: string) => {
    const normalized = code.trim().toUpperCase();
    if (normalized === "PROMO20") {
      setCouponCode("PROMO20");
      setCouponDiscountPercent(20);
      return { success: true, message: "20% discount applied to your cart!" };
    } else if (normalized === "VIP10") {
      setCouponCode("VIP10");
      setCouponDiscountPercent(10);
      return { success: true, message: "10% VIP discount applied!" };
    } else if (normalized === "FREESHIP") {
      setCouponCode("FREESHIP");
      setCouponDiscountPercent(5);
      return { success: true, message: "Free express shipping coupon applied!" };
    }
    return { success: false, message: "Invalid promo code. Try PROMO20 or VIP10." };
  };

  const removeCoupon = () => {
    setCouponCode("");
    setCouponDiscountPercent(0);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = (subtotal * couponDiscountPercent) / 100;
  const shipping = subtotal > 150 || couponCode === "FREESHIP" || totalItems === 0 ? 0 : 15;
  const total = Math.max(0, subtotal - discount + shipping);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discount,
        shipping,
        total,
        couponCode,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
