import { describe, it, expect } from "vitest";
import { GET as getProducts, POST as postProduct } from "../app/api/products/route";
import { GET as getOrders, POST as postOrder } from "../app/api/orders/route";

describe("Ecommerce Platform API Routes", () => {
  it("GET /api/products returns catalog with products", async () => {
    const req = new Request("http://localhost:3000/api/products");
    const res = await getProducts(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(Array.isArray(data.products)).toBe(true);
    expect(data.products.length).toBeGreaterThan(0);
    expect(data.products[0]).toHaveProperty("name");
    expect(data.products[0]).toHaveProperty("price");
  });

  it("GET /api/products supports category filtering", async () => {
    const req = new Request("http://localhost:3000/api/products?category=audio");
    const res = await getProducts(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    const allAudio = data.products.every((p: any) => p.category.toLowerCase() === "audio");
    expect(allAudio).toBe(true);
  });

  it("POST /api/products validates missing required fields", async () => {
    const req = new Request("http://localhost:3000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Incomplete item" }),
    });

    const res = await postProduct(req);
    expect(res.status).toBe(400);
  });

  it("GET /api/orders returns current orders", async () => {
    const req = new Request("http://localhost:3000/api/orders");
    const res = await getOrders(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(Array.isArray(data.orders)).toBe(true);
  });

  it("POST /api/orders creates a new customer order", async () => {
    const orderPayload = {
      customerName: "John Doe",
      customerEmail: "john@example.com",
      items: [{ id: "prod-1", name: "Premium Headphones", price: 299, quantity: 1 }],
      shippingAddress: "123 Tech Way, San Francisco, CA",
    };

    const req = new Request("http://localhost:3000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderPayload),
    });

    const res = await postOrder(req);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.order).toHaveProperty("orderNumber");
  });
});
