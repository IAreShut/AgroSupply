import { createFileRoute, Link } from "@tanstack/react-router";
import { Package, Boxes, Tag, ArrowRight } from "lucide-react";
import { useProducts } from "@/lib/products-store";
import { formatMYR } from "@/lib/cart";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const { products } = useProducts();
  const totalValue = products.reduce((s, p) => s + p.price, 0);
  const byCategory = products.reduce<Record<string, number>>((acc, p) => {
    acc[p.category] = (acc[p.category] ?? 0) + 1;
    return acc;
  }, {});

  const stats = [
    { label: "Total products", value: products.length, icon: Package },
    { label: "Categories", value: Object.keys(byCategory).length, icon: Boxes },
    { label: "Catalogue value", value: formatMYR(totalValue), icon: Tag },
  ];

  return (
    <div>
      <header className="border-b border-border/60 pb-6">
        <p className="text-xs uppercase tracking-widest text-accent">Overview</p>
        <h1 className="mt-2 font-display text-4xl font-semibold">Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">A quick snapshot of your nursery catalogue.</p>
      </header>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border/60 bg-card p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{s.label}</p>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-primary">
                <s.icon className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-3 font-display text-3xl font-semibold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border/60 bg-card p-6">
          <h3 className="font-display text-lg font-semibold">Items by category</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {Object.entries(byCategory).map(([cat, n]) => (
              <li key={cat} className="flex items-center justify-between border-b border-border/40 py-2 last:border-0">
                <span>{cat}</span>
                <span className="font-medium">{n}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-between rounded-2xl border border-border/60 bg-primary p-6 text-primary-foreground">
          <div>
            <h3 className="font-display text-2xl font-semibold">Manage your catalogue</h3>
            <p className="mt-2 text-sm text-primary-foreground/85">
              Create, edit and remove products. Changes appear instantly on the storefront.
            </p>
          </div>
          <Link
            to="/admin/products"
            className="mt-6 inline-flex h-11 w-fit items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
          >
            Go to Products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
