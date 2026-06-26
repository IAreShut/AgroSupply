import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — AgroSupply Nursery" },
      { name: "description", content: "Get in touch with the AgroSupply team. We reply within one business day." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      <header className="border-b border-border/60 pb-10">
        <p className="text-xs uppercase tracking-widest text-accent">Get in touch</p>
        <h1 className="mt-2 font-display text-5xl font-semibold">We'd love to hear from you</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Questions about a plant, an order, or wholesale? Send us a note — we reply within one business day.
        </p>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.5fr]">
        <aside className="space-y-6">
          {[
            { icon: MapPin, t: "Visit the nursery", d: "Lot 22, Jalan Hijau\nShah Alam, Selangor" },
            { icon: Mail, t: "Email", d: "hello@agrosupply.my" },
            { icon: Phone, t: "Phone", d: "+60 3 1234 5678" },
          ].map(({ icon: Icon, t, d }) => (
            <div key={t} className="flex gap-4 rounded-2xl border border-border/60 bg-card p-5">
              <span className="inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-lg font-semibold">{t}</p>
                <p className="whitespace-pre-line text-sm text-muted-foreground">{d}</p>
              </div>
            </div>
          ))}
          <div className="rounded-2xl bg-secondary p-5 text-sm">
            <p className="font-semibold">Opening hours</p>
            <p className="mt-1 text-muted-foreground">Tue – Sun · 9am – 6pm<br />Closed Mondays</p>
          </div>
        </aside>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
            toast.success("Message sent — we'll be in touch soon.");
            (e.target as HTMLFormElement).reset();
          }}
          className="rounded-3xl border border-border/60 bg-card p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Name" name="name" required />
            <Field label="Email" name="email" type="email" required />
          </div>
          <Field className="mt-5" label="Subject" name="subject" required />
          <label className="mt-5 block">
            <span className="text-sm font-medium">Message</span>
            <textarea
              name="message"
              rows={6}
              required
              className="mt-2 w-full rounded-2xl border border-input bg-background p-4 text-sm outline-none ring-ring focus:ring-2"
            />
          </label>
          <button
            type="submit"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            Send message
          </button>
          {sent && <p className="mt-4 text-sm text-primary">Thanks — we received your message.</p>}
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  className = "",
  ...rest
}: { label: string; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block ${className}`}>
      <span className="text-sm font-medium">{label}</span>
      <input
        {...rest}
        className="mt-2 h-11 w-full rounded-full border border-input bg-background px-4 text-sm outline-none ring-ring focus:ring-2"
      />
    </label>
  );
}
