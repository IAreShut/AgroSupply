import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { type Product } from "./products";
import { useProducts } from "./products-store";

interface CartItem {
  id: string;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
  detailed: Array<{ product: Product; qty: number; subtotal: number }>;
}

const CartContext = createContext<CartContextValue | null>(null);
const KEY = "greenharvest_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const { products } = useProducts();
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
  }, [items, ready]);

  const add = (id: string, qty = 1) =>
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { id, qty }];
    });

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));
  const setQty = (id: string, qty: number) =>
    setItems((prev) =>
      qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty } : i))
    );
  const clear = () => setItems([]);

  const detailed = items
    .map((i) => {
      const product = products.find((p) => p.id === i.id);
      if (!product) return null;
      return { product, qty: i.qty, subtotal: product.price * i.qty };
    })
    .filter(Boolean) as Array<{ product: Product; qty: number; subtotal: number }>;

  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = detailed.reduce((s, i) => s + i.subtotal, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, setQty, clear, count, total, detailed }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export const formatMYR = (n: number) =>
  new Intl.NumberFormat("en-MY", { style: "currency", currency: "MYR" }).format(n);
