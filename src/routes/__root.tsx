import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { CartProvider } from "@/lib/cart";
import { ProductsProvider } from "@/lib/products-store";
import { SiteLayout } from "@/components/site-layout";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <h1 className="font-display text-7xl font-semibold text-primary">404</h1>
        <p className="mt-4 text-lg text-muted-foreground">That page seems to have wandered off into the garden.</p>
        <a href="/" className="mt-8 inline-flex h-12 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground">Go home</a>
      </div>
    </SiteLayout>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <SiteLayout>
      <div className="mx-auto max-w-xl px-6 py-32 text-center">
        <h1 className="font-display text-4xl font-semibold">Something went wrong</h1>
        <p className="mt-3 text-muted-foreground">Try again or head back to the home page.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button onClick={() => { router.invalidate(); reset(); }} className="h-11 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground">Try again</button>
          <a href="/" className="h-11 rounded-full border border-input px-6 text-sm font-semibold leading-[44px]">Go home</a>
        </div>
      </div>
    </SiteLayout>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AgroSupply — Plant Nursery & Garden Supplies" },
      { name: "description", content: "Hand-raised plants, organic seeds and heritage gardening tools — delivered across Malaysia." },
      { name: "author", content: "AgroSupply" },
      { property: "og:title", content: "AgroSupply — Plant Nursery" },
      { property: "og:description", content: "Premium plants, seeds and garden tools." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ProductsProvider>
        <CartProvider>
          <SiteLayout>
            <Outlet />
          </SiteLayout>
          <Toaster richColors position="top-right" />
        </CartProvider>
      </ProductsProvider>
    </QueryClientProvider>
  );
}
