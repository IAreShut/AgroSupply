import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useCart, formatMYR } from "@/lib/cart";
import type { Product } from "@/lib/products";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-soft)]">
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="relative block aspect-square overflow-hidden bg-secondary"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={768}
          height={768}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            {product.badge}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{product.category}</p>
        <Link to="/product/$id" params={{ id: product.id }} className="mt-1">
          <h3 className="font-display text-lg font-semibold text-foreground">{product.name}</h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{product.short}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-xl font-semibold text-primary">{formatMYR(product.price)}</span>
          <button
            onClick={() => {
              add(product.id);
              toast.success(`${product.name} added to cart`);
            }}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            <ShoppingBag className="h-4 w-4" /> Add
          </button>
        </div>
      </div>
    </article>
  );
}
