import { NextResponse } from "next/server";
import { PRODUCTS, Product } from "@/lib/data";

let serverProducts: Product[] = [...PRODUCTS];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const query = searchParams.get("q")?.toLowerCase();
  const sort = searchParams.get("sort");

  let filtered = [...serverProducts];

  if (category && category !== "all") {
    filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (query) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.features.some((f) => f.toLowerCase().includes(query))
    );
  }

  if (sort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return NextResponse.json({
    success: true,
    totalCount: filtered.length,
    products: filtered,
    syncedAt: new Date().toISOString(),
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.name || !body.price || !body.category) {
      return NextResponse.json(
        { error: "Product name, price, and category are required" },
        { status: 400 }
      );
    }

    const newProduct: Product = {
      id: body.id || `prod-${Date.now()}`,
      name: body.name,
      slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      category: body.category,
      price: Number(body.price),
      compareAtPrice: body.compareAtPrice ? Number(body.compareAtPrice) : undefined,
      rating: body.rating || 4.8,
      reviewsCount: body.reviewsCount || 1,
      inventory: body.inventory !== undefined ? Number(body.inventory) : 25,
      description: body.description || "",
      features: body.features || ["Aerospace engineered precision"],
      specs: body.specs || { Warranty: "2-Year Manufacturer" },
      colors: body.colors || [{ name: "Obsidian", hex: "#0f172a" }],
      images: body.images || [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      ],
      isFeatured: Boolean(body.isFeatured),
    };

    serverProducts = [newProduct, ...serverProducts];

    return NextResponse.json({
      success: true,
      message: "Product catalog updated",
      product: newProduct,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updated = await request.json();
    if (!updated.id) {
      return NextResponse.json({ error: "Missing product ID" }, { status: 400 });
    }

    serverProducts = serverProducts.map((p) =>
      p.id === updated.id ? { ...p, ...updated } : p
    );

    return NextResponse.json({
      success: true,
      message: "Product inventory updated",
      product: updated,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing product id" }, { status: 400 });
  }

  serverProducts = serverProducts.filter((p) => p.id !== id);

  return NextResponse.json({
    success: true,
    message: "Product deleted",
    remainingCount: serverProducts.length,
  });
}

