import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag, CheckCircle2 } from "lucide-react";
import { useCart, formatMYR } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — AgroSupply" }] }),
  component: CartPage,
});

function CartPage() {
  const { detailed, setQty, remove, total, clear, count } = useCart();
  const [placed, setPlaced] = useState(false);
  const shipping = total > 150 || total === 0 ? 0 : 12;
  const grand = total + shipping;

  if (placed) {
    return (
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
        <h1 className="mt-6 font-display text-4xl font-semibold">Order placed!</h1>
        <p className="mt-3 text-muted-foreground">
          Thank you for shopping with AgroSupply. A confirmation email is on its way, and your plants will ship within 48 hours.
        </p>
        <Link to="/shop" className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <h1 className="font-display text-5xl font-semibold">Your cart</h1>
      <p className="mt-2 text-muted-foreground">
        {count === 0 ? "Your cart is empty." : `${count} item${count === 1 ? "" : "s"} ready to grow.`}
      </p>

      {count === 0 ? (
        <div className="mt-12 rounded-3xl border border-dashed border-border p-16 text-center">
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">Looks like you haven't added any plants yet.</p>
          <Link to="/shop" className="mt-6 inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground">
            Browse the nursery
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[2fr_1fr]">
          <ul className="space-y-4">
            {detailed.map(({ product, qty, subtotal }) => (
              <li key={product.id} className="flex gap-4 rounded-2xl border border-border/60 bg-card p-4">
                <img src={product.image} alt={product.name} width={96} height={96} className="h-24 w-24 flex-shrink-0 rounded-xl object-cover" />
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">{product.category}</p>
                      <h3 className="font-display text-lg font-semibold">{product.name}</h3>
                    </div>
                    <button onClick={() => remove(product.id)} className="text-muted-foreground hover:text-destructive" aria-label="Remove">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="inline-flex items-center rounded-full border border-border">
                      <button onClick={() => setQty(product.id, qty - 1)} className="px-3 py-1.5"><Minus className="h-3.5 w-3.5" /></button>
                      <span className="w-8 text-center text-sm font-medium">{qty}</span>
                      <button onClick={() => setQty(product.id, qty + 1)} className="px-3 py-1.5"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                    <p className="font-display text-lg font-semibold">{formatMYR(subtotal)}</p>
                  </div>
                </div>
              </li>
            ))}
            <button onClick={clear} className="text-sm text-muted-foreground underline">Clear cart</button>
          </ul>

          <aside className="h-fit rounded-2xl border border-border/60 bg-card p-6">
            <h2 className="font-display text-xl font-semibold">Order summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatMYR(total)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shipping === 0 ? "Free" : formatMYR(shipping)}</dd></div>
              <div className="mt-3 flex justify-between border-t border-border pt-3 text-base font-semibold"><dt>Total</dt><dd>{formatMYR(grand)}</dd></div>
            </dl>
            <p className="mt-3 text-xs text-muted-foreground">{total < 150 && total > 0 ? `Spend ${formatMYR(150 - total)} more for free shipping.` : "Free shipping unlocked 🌱"}</p>
            <button
              onClick={() => { setPlaced(true); clear(); }}
              className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Checkout
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">Demo checkout — no real payment processed.</p>
          </aside>
        </div>
      )}
    </div>
  );
}
