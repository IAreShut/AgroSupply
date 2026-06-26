import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Leaf, Sprout, Truck, ShieldCheck } from "lucide-react";
import hero from "@/assets/hero-nursery.jpg";
import { categories } from "@/lib/products";
import { useProducts } from "@/lib/products-store";
import { ProductCard } from "@/components/product-card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AgroSupply — Plant Nursery & Garden Supplies" },
      { name: "description", content: "Shop premium indoor plants, seedlings, organic seeds, fertilizers and gardening tools from AgroSupply nursery." },
      { property: "og:title", content: "AgroSupply — Plant Nursery & Garden Supplies" },
      { property: "og:description", content: "Premium plants, seeds and garden tools, delivered with care." },
    ],
  }),
  component: Home,
});

function Home() {
  const { products } = useProducts();
  const featured = products.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={hero}
          alt="Lush greenhouse at golden hour"
          width={1920}
          height={1080}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="mx-auto max-w-7xl px-6 py-28 md:py-40">
          <span className="inline-flex items-center gap-2 rounded-full bg-background/15 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-background ring-1 ring-background/30 backdrop-blur">
            <Leaf className="h-3.5 w-3.5" /> Nursery · Est. 2018
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-5xl font-semibold leading-[1.05] text-background md:text-7xl">
            Grow something beautiful — from seed to harvest.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-background/85">
            Hand-raised plants, organic seeds and heritage tools. Delivered across Malaysia, with growing tips in every box.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/shop"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-background px-6 text-sm font-semibold text-foreground transition hover:bg-background/90"
            >
              Shop the nursery <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-background/40 px-6 text-sm font-semibold text-background transition hover:bg-background/10"
            >
              Our story
            </Link>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="border-b border-border/60 bg-card">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-4">
          {[
            { icon: Sprout, t: "Hand-raised", d: "Grown in our Selangor greenhouse." },
            { icon: Truck, t: "Safe delivery", d: "Plant-safe packaging, nationwide." },
            { icon: ShieldCheck, t: "30-day guarantee", d: "Healthy arrival, or we replace it." },
            { icon: Leaf, t: "Care included", d: "A care card with every plant." },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="flex items-start gap-4">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-base font-semibold">{t}</p>
                <p className="text-sm text-muted-foreground">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-accent">Browse</p>
            <h2 className="mt-2 font-display text-4xl font-semibold">Shop by category</h2>
          </div>
          <Link to="/shop" className="hidden text-sm font-medium text-primary hover:underline md:inline">
            View all →
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <Link
              key={c}
              to="/shop"
              search={{ category: c }}
              className="group flex aspect-square flex-col items-center justify-center rounded-2xl border border-border/60 bg-card p-4 text-center transition hover:bg-secondary"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full" style={{ background: "var(--gradient-leaf)" }}>
                <Leaf className="h-5 w-5 text-primary-foreground" />
              </span>
              <span className="mt-3 text-sm font-medium">{c}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-accent">This season</p>
            <h2 className="mt-2 font-display text-4xl font-semibold">Featured picks</h2>
          </div>
          <Link to="/shop" className="hidden text-sm font-medium text-primary hover:underline md:inline">
            All products →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* CTA banner */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="overflow-hidden rounded-3xl bg-primary px-8 py-14 text-primary-foreground md:px-16 md:py-20">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl font-semibold md:text-5xl">
              Start your kitchen garden this weekend.
            </h2>
            <p className="mt-4 text-primary-foreground/85">
              From seed to plate in 8 weeks. Get our starter bundle — seeds, compost, tools and a step-by-step guide.
            </p>
            <Link
              to="/shop"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
            >
              Build my bundle <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
