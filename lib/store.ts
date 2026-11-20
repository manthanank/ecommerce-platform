import { Order, Product, PRODUCTS, MOCK_ORDERS } from "./data";

const ORDERS_KEY = "apex_orders_v2";
const PRODUCTS_KEY = "apex_products_v2";

export function getStoredOrders(): Order[] {
  if (typeof window === "undefined") return MOCK_ORDERS;
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(MOCK_ORDERS));
      return MOCK_ORDERS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read orders from localStorage", e);
    return MOCK_ORDERS;
  }
}

export function saveNewOrder(order: Order): Order[] {
  if (typeof window === "undefined") return [order, ...MOCK_ORDERS];
  try {
    const current = getStoredOrders();
    const updated = [order, ...current];
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Failed to save order to localStorage", e);
    return [order];
  }
}

export function updateStoredOrderStatus(orderId: string, status: Order["status"]): Order[] {
  if (typeof window === "undefined") return MOCK_ORDERS;
  try {
    const current = getStoredOrders();
    const updated = current.map((o) => (o.id === orderId ? { ...o, status } : o));
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Failed to update order status in localStorage", e);
    return MOCK_ORDERS;
  }
}

export function getStoredProducts(): Product[] {
  if (typeof window === "undefined") return PRODUCTS;
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    if (!raw) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(PRODUCTS));
      return PRODUCTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to read products from localStorage", e);
    return PRODUCTS;
  }
}

export function updateStoredProductStock(productId: string, newStock: number): Product[] {
  if (typeof window === "undefined") return PRODUCTS;
  try {
    const current = getStoredProducts();
    const updated = current.map((p) => (p.id === productId ? { ...p, inventory: newStock } : p));
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Failed to update product stock", e);
    return PRODUCTS;
  }
}

export function addStoredProduct(newProd: Product): Product[] {
  if (typeof window === "undefined") return [newProd, ...PRODUCTS];
  try {
    const current = getStoredProducts();
    const updated = [newProd, ...current];
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Failed to add product to localStorage", e);
    return [newProd, ...PRODUCTS];
  }
}
