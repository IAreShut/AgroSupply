import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { categories, type Category } from "@/lib/products";
import { useProducts } from "@/lib/products-store";
import { ProductCard } from "@/components/product-card";
import { z } from "zod";

const searchSchema = z.object({
  category: z.string().optional(),
});

export const Route = createFileRoute("/shop")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Shop — AgroSupply Nursery" },
      { name: "description", content: "Browse our full collection of plants, seeds, fertilizers, tools and pots." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const search = Route.useSearch();
  const { products } = useProducts();
  const [active, setActive] = useState<Category | "All">((search.category as Category) || "All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"featured" | "low" | "high">("featured");

  const filtered = useMemo(() => {
    let list = products;
    if (active !== "All") list = list.filter((p) => p.category === active);
    if (query) list = list.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [products, active, query, sort]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <header className="border-b border-border/60 pb-10">
        <p className="text-xs uppercase tracking-widest text-accent">Catalogue</p>
        <h1 className="mt-2 font-display text-5xl font-semibold">The Nursery</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Every plant is greenhouse-grown, hand-inspected and shipped within 48 hours of order.
        </p>
      </header>

      <div className="mt-8 flex flex-col gap-6 lg:flex-row">
        {/* Sidebar filters */}
        <aside className="lg:w-56 lg:flex-shrink-0">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Categories</h3>
          <ul className="mt-3 flex flex-wrap gap-2 lg:flex-col">
            {(["All", ...categories] as const).map((c) => (
              <li key={c}>
                <button
                  onClick={() => setActive(c)}
                  className={`rounded-full px-4 py-1.5 text-sm transition ${
                    active === c
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
                  }`}
                >
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <div className="flex-1">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <input
              type="search"
              placeholder="Search plants, seeds, tools…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-11 w-full rounded-full border border-input bg-background px-5 text-sm outline-none ring-ring focus:ring-2 sm:max-w-xs"
            />
            <div className="flex items-center gap-3 text-sm">
              <span className="text-muted-foreground">{filtered.length} products</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="h-11 rounded-full border border-input bg-background px-4 text-sm outline-none"
              >
                <option value="featured">Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
              No products match your filter.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
