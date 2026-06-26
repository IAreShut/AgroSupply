import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Minus, Plus, ShoppingBag, Leaf } from "lucide-react";
import { useProducts } from "@/lib/products-store";
import { useCart, formatMYR } from "@/lib/cart";
import { ProductCard } from "@/components/product-card";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$id")({
  head: () => ({
    meta: [
      { title: "Product — AgroSupply" },
      { name: "description", content: "Plant and garden product details from AgroSupply." },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { id } = Route.useParams();
  const { getProduct, products } = useProducts();
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  const product = getProduct(id);

  if (!product) {
    return (
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <h1 className="font-display text-4xl font-semibold">Product not found</h1>
        <Link to="/shop" className="mt-6 inline-flex text-primary underline">Back to shop</Link>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to shop
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl bg-secondary">
          <img
            src={product.image}
            alt={product.name}
            width={768}
            height={768}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-widest text-accent">{product.category}</p>
          <h1 className="mt-2 font-display text-5xl font-semibold leading-tight">{product.name}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{product.description}</p>
          <p className="mt-6 font-display text-4xl font-semibold text-primary">{formatMYR(product.price)}</p>

          {product.care && (
            <div className="mt-6 flex items-start gap-3 rounded-2xl bg-secondary p-4">
              <Leaf className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-semibold">Care guide</p>
                <p className="text-sm text-muted-foreground">{product.care}</p>
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center gap-4">
            <div className="inline-flex h-12 items-center rounded-full border border-border bg-card">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 text-muted-foreground hover:text-foreground" aria-label="Decrease">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-medium">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-4 text-muted-foreground hover:text-foreground" aria-label="Increase">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => {
                add(product.id, qty);
                toast.success(`${qty} × ${product.name} added to cart`);
              }}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              <ShoppingBag className="h-4 w-4" /> Add to cart
            </button>
          </div>

          <ul className="mt-8 grid grid-cols-2 gap-3 text-sm text-muted-foreground">
            <li>✓ Free delivery over RM150</li>
            <li>✓ 30-day healthy-arrival guarantee</li>
            <li>✓ Care card included</li>
            <li>✓ Grown in Selangor</li>
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-display text-3xl font-semibold">You might also like</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
