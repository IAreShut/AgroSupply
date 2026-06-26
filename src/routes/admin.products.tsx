import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Plus, Pencil, Trash2, Search, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { useProducts } from "@/lib/products-store";
import { categories, type Category, type Product } from "@/lib/products";
import { formatMYR } from "@/lib/cart";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/admin/products")({
  component: AdminProducts,
});

type FormState = {
  id: string;
  name: string;
  price: string;
  category: Category;
  image: string;
  short: string;
  description: string;
  care: string;
  badge: string;
};

const emptyForm: FormState = {
  id: "",
  name: "",
  price: "",
  category: "Indoor Plants",
  image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800",
  short: "",
  description: "",
  care: "",
  badge: "",
};

function AdminProducts() {
  const { products, create, update, remove, resetToSeed } = useProducts();
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.id.toLowerCase().includes(q),
    );
  }, [products, query]);

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-accent">Catalogue</p>
          <h1 className="mt-2 font-display text-4xl font-semibold">Products</h1>
          <p className="mt-2 text-sm text-muted-foreground">Add, edit or remove items in the AgroSupply shop.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (confirm("Reset all changes and restore the original catalogue?")) {
                resetToSeed();
                toast.success("Catalogue restored to defaults");
              }
            }}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-input bg-background px-4 text-sm font-medium hover:bg-secondary"
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </button>
          <button
            onClick={() => setCreating(true)}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" /> New product
          </button>
        </div>
      </header>

      <div className="mt-6 relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, category or id…"
          className="h-11 w-full rounded-full border border-input bg-background pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border/60 bg-card">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Item</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-12 text-center text-muted-foreground">No products found.</td></tr>
            )}
            {filtered.map((p) => (
              <tr key={p.id} className="border-t border-border/60">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="h-12 w-12 rounded-lg object-cover" />
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">{p.category}</td>
                <td className="px-4 py-3 font-medium">{formatMYR(p.price)}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditing(p)}
                      className="inline-flex h-8 items-center gap-1.5 rounded-full bg-secondary px-3 text-xs font-medium hover:bg-secondary/70"
                    >
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => setDeleting(p)}
                      className="inline-flex h-8 items-center gap-1.5 rounded-full bg-destructive/10 px-3 text-xs font-medium text-destructive hover:bg-destructive/20"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create */}
      <ProductFormDialog
        open={creating}
        onOpenChange={setCreating}
        title="New product"
        description="Add a new item to your nursery catalogue."
        initial={emptyForm}
        submitLabel="Create product"
        onSubmit={(form) => {
          if (!form.name.trim()) { toast.error("Name is required"); return false; }
          create({
            id: form.id || undefined,
            name: form.name,
            price: Number(form.price) || 0,
            category: form.category,
            image: form.image,
            short: form.short,
            description: form.description,
            care: form.care || undefined,
            badge: form.badge || undefined,
          });
          toast.success(`Created "${form.name}"`);
          return true;
        }}
      />

      {/* Edit */}
      <ProductFormDialog
        open={!!editing}
        onOpenChange={(v) => !v && setEditing(null)}
        title={`Edit · ${editing?.name ?? ""}`}
        description="Update the product details. Changes appear immediately on the storefront."
        initial={editing ? {
          id: editing.id,
          name: editing.name,
          price: String(editing.price),
          category: editing.category,
          image: editing.image,
          short: editing.short,
          description: editing.description,
          care: editing.care ?? "",
          badge: editing.badge ?? "",
        } : emptyForm}
        lockId
        submitLabel="Save changes"
        onSubmit={(form) => {
          if (!editing) return true;
          update(editing.id, {
            name: form.name,
            price: Number(form.price) || 0,
            category: form.category,
            image: form.image,
            short: form.short,
            description: form.description,
            care: form.care || undefined,
            badge: form.badge || undefined,
          });
          toast.success("Saved changes");
          return true;
        }}
      />

      {/* Delete confirm */}
      <Dialog open={!!deleting} onOpenChange={(v) => !v && setDeleting(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete "{deleting?.name}"?</DialogTitle>
            <DialogDescription>
              This removes the product from the storefront. You can restore defaults with the Reset button.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              onClick={() => setDeleting(null)}
              className="inline-flex h-10 items-center rounded-full border border-input bg-background px-4 text-sm font-medium hover:bg-secondary"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (!deleting) return;
                remove(deleting.id);
                toast.success(`Deleted "${deleting.name}"`);
                setDeleting(null);
              }}
              className="inline-flex h-10 items-center rounded-full bg-destructive px-4 text-sm font-semibold text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProductFormDialog({
  open, onOpenChange, title, description, initial, submitLabel, onSubmit, lockId,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  description: string;
  initial: FormState;
  submitLabel: string;
  lockId?: boolean;
  onSubmit: (form: FormState) => boolean;
}) {
  const [form, setForm] = useState<FormState>(initial);

  useEffect(() => setForm(initial), [open, initial.id]);

  const handle = (e: FormEvent) => {
    e.preventDefault();
    if (onSubmit(form)) onOpenChange(false);
  };

  const field = (k: keyof FormState) => ({
    value: form[k],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value })),
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handle} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name *">
              <input {...field("name")} required className={inputCls} />
            </Field>
            <Field label="ID (slug)">
              <input
                {...field("id")}
                disabled={lockId}
                placeholder="auto-generated"
                className={`${inputCls} disabled:opacity-60`}
              />
            </Field>
            <Field label="Price (MYR) *">
              <input type="number" min="0" step="0.01" {...field("price")} required className={inputCls} />
            </Field>
            <Field label="Category">
              <select {...field("category")} className={inputCls}>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Image URL" className="sm:col-span-2">
              <input {...field("image")} className={inputCls} placeholder="https://…" />
              {form.image && (
                <img src={form.image} alt="" className="mt-2 h-24 w-24 rounded-lg object-cover" />
              )}
            </Field>
            <Field label="Badge (optional)">
              <input {...field("badge")} className={inputCls} placeholder="New / Bestseller" />
            </Field>
            <Field label="Care info (optional)">
              <input {...field("care")} className={inputCls} placeholder="Bright light · Water weekly" />
            </Field>
            <Field label="Short tagline *" className="sm:col-span-2">
              <input {...field("short")} required className={inputCls} maxLength={160} />
            </Field>
            <Field label="Full description *" className="sm:col-span-2">
              <textarea {...field("description")} required rows={4} className={`${inputCls} h-auto py-2 resize-y`} />
            </Field>
          </div>
          <DialogFooter>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex h-10 items-center rounded-full border border-input bg-background px-4 text-sm font-medium hover:bg-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex h-10 items-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              {submitLabel}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

const inputCls =
  "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring";

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
