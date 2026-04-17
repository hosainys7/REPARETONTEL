export type Repair = {
  type: string;
  summary: string;
  priceLabel: string;
  duration: string;
};

export type ModelDef = {
  id: string;
  name: string;
  repairs: Repair[];
};

export type BrandDef = {
  id: string;
  name: string;
  slug: string;
  models: ModelDef[];
};

const REPAIR_DEFS: { type: string; summary: string; duration: string }[] = [
  { type: "Écran", summary: "Écran fissuré ou tactile défectueux.", duration: "30–60 min" },
  { type: "Batterie", summary: "Remplacement batterie pour retrouver une bonne autonomie.", duration: "20–30 min" },
  { type: "Caméra", summary: "Réparation ou remplacement du module caméra.", duration: "30–45 min" },
  { type: "Connecteur de charge", summary: "Réparation du port de charge et des problèmes de connexion.", duration: "30–45 min" },
  { type: "Vitre arrière", summary: "Remplacement de la vitre arrière endommagée.", duration: "30–45 min" },
  { type: "Diagnostic", summary: "Analyse rapide de la panne avant intervention.", duration: "15–20 min" },
];

type PriceMap = Partial<Record<string, string>>;

function makeRepairs(prices: PriceMap): Repair[] {
  return REPAIR_DEFS.map((def) => ({
    ...def,
    priceLabel: prices[def.type] ?? "Sur demande",
  }));
}

function mkId(prefix: string, name: string): string {
  return `${prefix}-${name
    .toLowerCase()
    .replace(/\+/g, "plus")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
}

function iphone(name: string, screen: string, battery: string, camera = "Sur demande"): ModelDef {
  return {
    id: mkId("iphone", name),
    name: `iPhone ${name}`,
    repairs: makeRepairs({
      "Écran": screen,
      "Batterie": battery,
      "Caméra": camera,
      "Connecteur de charge": "35€",
      "Vitre arrière": "Sur demande",
      "Diagnostic": "Gratuit",
    }),
  };
}

type SamsungTier = "budget" | "mid" | "high" | "flagship";

const SAMSUNG_TIER_PRICES: Record<SamsungTier, PriceMap> = {
  budget: {
    "Écran": "39€", "Batterie": "25€", "Caméra": "35€",
    "Connecteur de charge": "29€", "Vitre arrière": "Sur demande", "Diagnostic": "Gratuit",
  },
  mid: {
    "Écran": "49€", "Batterie": "29€", "Caméra": "39€",
    "Connecteur de charge": "30€", "Vitre arrière": "Sur demande", "Diagnostic": "Gratuit",
  },
  high: {
    "Écran": "59€", "Batterie": "35€", "Caméra": "45€",
    "Connecteur de charge": "35€", "Vitre arrière": "Sur demande", "Diagnostic": "Gratuit",
  },
  flagship: {
    "Écran": "Sur demande", "Batterie": "39€", "Caméra": "49€",
    "Connecteur de charge": "35€", "Vitre arrière": "Sur demande", "Diagnostic": "Gratuit",
  },
};

function samsung(name: string, tier: SamsungTier): ModelDef {
  return {
    id: mkId("samsung", name),
    name,
    repairs: makeRepairs(SAMSUNG_TIER_PRICES[tier]),
  };
}

const IPHONE_MODELS: ModelDef[] = [
  iphone("7 / 8", "45€", "29€", "39€"),
  iphone("7+ / 8+", "49€", "29€", "39€"),
  iphone("X", "69€", "35€", "45€"),
  iphone("11", "59€", "35€", "45€"),
  iphone("11 Pro", "79€", "39€", "49€"),
  iphone("11 Pro Max", "89€", "39€", "49€"),
  iphone("12", "79€", "39€", "49€"),
  iphone("12 mini", "69€", "39€", "45€"),
  iphone("12 Pro", "89€", "39€", "55€"),
  iphone("12 Pro Max", "99€", "39€", "59€"),
  iphone("13", "89€", "39€", "49€"),
  iphone("13 mini", "79€", "39€", "45€"),
  iphone("13 Pro", "99€", "39€", "55€"),
  iphone("13 Pro Max", "109€", "39€", "59€"),
  iphone("14", "99€", "39€", "55€"),
  iphone("14+", "109€", "39€", "55€"),
  iphone("14 Pro", "119€", "39€", "65€"),
  iphone("14 Pro Max", "129€", "39€", "65€"),
  iphone("15", "Sur demande", "39€"),
  iphone("15+", "Sur demande", "39€"),
  iphone("15 Pro", "Sur demande", "39€"),
  iphone("15 Pro Max", "Sur demande", "39€"),
  iphone("16", "Sur demande", "39€"),
  iphone("16e", "Sur demande", "39€"),
  iphone("16+", "Sur demande", "39€"),
  iphone("16 Pro Max", "Sur demande", "39€"),
  iphone("17", "Sur demande", "Sur demande"),
  iphone("17 Air", "Sur demande", "Sur demande"),
  iphone("17 Pro Max", "Sur demande", "Sur demande"),
];

const SAMSUNG_MODELS: ModelDef[] = [
  samsung("Samsung A10", "budget"),
  samsung("Samsung A11", "budget"),
  samsung("Samsung A12", "budget"),
  samsung("Samsung A13", "budget"),
  samsung("Samsung A14", "budget"),
  samsung("Samsung A15", "budget"),
  samsung("Samsung A16", "budget"),
  samsung("Samsung A17", "budget"),
  samsung("Samsung A20 / A20s / A20e", "budget"),
  samsung("Samsung A21s", "budget"),
  samsung("Samsung A22 4G / A22 5G", "mid"),
  samsung("Samsung A23", "mid"),
  samsung("Samsung A24", "mid"),
  samsung("Samsung A25", "mid"),
  samsung("Samsung A26", "mid"),
  samsung("Samsung A30 / M30", "mid"),
  samsung("Samsung A31", "mid"),
  samsung("Samsung A32 4G / A32 5G", "mid"),
  samsung("Samsung A33", "mid"),
  samsung("Samsung A34", "mid"),
  samsung("Samsung A35", "mid"),
  samsung("Samsung A36", "mid"),
  samsung("Samsung A40", "mid"),
  samsung("Samsung A41", "mid"),
  samsung("Samsung A42 5G", "mid"),
  samsung("Samsung A50", "mid"),
  samsung("Samsung A51 4G / 5G", "mid"),
  samsung("Samsung A52", "mid"),
  samsung("Samsung A53", "mid"),
  samsung("Samsung A54", "mid"),
  samsung("Samsung A55", "mid"),
  samsung("Samsung A56", "high"),
  samsung("Samsung A60", "high"),
  samsung("Samsung A70", "high"),
  samsung("Samsung A71", "high"),
  samsung("Samsung A72", "high"),
  samsung("Samsung A73", "high"),
  samsung("Samsung A80", "high"),
  samsung("Samsung S8 / S9", "high"),
  samsung("Samsung S10 / S10e / S10+ / S10 5G", "high"),
  samsung("Samsung S20 / S20 FE / S20+ / S20 Ultra", "flagship"),
  samsung("Samsung S21 / S21 FE / S21+ / S21 Ultra", "flagship"),
  samsung("Samsung S22 / S22+ / S22 Ultra", "flagship"),
  samsung("Samsung S23 / S23+ / S23 FE / S23 Ultra", "flagship"),
  samsung("Samsung S24 / S24+ / S24 FE / S24 Ultra", "flagship"),
  samsung("Samsung S25 / S25+ / S25 FE / S25 Ultra", "flagship"),
];

const ACCESSORY_MODELS: ModelDef[] = [
  { id: "apple-watch", name: "Apple Watch", repairs: makeRepairs({ "Écran": "Sur demande", "Batterie": "Sur demande", "Diagnostic": "Gratuit" }) },
  { id: "galaxy-watch", name: "Samsung Galaxy Watch", repairs: makeRepairs({ "Écran": "Sur demande", "Batterie": "Sur demande", "Diagnostic": "Gratuit" }) },
  { id: "airpods-1", name: "AirPods 1", repairs: makeRepairs({ "Batterie": "Sur demande", "Diagnostic": "Gratuit" }) },
  { id: "airpods-pro", name: "AirPods Pro", repairs: makeRepairs({ "Batterie": "Sur demande", "Diagnostic": "Gratuit" }) },
  { id: "airpods-pro-3", name: "AirPods Pro 3", repairs: makeRepairs({ "Batterie": "Sur demande", "Diagnostic": "Gratuit" }) },
  { id: "airpods-3", name: "AirPods 3", repairs: makeRepairs({ "Batterie": "Sur demande", "Diagnostic": "Gratuit" }) },
  { id: "airpods-4", name: "AirPods 4", repairs: makeRepairs({ "Batterie": "Sur demande", "Diagnostic": "Gratuit" }) },
];

export const BRANDS: BrandDef[] = [
  { id: "iphone", name: "iPhone", slug: "iphone", models: IPHONE_MODELS },
  { id: "samsung", name: "Samsung", slug: "samsung", models: SAMSUNG_MODELS },
  { id: "accessoires", name: "Accessoires", slug: "accessoires", models: ACCESSORY_MODELS },
];

export function whatsAppLink(brand: string, model: string, repair: string): string {
  const subject = brand && brand !== "Accessoires" ? `${brand} ${model}` : model;
  const text = `Bonjour, je souhaite réserver une réparation pour un ${subject} — ${repair}.`;
  return `https://wa.me/33605557812?text=${encodeURIComponent(text)}`;
}

export function whatsAppQuote(brand: string): string {
  const text = `Bonjour, je souhaite obtenir un devis pour un téléphone ${brand}.`;
  return `https://wa.me/33605557812?text=${encodeURIComponent(text)}`;
}

export function searchAllModels(query: string): { brand: BrandDef; model: ModelDef }[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const results: { brand: BrandDef; model: ModelDef }[] = [];
  for (const brand of BRANDS) {
    for (const model of brand.models) {
      if (model.name.toLowerCase().includes(q) || brand.name.toLowerCase().includes(q)) {
        results.push({ brand, model });
      }
    }
  }
  return results;
}
