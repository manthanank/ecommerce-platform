import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://ecommerce-platform-roan-pi.vercel.app"),
  title: "APEX Store | Precision Engineering & High-End Peripherals",
  description:
    "Industrial-grade audio, CNC mechanical keyboards, titanium timepieces, and weatherproof technical apparel with instant secure checkout.",
  keywords: ["e-commerce", "nextjs", "stripe", "prisma", "audio", "mechanical keyboards", "everyday carry"],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "APEX Store | Precision Peripherals",
    description: "Industrial-grade hardware with instant 256-bit encrypted checkout and live order tracking.",
    type: "website",
    url: "https://ecommerce-platform-roan-pi.vercel.app",
    siteName: "APEX Store",
  },
  twitter: {
    card: "summary_large_image",
    title: "APEX Store | Precision Engineering Peripherals",
    description: "CNC keyboards, lossless audio, titanium timepieces, and real-time inventory management.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    name: "APEX Store",
    url: "https://ecommerce-platform-roan-pi.vercel.app",
    description: "Precision engineered audio, CNC keyboards, and minimalist daily essentials.",
    currenciesAccepted: "USD, EUR, GBP, JPY",
    paymentAccepted: "Credit Card, Stripe",
    priceRange: "$$",
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <CartDrawer />
            <main className="flex-1">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
