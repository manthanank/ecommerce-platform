import { NextResponse } from "next/server";
import { Order, MOCK_ORDERS } from "@/lib/data";

function generateDynamicOrders(): Order[] {
  const now = new Date();
  const relDate = (daysAgo: number) => {
    const d = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    return d.toISOString().split("T")[0];
  };

  return MOCK_ORDERS.map((ord, idx) => ({
    ...ord,
    date: relDate(idx * 2 + 1),
  }));
}

let serverOrders: Order[] = generateDynamicOrders();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const email = searchParams.get("email");

  let filtered = [...serverOrders];

  if (status && status !== "All") {
    filtered = filtered.filter((o) => o.status === status);
  }

  if (email) {
    filtered = filtered.filter((o) => o.customerEmail.toLowerCase() === email.toLowerCase());
  }

  return NextResponse.json({
    success: true,
    count: filtered.length,
    orders: filtered,
    syncedAt: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.items || body.items.length === 0) {
      return NextResponse.json({ error: "Order items are required" }, { status: 400 });
    }

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `ORD-${Math.floor(10000 + Math.random() * 90000)}-APX`,
      date: new Date().toISOString().split("T")[0],
      customerName: body.customerName || "Verified Customer",
      customerEmail: body.customerEmail || "customer@apexindustrial.com",
      shippingAddress: body.shippingAddress || "100 Market St, Suite 400, San Francisco, CA 94105",
      status: "Confirmed",
      trackingNumber: `APX-TRK-${Math.floor(100000000 + Math.random() * 900000000)}`,
      carrier: "FedEx International Priority",
      subtotal: Number(body.subtotal) || 0,
      discount: Number(body.discount) || 0,
      shipping: Number(body.shipping) || 0,
      total: Number(body.total) || 0,
      items: body.items,
    };

    serverOrders = [newOrder, ...serverOrders];

    return NextResponse.json({
      success: true,
      message: "Order placed and assigned to fulfillment queue",
      order: newOrder,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process order" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { orderId, status } = await request.json();
    if (!orderId || !status) {
      return NextResponse.json({ error: "Missing orderId or status" }, { status: 400 });
    }

    serverOrders = serverOrders.map((o) =>
      o.id === orderId ? { ...o, status } : o
    );

    return NextResponse.json({
      success: true,
      message: "Order status updated",
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}

