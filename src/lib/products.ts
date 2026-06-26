import monstera from "@/assets/p-monstera.jpg";
import snake from "@/assets/p-snake.jpg";
import seeds from "@/assets/p-seeds.jpg";
import fertilizer from "@/assets/p-fertilizer.jpg";
import tools from "@/assets/p-tools.jpg";
import tomato from "@/assets/p-tomato.jpg";
import fiddle from "@/assets/p-fiddle.jpg";
import pots from "@/assets/p-pots.jpg";

export type Category = "Indoor Plants" | "Outdoor Plants" | "Seeds" | "Fertilizers" | "Tools" | "Pots";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  short: string;
  description: string;
  care?: string;
  badge?: string;
}

export const products: Product[] = [
  {
    id: "monstera-deliciosa",
    name: "Monstera Deliciosa",
    price: 49.0,
    category: "Indoor Plants",
    image: monstera,
    short: "The iconic split-leaf beauty for any bright corner.",
    description:
      "A lush tropical climber known for its dramatic perforated leaves. Thrives in bright indirect light and brings instant warmth to any living space.",
    care: "Bright indirect light · Water weekly · 18–27°C",
    badge: "Bestseller",
  },
  {
    id: "snake-plant",
    name: "Snake Plant",
    price: 29.0,
    category: "Indoor Plants",
    image: snake,
    short: "Nearly indestructible air-purifier for beginners.",
    description:
      "Sansevieria tolerates neglect, low light, and irregular watering — perfect for first-time plant parents and busy households.",
    care: "Low to bright light · Water every 2–3 weeks",
  },
  {
    id: "fiddle-leaf-fig",
    name: "Fiddle Leaf Fig",
    price: 89.0,
    category: "Indoor Plants",
    image: fiddle,
    short: "Statement tree with sculptural violin-shaped leaves.",
    description:
      "Ficus lyrata is the designer's favourite — a tall, architectural plant that turns any room into a botanical sanctuary.",
    care: "Bright indirect light · Water when topsoil dries",
    badge: "New",
  },
  {
    id: "tomato-seedlings",
    name: "Heirloom Tomato Seedlings",
    price: 12.5,
    category: "Outdoor Plants",
    image: tomato,
    short: "Ready-to-transplant tray of 12 vigorous seedlings.",
    description:
      "Hand-raised heirloom cherry tomato seedlings, hardened off and ready for your garden bed or balcony container.",
    care: "Full sun · Water deeply · Stake when 30cm",
  },
  {
    id: "organic-seed-pack",
    name: "Organic Vegetable Seed Pack",
    price: 18.0,
    category: "Seeds",
    image: seeds,
    short: "8 packets of certified-organic kitchen-garden staples.",
    description:
      "A curated bundle of organic, non-GMO seeds: tomato, basil, lettuce, carrot, cucumber, chilli, spinach and coriander.",
    badge: "Organic",
  },
  {
    id: "compost-fertilizer",
    name: "Premium Organic Compost",
    price: 22.0,
    category: "Fertilizers",
    image: fertilizer,
    short: "Slow-release, microbe-rich compost. 5kg bag.",
    description:
      "Locally produced compost blended with worm castings and seaweed for a steady release of nutrients across the season.",
  },
  {
    id: "garden-tool-set",
    name: "Heritage Garden Tool Set",
    price: 65.0,
    category: "Tools",
    image: tools,
    short: "Forged-steel trowel, pruners and gloves.",
    description:
      "A three-piece set built to outlast every season — drop-forged carbon steel with oiled ash handles and leather-palm gloves.",
  },
  {
    id: "terracotta-pots",
    name: "Terracotta Pot Set",
    price: 34.0,
    category: "Pots",
    image: pots,
    short: "Set of 5 hand-thrown clay pots in mixed sizes.",
    description:
      "Breathable, frost-fired terracotta in nesting sizes (8–18cm). Each pot includes a drainage hole and matching saucer.",
  },
];

export const categories: Category[] = [
  "Indoor Plants",
  "Outdoor Plants",
  "Seeds",
  "Fertilizers",
  "Tools",
  "Pots",
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
