import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, customer, discountAmount, total } = body;

    if (!items || !items.length) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}-${(
      customer?.country || "US"
    ).toUpperCase()}`;

    const trackingNumber = `APX-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    return NextResponse.json({
      success: true,
      orderId,
      trackingNumber,
      carrier: "DHL Express Global",
      total,
      discountAmount: discountAmount || 0,
      status: "CONFIRMED",
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
    });
  } catch {
    return NextResponse.json({ error: "Checkout failed to process" }, { status: 500 });
  }
}
