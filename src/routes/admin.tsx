import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { LayoutDashboard, Package, LogOut, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

const AUTH_KEY = "greenharvest_admin_auth_v1";

// Prototype credentials — front-end demo only.
const ACCOUNTS: Record<string, { password: string; role: "Admin" | "Staff"; name: string }> = {
  admin: { password: "admin123", role: "Admin", name: "Alia (Admin)" },
  staff: { password: "staff123", role: "Staff", name: "Ravi (Staff)" },
};

interface Session { username: string; role: "Admin" | "Staff"; name: string }

export function readAdminSession(): Session | null {
  try {
    const raw = typeof window !== "undefined" ? localStorage.getItem(AUTH_KEY) : null;
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch { return null; }
}

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Management Console — AgroSupply" },
      { name: "description", content: "Admin and staff management console for AgroSupply nursery." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setSession(readAdminSession());
    setReady(true);
  }, []);

  if (!ready) return null;
  if (!session) return <Login onLogin={(s) => { localStorage.setItem(AUTH_KEY, JSON.stringify(s)); setSession(s); toast.success(`Welcome, ${s.name}`); }} />;

  const signOut = () => {
    localStorage.removeItem(AUTH_KEY);
    setSession(null);
    toast.message("Signed out");
  };

  const nav = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
    { to: "/admin/products", label: "Products", icon: Package, exact: false },
  ];

  return (
    <div className="mx-auto flex min-h-[calc(100vh-200px)] max-w-7xl gap-6 px-6 py-10">
      <aside className="hidden w-60 flex-shrink-0 md:block">
        <div className="rounded-2xl border border-border/60 bg-card p-4">
          <div className="flex items-center gap-2 border-b border-border/60 pb-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <div className="text-sm">
              <p className="font-semibold leading-tight">{session.name}</p>
              <p className="text-xs text-muted-foreground">{session.role}</p>
            </div>
          </div>
          <nav className="mt-3 flex flex-col gap-1">
            {nav.map((n) => {
              const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                    active ? "bg-primary text-primary-foreground" : "hover:bg-secondary text-foreground"
                  }`}
                >
                  <n.icon className="h-4 w-4" /> {n.label}
                </Link>
              );
            })}
          </nav>
          <button
            onClick={signOut}
            className="mt-3 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-secondary"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>
      <section className="min-w-0 flex-1">
        <Outlet />
      </section>
    </div>
  );
}

function Login({ onLogin }: { onLogin: (s: Session) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const acc = ACCOUNTS[username.trim().toLowerCase()];
    if (!acc || acc.password !== password) {
      setError("Invalid credentials. Try admin/admin123 or staff/staff123.");
      return;
    }
    onLogin({ username: username.trim().toLowerCase(), role: acc.role, name: acc.name });
  };

  return (
    <div className="mx-auto flex max-w-md flex-col px-6 py-20">
      <div className="rounded-3xl border border-border/60 bg-card p-8 shadow-[var(--shadow-soft)]">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <ShieldCheck className="h-6 w-6" />
        </span>
        <h1 className="mt-4 font-display text-3xl font-semibold">Management Console</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to manage the AgroSupply catalogue. Prototype demo — front-end only.
        </p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              className="mt-1 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              placeholder="admin or staff"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="mt-1 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Sign in
          </button>
        </form>
        <div className="mt-6 rounded-xl bg-secondary p-3 text-xs text-muted-foreground">
          <p><strong>Demo accounts:</strong></p>
          <p>Admin → <code>admin</code> / <code>admin123</code></p>
          <p>Staff → <code>staff</code> / <code>staff123</code></p>
        </div>
      </div>
    </div>
  );
}
