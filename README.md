# Apex Store — Enterprise Hardware & Audio E-Commerce Platform

Apex Store is a full-featured e-commerce storefront built with Next.js 15, TypeScript, Tailwind CSS, Stripe checkout integration, and an administrative inventory control center.

## Overview & Architecture

- **Storefront & Catalog**: Relational catalog with multi-axis faceted filtering by category, price ranges, in-stock availability, and keyword search.
- **Dynamic Catalog API (`/api/products`)**: Server-side product search, sorting, and live inventory decrement.
- **Dynamic Order Processing (`/api/orders`)**: Live order tracking number generation, courier dispatch, and printable commercial tax invoices.
- **Optimistic Cart Experience**: Cross-page shopping bag synchronization with persistent local caching and stock locking.
- **Merchant Cockpit (`/admin`)**: Operational analytics dashboard showing monthly revenue, order volumes, average order value, and category distribution.
- **PCI-DSS Level 1 Compliance Flow**: Stripe Checkout session creation via secure server route handlers (`/api/checkout`).

## Tech Stack

- **Framework**: Next.js 15 (App Router, Server Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, PostCSS, Lucide Icons
- **State Management**: React Context, LocalStorage Sync
- **Payments**: Stripe API
- **Deployment**: Vercel

## API Endpoints

- `GET /api/products`: Retrieve all products with category, query, and sorting parameters.
- `POST /api/products`: Add a new product to the catalog (Merchant Admin).
- `PUT /api/products`: Update inventory levels and pricing.
- `DELETE /api/products`: Remove a product from the active catalog.
- `GET /api/orders`: Query placed orders and fulfillment status.
- `POST /api/orders`: Process a new order and generate tracking metadata.
- `POST /api/checkout`: Initialize Stripe Checkout session.

## Getting Started

1. Navigate to the project directory:
   ```bash
   cd c:\Users\manth\projects\ecommerce-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `.env.local` (copy from `.env.example`):
   ```bash
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the storefront.
