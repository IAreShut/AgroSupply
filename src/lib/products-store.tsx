import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { products as seedProducts, type Product, type Category } from "./products";

interface ProductsContextValue {
  products: Product[];
  getProduct: (id: string) => Product | undefined;
  create: (input: Omit<Product, "id"> & { id?: string }) => Product;
  update: (id: string, patch: Partial<Omit<Product, "id">>) => void;
  remove: (id: string) => void;
  resetToSeed: () => void;
}

const Ctx = createContext<ProductsContextValue | null>(null);
const KEY = "greenharvest_products_v1";

type Persisted = { custom: Product[]; deleted: string[]; overrides: Record<string, Partial<Product>> };

const emptyState: Persisted = { custom: [], deleted: [], overrides: {} };

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `item-${Date.now()}`;
}

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(emptyState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) setState({ ...emptyState, ...JSON.parse(raw) });
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
  }, [state, ready]);

  const merged = useMemo(() => {
    const base = seedProducts
      .filter((p) => !state.deleted.includes(p.id))
      .map((p) => ({ ...p, ...(state.overrides[p.id] ?? {}) }));
    return [...base, ...state.custom];
  }, [state]);

  const value: ProductsContextValue = {
    products: merged,
    getProduct: (id) => merged.find((p) => p.id === id),
    create: (input) => {
      const id = input.id?.trim() || slugify(input.name);
      const product: Product = {
        id,
        name: input.name,
        price: Number(input.price) || 0,
        category: input.category as Category,
        image: input.image,
        short: input.short,
        description: input.description,
        care: input.care,
        badge: input.badge,
      };
      setState((s) => ({ ...s, custom: [...s.custom.filter((p) => p.id !== id), product] }));
      return product;
    },
    update: (id, patch) => {
      setState((s) => {
        if (s.custom.some((p) => p.id === id)) {
          return { ...s, custom: s.custom.map((p) => (p.id === id ? { ...p, ...patch } : p)) };
        }
        return { ...s, overrides: { ...s.overrides, [id]: { ...(s.overrides[id] ?? {}), ...patch } } };
      });
    },
    remove: (id) => {
      setState((s) => {
        if (s.custom.some((p) => p.id === id)) {
          return { ...s, custom: s.custom.filter((p) => p.id !== id) };
        }
        const { [id]: _omit, ...restOverrides } = s.overrides;
        return { ...s, deleted: [...s.deleted, id], overrides: restOverrides };
      });
    },
    resetToSeed: () => setState(emptyState),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useProducts() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
}
