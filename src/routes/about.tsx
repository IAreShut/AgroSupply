import { createFileRoute } from "@tanstack/react-router";
import { Leaf, Sprout, Users, Award } from "lucide-react";
import hero from "@/assets/hero-nursery.jpg";
import team1 from "@/assets/team-1.png";
import team2 from "@/assets/team-2.png";
import team3 from "@/assets/team-3.png";


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
          At Agro Supply, we believe that agriculture is more than just growing plants—it is about cultivating a sustainable future. Founded with a passion for supporting farmers, gardeners, and plant enthusiasts, Agro Supply is committed to providing high-quality agricultural products at affordable prices.
          Our journey began with a simple mission: to make agricultural supplies easily accessible through a trusted online platform. Whether you are managing a commercial farm, operating a nursery, or growing plants at home, we understand the importance of having reliable products to achieve healthy and productive growth.
        </p>
        {/* <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          We grow without harsh chemicals, package without single-use plastic, and donate 1% of every sale
          to school gardening programmes across Selangor.
        </p> */}
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
            { name: "Muhammad Aqil Danial", role: "Co-founder · Horticulture", image: team1 },
            { name: "Muhammad Syahreza", role: "Co-founder · Operations", image: team2 },
            { name: "Muhammad Aiman", role: "Lead Grower", image: team3 },
          ].map((m) => (
            <div key={m.name} className="rounded-2xl border border-border/60 bg-card p-6">
              <img src={m.image} alt={m.name} className="h-16 w-16 rounded-full object-cover" />
              <p className="mt-4 font-display text-lg font-semibold">{m.name}</p>
              <p className="text-sm text-muted-foreground">{m.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
