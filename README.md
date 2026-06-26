# 🌿 AgroSupply — Plant Nursery & Garden Supplies

> A modern e-commerce web application for a Malaysian plant nursery, built with React 19, TanStack Start, and Tailwind CSS v4.

AgroSupply is a full-featured, server-side rendered storefront for browsing and purchasing indoor plants, outdoor seedlings, organic seeds, fertilizers, gardening tools and pots — complete with a shopping cart, admin management console, and a beautifully crafted earthy design system.

**FPA405 Group Project**

---

## ✨ Features

### Storefront

- **Homepage** — Hero banner, value propositions, category browsing and featured product picks.
- **Shop** — Full product catalogue with category filters, keyword search and sort (price low/high).
- **Product Detail** — Individual product pages with descriptions, care instructions and add-to-cart.
- **Shopping Cart** — Persistent cart (localStorage), quantity controls, order summary with shipping logic (free above RM 150) and demo checkout flow.
- **About** — Company story, team profiles and key stats (12,500+ plants delivered, 4.9★ rating).
- **Contact** — Contact form with address, email, phone and opening hours.

### Admin Console (`/admin`)

- **Role-based login** — Two demo accounts (`admin` / `staff`) with front-end session management.
- **Dashboard** — Catalogue snapshot with total products, categories and catalogue value.
- **Product Management** — Full CRUD: create, edit and delete products from the catalogue. Changes reflect instantly on the storefront.

### Technical Highlights

- **Server-Side Rendering** via TanStack Start + Nitro.
- **File-based routing** powered by TanStack Router with type-safe route definitions.
- **Responsive design** — Fully responsive across mobile, tablet and desktop.
- **Dark mode support** — Complete dark theme via CSS custom properties.
- **SEO-ready** — Per-page meta tags, Open Graph properties, `sitemap.xml` generation and `robots.txt`.
- **Cart persistence** — Shopping cart state saved to `localStorage` and survives page reloads.
- **Product store** — Admin product changes (create/edit/delete) persisted to `localStorage` with seed data overlay pattern.
- **MYR currency** — Prices formatted in Malaysian Ringgit (RM).

---

## 🛠 Tech Stack

| Layer        | Technology                                                          |
| ------------ | ------------------------------------------------------------------- |
| Framework    | [React 19](https://react.dev) + [TanStack Start](https://tanstack.com/start) |
| Routing      | [TanStack Router](https://tanstack.com/router) (file-based)        |
| Server       | [Nitro](https://nitro.unjs.io) (SSR / deployment target)           |
| Styling      | [Tailwind CSS v4](https://tailwindcss.com) + custom CSS properties  |
| Typography   | [Fraunces](https://fonts.google.com/specimen/Fraunces) (display) + [Inter](https://fonts.google.com/specimen/Inter) (body) |
| Icons        | [Lucide React](https://lucide.dev)                                  |
| UI Primitives| [Radix UI](https://www.radix-ui.com) + [shadcn/ui](https://ui.shadcn.com) |
| Forms        | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) |
| State        | React Context + `localStorage` persistence                         |
| Charts       | [Recharts](https://recharts.org)                                    |
| Notifications| [Sonner](https://sonner.emilkowal.dev)                              |
| Build Tool   | [Vite 8](https://vite.dev)                                          |
| Package Mgr  | [Bun](https://bun.sh)                                               |
| Platform     | [Lovable](https://lovable.dev)                                      |

---

## 📁 Project Structure

```
AgroSupply/
├── public/
│   └── robots.txt
├── src/
│   ├── assets/              # Images: hero, product photos, logo
│   ├── components/
│   │   ├── product-card.tsx  # Reusable product card component
│   │   ├── site-layout.tsx   # Header, footer and page shell
│   │   └── ui/              # shadcn/ui primitives (Button, Dialog, etc.)
│   ├── hooks/
│   │   └── use-mobile.tsx   # Responsive breakpoint hook
│   ├── lib/
│   │   ├── cart.tsx          # Cart context provider + useCart hook
│   │   ├── products.ts      # Seed product data + types
│   │   ├── products-store.tsx # Mutable product store (CRUD via Context)
│   │   └── utils.ts         # Utility helpers (cn)
│   ├── routes/
│   │   ├── __root.tsx        # Root layout (providers, head, error boundaries)
│   │   ├── index.tsx         # Homepage
│   │   ├── shop.tsx          # Shop catalogue page
│   │   ├── product.$id.tsx   # Product detail (dynamic route)
│   │   ├── cart.tsx          # Shopping cart page
│   │   ├── about.tsx         # About page
│   │   ├── contact.tsx       # Contact page
│   │   ├── admin.tsx         # Admin layout + login gate
│   │   ├── admin.index.tsx   # Admin dashboard
│   │   ├── admin.products.tsx # Admin product CRUD
│   │   └── sitemap[.]xml.ts # Generated sitemap
│   ├── router.tsx            # Router configuration
│   ├── server.ts             # SSR entry point
│   ├── start.ts              # TanStack Start entry
│   └── styles.css            # Global styles + design tokens
├── package.json
├── vite.config.ts
├── tsconfig.json
└── components.json           # shadcn/ui configuration
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) ≥ 18 (or [Bun](https://bun.sh) ≥ 1.0)

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/AgroSupply.git
cd AgroSupply

# Install dependencies
bun install
# or: npm install
```

### Development

```bash
bun run dev
# or: npm run dev
```

The app will be available at **http://localhost:3000** (or the port shown in the terminal).

### Build for Production

```bash
bun run build
bun run preview
```

---

## 🔐 Demo Admin Accounts

The admin console is accessible at `/admin`. Use one of the following demo credentials:

| Role  | Username | Password   |
| ----- | -------- | ---------- |
| Admin | `admin`  | `admin123` |
| Staff | `staff`  | `staff123` |

> **Note:** Authentication is front-end only (localStorage-based) and intended for prototype demonstration purposes.

---

## 🎨 Design System

AgroSupply uses a custom earthy colour palette built with **OKLCH** colour values:

| Token       | Description                      |
| ----------- | -------------------------------- |
| `--primary` | Deep forest green (#2D5F3A)      |
| `--accent`  | Warm terracotta clay             |
| `--cream`   | Soft warm cream background       |
| `--leaf`    | Vibrant leaf green               |
| `--bark`    | Dark wood brown                  |
| `--clay`    | Earthy terracotta                |

Typography pairs **Fraunces** (a variable optical-size serif) for headings with **Inter** for body text, creating a natural, premium feel.

---

## 📦 Product Categories

The nursery catalogue includes six categories:

1. 🪴 **Indoor Plants** — Monstera, Snake Plant, Fiddle Leaf Fig
2. 🌱 **Outdoor Plants** — Heirloom Tomato Seedlings
3. 🌾 **Seeds** — Organic Vegetable Seed Pack
4. 🧪 **Fertilizers** — Premium Organic Compost
5. 🔧 **Tools** — Heritage Garden Tool Set
6. 🏺 **Pots** — Terracotta Pot Set

---

## 📄 License

This project was developed as part of the **FPA405** course. All rights reserved.

---

<p align="center">
  <strong>AgroSupply</strong> · A modern nursery for plant lovers, growers and gardeners.<br>
  Rooted in care since 2018. 🌱
</p>
