# AI Context & System Architecture: E-commerce Platform

## Overview
A modern, high-conversion full-stack E-commerce Engine built with Next.js 15, PostgreSQL (via Prisma ORM), Stripe checkout simulation, and enterprise inventory management.

## Key Features & Routes
- `/`: Marketing storefront showcase with interactive product visualizer, discount calculator, category cards, and customer testimonials.
- `/shop`: Complete product catalog with category filter, price slider, in-stock filter, and sort options.
- `/product/[slug]`: Deep product details with multi-angle galleries, variant pickers (size/color), real-time stock meter, and reviews.
- `/cart`: Client-side cart workstation with persistent state, coupon code discount validator, and free shipping tracker.
- `/checkout`: Stripe checkout experience with card simulation, shipping address inputs, and order confirmation.
- `/orders`: Real-time order tracker with milestone status timeline, tracking carrier links, and digital invoice preview.
- `/admin`: Enterprise merchant cockpit with revenue velocity Recharts, low stock alerts, inventory editor, and order fulfillment controls.
- `/settings`: Currency switchers (USD, EUR, GBP, JPY), Stripe webhooks monitor, and Prisma relational schema explorer.
- `/api/checkout`: Mock checkout session processor with cryptographic order ID generation.

## Relational Data Model (Prisma)
- Product: id, name, slug, description, price, compareAtPrice, rating, reviewsCount, inventory, categoryId, images, tags, isFeatured.
- Category: id, name, slug, description, productCount.
- Order: id, orderNumber, customerName, customerEmail, totalAmount, discountAmount, shippingFee, status, paymentStatus, createdAt.
- OrderItem: id, orderId, productId, quantity, unitPrice.

