import cableUsbLightning from "@assets/UEFUE3661_1776460456493.JPG";
import cableUsbUsbc from "@assets/EPCEE8267_1776460456492.JPG";

export type DeviceType = "phone" | "accessory";

export type Repair = {
  type: string;
  summary: string;
  priceLabel: string;
  duration: string;
};

export type ModelDef = {
  id: string;
  name: string;
  type: DeviceType;
  repairs: Repair[];
};

export type BrandDef = {
  id: string;
  name: string;
  slug: string;
  models: ModelDef[];
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price?: string;
  image?: string;
  iconName?: "zap" | "cable";
};

export type AccessoryCategoryDef =
  | { slug: string; name: string; iconName: "watch" | "airpods" | "zap" | "cable"; kind: "models"; models: ModelDef[] }
  | { slug: string; name: string; iconName: "watch" | "airpods" | "zap" | "cable"; kind: "products"; products: Product[] };

type RepairDef = { type: string; summary: string; duration: string };
type PriceMap = Partial<Record<string, string>>;

// ── Repair definitions, scoped per device type ──────────────────────────────
const PHONE_REPAIRS: RepairDef[] = [
  { type: "Écran", summary: "Écran fissuré ou tactile défectueux.", duration: "30–60 min" },
  { type: "Batterie", summary: "Remplacement batterie pour retrouver une bonne autonomie.", duration: "20–30 min" },
  { type: "Caméra", summary: "Réparation ou remplacement du module caméra.", duration: "30–45 min" },
  { type: "Connecteur de charge", summary: "Réparation du port de charge et des problèmes de connexion.", duration: "30–45 min" },
  { type: "Vitre arrière", summary: "Remplacement de la vitre arrière endommagée.", duration: "30–45 min" },
  { type: "Diagnostic", summary: "Analyse rapide de la panne avant intervention.", duration: "15–20 min" },
];

const WATCH_REPAIRS: RepairDef[] = [
  { type: "Batterie", summary: "Remplacement batterie pour retrouver une bonne autonomie.", duration: "30–45 min" },
  { type: "Diagnostic", summary: "Analyse complète de la panne avant intervention.", duration: "15–20 min" },
  { type: "Réinitialisation", summary: "Remise à zéro complète de la montre et reconfiguration.", duration: "15–30 min" },
];

const AIRPODS_REPAIRS: RepairDef[] = [
  { type: "Batterie", summary: "Autonomie réduite des écouteurs ou du boîtier.", duration: "30–45 min" },
  { type: "Diagnostic", summary: "Analyse complète de la panne avant intervention.", duration: "15–20 min" },
];

function makeRepairs(defs: RepairDef[], prices: PriceMap): Repair[] {
  return defs.map((def) => ({
    ...def,
    priceLabel: prices[def.type] ?? "Sur commande",
  }));
}

function mkId(prefix: string, name: string): string {
  return `${prefix}-${name
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
}

// ── Phones ──────────────────────────────────────────────────────────────────
function iphone(name: string, screen: string, battery: string, camera = "Sur commande"): ModelDef {
  return {
    id: mkId("iphone", name),
    name: `iPhone ${name}`,
    type: "phone",
    repairs: makeRepairs(PHONE_REPAIRS, {
      "Diagnostic": "Gratuit",
      "Écran": screen,
      "Batterie": battery,
      "Caméra": camera,
      "Connecteur de charge": "35€",
      "Vitre arrière": "Sur commande",
    }),
  };
}

type SamsungTier = "budget" | "mid" | "high" | "flagship";

const SAMSUNG_TIER_PRICES: Record<SamsungTier, PriceMap> = {
  budget: { "Diagnostic": "Gratuit" , "Écran": "39€", "Batterie": "25€", "Caméra": "35€", "Connecteur de charge": "29€", "Vitre arrière": "Sur commande"},
  mid:    { "Diagnostic": "Gratuit", "Écran": "49€", "Batterie": "29€", "Caméra": "39€", "Connecteur de charge": "30€", "Vitre arrière": "Sur commande"},
  high:   { "Diagnostic": "Gratuit", "Écran": "59€", "Batterie": "35€", "Caméra": "45€", "Connecteur de charge": "35€", "Vitre arrière": "Sur commande"},
  flagship: { "Diagnostic": "Gratuit", "Écran": "Sur commande", "Batterie": "39€", "Caméra": "49€", "Connecteur de charge": "35€", "Vitre arrière": "Sur commande",},
};

function samsung(name: string, tier: SamsungTier, screen?: string): ModelDef {
  return {
    id: mkId("samsung", name),
    name,
    type: "phone",
    repairs: makeRepairs(PHONE_REPAIRS, {
      ...SAMSUNG_TIER_PRICES[tier],
      ...(screen ? { "Écran": screen } : {}),
    }),
  };
}

const IPHONE_MODELS: ModelDef[] = [
  iphone("7 / 8", "29,90€", "29€", "39€"), iphone("7+ / 8+", "39,90€", "29€", "39€"),
  iphone("X", "44,90€", "29€", "45€"), iphone("11", "49,90€", "35€", "45€"),
  iphone("11 Pro", "54,90€", "35€", "49€"), iphone("11 Pro Max", "58,90€", "35€", "49€"),
  iphone("12", "59,90€", "35€", "49€"), iphone("12 mini", "59,90€", "35€", "45€"),
  iphone("12 Pro", "59,90€", "35€", "55€"), iphone("12 Pro Max", "79,90€", "35€", "59€"),
  iphone("13", "69,90€", "39€", "49€"), iphone("13 mini", "69,90€", "39€", "45€"),
  iphone("13 Pro", "79,90€", "39€", "55€"), iphone("13 Pro Max", "89,90€", "39€", "59€"),
  iphone("14", "79,90€", "45€", "55€"), iphone("14+", "79,90€", "45€", "55€"),
  iphone("14 Pro", "89,90€", "45€", "65€"), iphone("14 Pro Max", "99,90€", "45€", "65€"),
  iphone("15", "89,90€", "49", "Sur commande"), iphone("15+", "89,90€", "49", "Sur commande"),
  iphone("15 Pro", "99,90€", "49", "Sur commande"), iphone("15 Pro Max", "109,90€", "49", "Sur commande"),
  iphone("16", "129,90€", "Sur commande"), iphone("16e", "109,90€", "Sur commande"),
  iphone("16+", "Sur commande", "Sur commande"), iphone("16 Pro Max", "Sur commande", "Sur commande"),
  iphone("17", "Sur commande", "Sur commande"), iphone("17 Air", "Sur commande", "Sur commande"),
  iphone("17 Pro Max", "Sur commande", "Sur commande"),
];

const SAMSUNG_MODELS: ModelDef[] = [
    samsung("Samsung A10", "budget", "49,90€"),
    samsung("Samsung A11", "budget", "49,90€"),
    samsung("Samsung A12", "budget", "49,90€"),
    samsung("Samsung A13", "budget", "49,90€"),
    samsung("Samsung A14", "budget", "49,90€"),
    samsung("Samsung A15", "budget", "49,90€"),
    samsung("Samsung A16", "budget", "49,90€"),
    samsung("Samsung A17", "budget", "59,90€"),
    samsung("Samsung A20 / A20s / A20e", "budget", "49,90€"),
    samsung("Samsung A21s", "budget", "49,90€"),
    samsung("Samsung A22 4G / A22 5G", "mid", "59,90€"),
    samsung("Samsung A23", "mid", "59,90€"),
    samsung("Samsung A24", "mid", "59,90€"),
    samsung("Samsung A25", "mid", "59,90€"),
    samsung("Samsung A26", "mid", "59,90€"),
    samsung("Samsung A30 / M30", "mid", "59,90€"),
    samsung("Samsung A31", "mid", "59,90€"),
    samsung("Samsung A32 4G / A32 5G", "mid", "59,90€"),
    samsung("Samsung A33", "mid", "59,90€"),
    samsung("Samsung A34", "mid", "59,90€"),
    samsung("Samsung A35", "mid", "59,90€"),
    samsung("Samsung A36", "mid", "59,90€"),
    samsung("Samsung A40", "mid", "49,90€"),
    samsung("Samsung A41", "mid", "59,90€"),
    samsung("Samsung A42 5G", "mid", "59,90€"),
    samsung("Samsung A50", "mid", "59,90€"),
    samsung("Samsung A51 4G / 5G", "mid", "59,90€"),
    samsung("Samsung A52", "mid", "49,90€"),
    samsung("Samsung A53", "mid", "69,90€"),
    samsung("Samsung A54", "mid", "69,90€"),
    samsung("Samsung A55", "mid", "79,90€"),
    samsung("Samsung A56", "high", "79,90€"),
    samsung("Samsung A60", "high", "79,90€"),
    samsung("Samsung A70", "high", "79,90€"),
    samsung("Samsung A71", "high", "79,90€"),
    samsung("Samsung A72", "high", "79,90€"),
    samsung("Samsung A73", "high", "79,90€"),
    samsung("Samsung A80", "high", "89,90€"),
    samsung("Samsung S8 / S9", "high", "Sur commande"),
    samsung("Samsung S10 / S10e / S10+ / S10 5G", "high", "Sur commande"),
    samsung("Samsung S20 / S20 FE / S20+ / S20 Ultra", "flagship", "Sur commande"),
    samsung("Samsung S21 / S21 FE / S21+ / S21 Ultra", "flagship", "Sur commande"),
    samsung("Samsung S22 / S22+ / S22 Ultra", "flagship", "Sur commande"),
    samsung("Samsung S23 / S23+ / S23 FE / S23 Ultra", "flagship", "Sur commande"),
    samsung("Samsung S24 / S24+ / S24 FE / S24 Ultra", "flagship", "Sur commande"),
    samsung("Samsung S25 / S25+ / S25 FE / S25 Ultra", "flagship", "Sur commande"),
  ];

// ── Accessories ─────────────────────────────────────────────────────────────
const WATCH_PRICES: PriceMap = { "Batterie": "Sur commande", "Diagnostic": "Gratuit", "Réinitialisation": "Sur commande" };
const AIRPODS_PRICES: PriceMap = { "Batterie": "Sur commande", "Diagnostic": "Gratuit" };

function watchModel(id: string, name: string): ModelDef {
  return { id, name, type: "accessory", repairs: makeRepairs(WATCH_REPAIRS, WATCH_PRICES) };
}
function airpodsModel(id: string, name: string): ModelDef {
  return { id, name, type: "accessory", repairs: makeRepairs(AIRPODS_REPAIRS, AIRPODS_PRICES) };
}

const APPLE_WATCH_MODELS: ModelDef[] = [watchModel("apple-watch", "Apple Watch")];
const GALAXY_WATCH_MODELS: ModelDef[] = [watchModel("galaxy-watch", "Samsung Galaxy Watch")];
const AIRPODS_MODELS: ModelDef[] = [
  airpodsModel("airpods-1", "AirPods 1"),
  airpodsModel("airpods-3", "AirPods 3"),
  airpodsModel("airpods-4", "AirPods 4"),
  airpodsModel("airpods-pro", "AirPods Pro"),
  airpodsModel("airpods-pro-3", "AirPods Pro 3"),
];

const CHARGER_PRODUCTS: Product[] = [
  { id: "ch-20w-iphone", name: "Chargeur rapide 20W USB-C vers iPhone", description: "Charge rapide 20W pour iPhone, connectique USB-C vers Lightning.", iconName: "zap" },
  { id: "ch-20w-cc",     name: "Chargeur 20W USB-C vers USB-C",         description: "Chargeur 20W universel USB-C vers USB-C.", iconName: "zap" },
  { id: "ch-30w-cc",     name: "Chargeur rapide 30W USB-C vers USB-C",  description: "Charge rapide 30W USB-C vers USB-C, idéale pour Android et iPad.", iconName: "zap" },
  { id: "ch-30w-iphone", name: "Chargeur rapide 30W USB-C vers iPhone", description: "Charge rapide 30W pour iPhone, connectique USB-C vers Lightning.", iconName: "zap" },
];

const CABLE_PRODUCTS: Product[] = [
  { id: "ca-light", name: "Câble USB vers Lightning", description: "Câble robuste pour iPhone et accessoires Apple.", price: "5€", image: cableUsbLightning },
  { id: "ca-usbc",  name: "Câble USB vers USB-C",     description: "Câble universel USB vers USB-C, compatible Android, AirPods et accessoires.", price: "5€", image: cableUsbUsbc },
];

export const ACCESSORY_CATEGORIES: AccessoryCategoryDef[] = [
  { slug: "apple-watch",  name: "Apple Watch",          iconName: "watch",   kind: "models",   models: APPLE_WATCH_MODELS },
  { slug: "galaxy-watch", name: "Samsung Galaxy Watch", iconName: "watch",   kind: "models",   models: GALAXY_WATCH_MODELS },
  { slug: "airpods",      name: "AirPods",              iconName: "airpods", kind: "models",   models: AIRPODS_MODELS },
  { slug: "chargeurs",    name: "Chargeurs",            iconName: "zap",     kind: "products", products: CHARGER_PRODUCTS },
  { slug: "cables",       name: "Câbles",               iconName: "cable",   kind: "products", products: CABLE_PRODUCTS },
];

export const PHONE_BRANDS: BrandDef[] = [
  { id: "iphone",  name: "iPhone",  slug: "iphone",  models: IPHONE_MODELS },
  { id: "samsung", name: "Samsung", slug: "samsung", models: SAMSUNG_MODELS },
];

// ── WhatsApp helpers ────────────────────────────────────────────────────────
export function whatsAppLink(brand: string, model: string, repair: string): string {
  const subject = brand ? `${brand} ${model}` : model;
  const text = `Bonjour, je souhaite réserver une réparation pour un ${subject} — ${repair}.`;
  return `https://wa.me/33605557812?text=${encodeURIComponent(text)}`;
}

export function whatsAppQuote(brand: string): string {
  const text = `Bonjour, je souhaite obtenir un devis pour un téléphone ${brand}.`;
  return `https://wa.me/33605557812?text=${encodeURIComponent(text)}`;
}

export function whatsAppProduct(productName: string, price?: string): string {
  const suffix = price ? ` (${price})` : "";
  const text = `Bonjour, je suis intéressé(e) par : ${productName}${suffix}.`;
  return `https://wa.me/33605557812?text=${encodeURIComponent(text)}`;
}

// ── Search (global, includes phones, accessories, products) ────────────────
export type SearchHit =
  | { kind: "phone-model";       brand: BrandDef;             model: ModelDef }
  | { kind: "accessory-model";   category: AccessoryCategoryDef; model: ModelDef }
  | { kind: "accessory-product"; category: AccessoryCategoryDef; product: Product };

export function searchAllItems(query: string): SearchHit[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const hits: SearchHit[] = [];

  for (const brand of PHONE_BRANDS) {
    for (const model of brand.models) {
      if (model.name.toLowerCase().includes(q) || brand.name.toLowerCase().includes(q)) {
        hits.push({ kind: "phone-model", brand, model });
      }
    }
  }

  for (const cat of ACCESSORY_CATEGORIES) {
    if (cat.kind === "models") {
      for (const model of cat.models) {
        const haystack = `${model.name} ${cat.name} accessoires`.toLowerCase();
        if (haystack.includes(q)) {
          hits.push({ kind: "accessory-model", category: cat, model });
        }
      }
    } else {
      for (const product of cat.products) {
        const haystack = `${product.name} ${cat.name} accessoires`.toLowerCase();
        if (haystack.includes(q)) {
          hits.push({ kind: "accessory-product", category: cat, product });
        }
      }
    }
  }

  return hits;
}
