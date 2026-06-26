import { createFileRoute } from "@tanstack/react-router";
import { Leaf, Sprout, Users, Award } from "lucide-react";
import hero from "@/assets/hero-nursery.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — AgroSupply Nursery" },
      { name: "description", content: "AgroSupply is a Malaysian plant nursery rooted in sustainable growing and community gardening." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div>
      <section className="relative isolate overflow-hidden">
        <img src={hero} alt="AgroSupply greenhouse" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-hero)" }} />
        <div className="mx-auto max-w-5xl px-6 py-32 text-background">
          <p className="text-xs uppercase tracking-widest">Our story</p>
          <h1 className="mt-3 font-display text-5xl font-semibold md:text-6xl">Rooted in care, growing with community.</h1>
          <p className="mt-6 max-w-2xl text-lg text-background/85">
            From a single 200m² greenhouse in Shah Alam to a thriving nursery serving thousands of plant lovers across Malaysia.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="font-display text-3xl font-semibold">Why AgroSupply</h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          AgroSupply began in 2018 as a small family project — three agriculture students wanting to make
          home growing accessible to everyone. Today, our team of horticulturists, designers and growers
          ships plants, seeds and tools to homes and small farms nationwide, paired with the knowledge to
          help every customer succeed.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          We grow without harsh chemicals, package without single-use plastic, and donate 1% of every sale
          to school gardening programmes across Selangor.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { icon: Sprout, n: "12,500+", l: "Plants delivered" },
            { icon: Users, n: "3,800", l: "Happy gardeners" },
            { icon: Leaf, n: "1%", l: "To school gardens" },
            { icon: Award, n: "4.9★", l: "Customer rating" },
          ].map(({ icon: Icon, n, l }) => (
            <div key={l} className="rounded-2xl border border-border/60 bg-card p-6 text-center">
              <Icon className="mx-auto h-6 w-6 text-primary" />
              <p className="mt-3 font-display text-3xl font-semibold">{n}</p>
              <p className="text-sm text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24">
        <h2 className="font-display text-3xl font-semibold">The team</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            { name: "Aisyah Rahman", role: "Co-founder · Horticulture" },
            { name: "Daniel Tan", role: "Co-founder · Operations" },
            { name: "Nurul Hidayah", role: "Lead Grower" },
          ].map((m) => (
            <div key={m.name} className="rounded-2xl border border-border/60 bg-card p-6">
              <div className="h-16 w-16 rounded-full" style={{ background: "var(--gradient-leaf)" }} />
              <p className="mt-4 font-display text-lg font-semibold">{m.name}</p>
              <p className="text-sm text-muted-foreground">{m.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
