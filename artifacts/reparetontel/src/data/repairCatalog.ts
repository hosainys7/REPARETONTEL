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

export type PhoneSeriesDef = {
  slug: string;
  name: string;
  models: ModelDef[];
};

export type BrandDef = {
  id: string;
  name: string;
  slug: string;
  models?: ModelDef[];
  series?: PhoneSeriesDef[];
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
  | {
      slug: string;
      name: string;
      iconName: "watch" | "airpods" | "zap" | "cable";
      kind: "models";
      models: ModelDef[];
    }
  | {
      slug: string;
      name: string;
      iconName: "watch" | "airpods" | "zap" | "cable";
      kind: "products";
      products: Product[];
    };

type RepairDef = { type: string; summary: string; duration: string };
type PriceMap = Partial<Record<string, string>>;

// ── Repair definitions, scoped per device type ──────────────────────────────
const PHONE_REPAIRS: RepairDef[] = [
  {
    type: "Écran",
    summary:
      "Votre écran ne répond plus correctement ?\nRemplacement rapide pour retrouver un affichage fluide.",
    duration: "30–60 min",
  },
  {
    type: "Batterie",
    summary:
      "Autonomie réduite ou batterie défectueuse ?\nNous remplaçons votre batterie pour une performance optimale.",
    duration: "20–30 min",
  },
  {
    type: "Caméra",
    summary:
      "Photos floues ou objectif endommagé ?\nRéparation ou remplacement du module pour des clichés impeccables.",
    duration: "30–45 min",
  },
  {
    type: "Connecteur de charge",
    summary:
      "Charge instable ou port abîmé ?\nNous remettons à neuf le port pour en finir avec les mauvais contacts.",
    duration: "30–45 min",
  },
  {
    type: "Diagnostic",
    summary:
      "Panne inconnue ?\nOn vérifie et on identifie le problème en quelques minutes.",
    duration: "15–20 min",
  },
];

const WATCH_REPAIRS: RepairDef[] = [
  {
    type: "Batterie",
    summary:
      "Montre qui ne tient plus la journée ?\nRemplacement de la batterie pour retrouver une autonomie complète.",
    duration: "30–45 min",
  },
  {
    type: "Diagnostic",
    summary:
      "Comportement étrange ou panne inconnue ?\nAnalyse complète avant toute intervention.",
    duration: "15–20 min",
  },
  {
    type: "Réinitialisation",
    summary:
      "Montre bloquée ou ralentie ?\nRemise à zéro complète et reconfiguration soignée.",
    duration: "15–30 min",
  },
];

const AIRPODS_REPAIRS: RepairDef[] = [
  {
    type: "Batterie",
    summary:
      "Écouteurs ou boîtier qui ne tiennent plus la charge ?\nRemplacement de la batterie pour retrouver une autonomie d'origine.",
    duration: "30–45 min",
  },
  {
    type: "Diagnostic",
    summary:
      "Son coupé, micro défaillant ou souci de connexion ?\nAnalyse complète pour identifier le problème.",
    duration: "15–20 min",
  },
];

const CONSOLE_REPAIRS: RepairDef[] = [
  {
    type: "HDMI",
    summary:
      "Port HDMI endommagé ou plus d’image à l’écran ?\nRéparation soignée pour retrouver un affichage normal.",
    duration: "30–45 min",
  },
  {
    type: "Nettoyage",
    summary:
      "Console bruyante ou qui chauffe anormalement ?\nNettoyage complet pour améliorer le fonctionnement.",
    duration: "30–45 min",
  },
  {
    type: "Bloc optique complet",
    summary:
      "Jeux non lus ou lecteur défectueux ?\nRemplacement complet sur devis.",
    duration: "30–45 min",
  },
];

function makeRepairs(defs: RepairDef[], prices: PriceMap): Repair[] {
  return defs.map((def) => ({
    ...def,
    priceLabel: prices[def.type] ?? "Sur devis",
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
function iphone(
  name: string,
  screen: string,
  battery: string,
  camera = "Sur devis",
): ModelDef {
  return {
    id: mkId("iphone", name),
    name: `iPhone ${name}`,
    type: "phone",
    repairs: makeRepairs(PHONE_REPAIRS, {
      Diagnostic: "15€",
      Écran: screen,
      Batterie: battery,
      Caméra: camera,
      "Connecteur de charge": "Sur devis",
    }),
  };
}

type SamsungTier = "budget" | "mid" | "high" | "flagship";

const SAMSUNG_TIER_PRICES: Record<SamsungTier, PriceMap> = {
  budget: {
    Diagnostic: "15€",
    Écran: "39€",
    Batterie: "25€",
    Caméra: "Sur devis",
    "Connecteur de charge": "Sur devis",
  },
  mid: {
    Diagnostic: "15€",
    Écran: "49€",
    Batterie: "29€",
    Caméra: "Sur devis",
    "Connecteur de charge": "Sur devis",
  },
  high: {
    Diagnostic: "15€",
    Écran: "59€",
    Batterie: "35€",
    Caméra: "Sur devis",
    "Connecteur de charge": "Sur devis",
  },
  flagship: {
    Diagnostic: "15€",
    Écran: "Sur devis",
    Batterie: "39€",
    Caméra: "Sur devis",
    "Connecteur de charge": "Sur devis",
  },
};

function samsung(name: string, tier: SamsungTier, screen?: string): ModelDef {
  return {
    id: mkId("samsung", name),
    name,
    type: "phone",
    repairs: makeRepairs(PHONE_REPAIRS, {
      ...SAMSUNG_TIER_PRICES[tier],
      ...(screen ? { Écran: screen } : {}),
    }),
  };
}

function redmiModel(name: string): ModelDef {
    return {
      id: mkId("redmi", name),
      name,
      type: "phone",
      repairs: makeRepairs(PHONE_REPAIRS,
                            { Diagnostic: "15€",
                              Écran: "Sur devis",
                              Batterie: "Sur devis",
                              Caméra: "Sur devis",
                              "Connecteur de charge": "Sur devis",
                              }),
                                };
                              }

  
const IPHONE_MODELS: ModelDef[] = [
  iphone("7 / 8", "29,90€", "29€"),
  iphone("7+ / 8+", "39,90€", "29€"),
  iphone("X", "44,90€", "29€"),
  iphone("11", "49,90€", "35€"),
  iphone("11 Pro", "54,90€", "35€"),
  iphone("11 Pro Max", "58,90€", "35€"),
  iphone("12", "59,90€", "35€"),
  iphone("12 mini", "59,90€", "35€"),
  iphone("12 Pro", "59,90€", "35€"),
  iphone("12 Pro Max", "79,90€", "35€"),
  iphone("13", "69,90€", "39€"),
  iphone("13 mini", "69,90€", "39€"),
  iphone("13 Pro", "79,90€", "39€"),
  iphone("13 Pro Max", "89,90€", "39€"),
  iphone("14", "79,90€", "45€"),
  iphone("14+", "79,90€", "45€"),
  iphone("14 Pro", "89,90€", "45€"),
  iphone("14 Pro Max", "99,90€", "45€"),
  iphone("15", "89,90€", "49"),
  iphone("15+", "89,90€", "49"),
  iphone("15 Pro", "99,90€", "49"),
  iphone("15 Pro Max", "109,90€", "49"),
  iphone("16", "129,90€", "Sur devis"),
  iphone("16e", "109,90€", "Sur devis"),
  iphone("16+", "129,90€", "Sur devis"),
  iphone("16 Pro Max", "199,90€", "Sur devis"),
  iphone("17", "Sur devis", "Sur devis"),
  iphone("17 Air", "Sur devis", "Sur devis"),
  iphone("17 Pro Max", "Sur devis", "Sur devis"),
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
  samsung("Samsung S8 / S9", "high", "Sur devis"),
  samsung("Samsung S10 / S10e / S10+ / S10 5G", "high", "Sur devis"),
  samsung("Samsung S20 / S20 FE / S20+ / S20 Ultra", "flagship", "Sur devis"),
  samsung("Samsung S21 / S21 FE / S21+ / S21 Ultra", "flagship", "Sur devis"),
  samsung("Samsung S22 / S22+ / S22 Ultra", "flagship", "Sur devis"),
  samsung("Samsung S23 / S23+ / S23 FE / S23 Ultra", "flagship", "Sur devis"),
  samsung("Samsung S24 / S24+ / S24 FE / S24 Ultra", "flagship", "Sur devis"),
  samsung("Samsung S25 / S25+ / S25 FE / S25 Ultra", "flagship", "Sur devis"),
];

const REDMI_NOTE_1_8_MODELS: ModelDef[] = [
  "Redmi Note",
  "Redmi Note 2",
  "Redmi Note 3",
  "Redmi Note 4",
  "Redmi Note 4X",
  "Redmi Note 5",
  "Redmi Note 5 Pro",
  "Redmi Note 6 Pro",
  "Redmi Note 7",
  "Redmi Note 7 Pro",
  "Redmi Note 8",
  "Redmi Note 8T",
  "Redmi Note 8 Pro",
].map(redmiModel);

const REDMI_NOTE_9_MODELS: ModelDef[] = [
  "Redmi Note 9",
  "Redmi Note 9 Pro",
  "Redmi Note 9 Pro Max",
  "Redmi Note 9S",
  "Redmi Note 9T",
  ].map(redmiModel);

const REDMI_NOTE_10_MODELS: ModelDef[] = [
  "Redmi Note 10",
  "Redmi Note 10S",
  "Redmi Note 10 5G",
  "Redmi Note 10 Pro",
  "Redmi Note 10 Pro Max",
  "Redmi Note 10T",
  ].map(redmiModel);

const REDMI_NOTE_11_MODELS: ModelDef[] = [
  "Redmi Note 11",
  "Redmi Note 11S",
  "Redmi Note 11 5G",
  "Redmi Note 11 Pro",
  "Redmi Note 11 Pro 5G",
  "Redmi Note 11 Pro+ 5G",
  "Redmi Note 11T Pro",
  "Redmi Note 11T Pro+",
  ].map(redmiModel);

const REDMI_NOTE_12_MODELS: ModelDef[] = [
  "Redmi Note 12",
  "Redmi Note 12 4G",
  "Redmi Note 12 5G",
  "Redmi Note 12S",
  "Redmi Note 12 Pro",
  "Redmi Note 12 Pro 5G",
  "Redmi Note 12 Pro+",
  "Redmi Note 12 Turbo",
  ].map(redmiModel);

const REDMI_NOTE_13_MODELS: ModelDef[] = [
  "Redmi Note 13",
  "Redmi Note 13 4G",
  "Redmi Note 13 5G",
  "Redmi Note 13 Pro",
  "Redmi Note 13 Pro 5G",
  "Redmi Note 13 Pro+ 5G",
  ].map(redmiModel);

const REDMI_NOTE_14_MODELS: ModelDef[] = [
  "Redmi Note 14",
  "Redmi Note 14 4G",
  "Redmi Note 14 5G",
  "Redmi Note 14 Pro",
  "Redmi Note 14 Pro 5G",
  "Redmi Note 14 Pro+ 5G",
  "Redmi Note 14 SE",
  "Redmi Note 14S",
  ].map(redmiModel);

const REDMI_NOTE_15_MODELS: ModelDef[] = [
  "Redmi Note 15",
  "Redmi Note 15 5G",
  "Redmi Note 15 Pro",
  "Redmi Note 15 Pro 5G",
  "Redmi Note 15 Pro+ 5G",
  ].map(redmiModel);

const REDMI_CLASSIC_MODELS: ModelDef[] = [
  "Redmi 5A",
  "Redmi 5Plus",
  "Redmi 6",
  "Redmi 6A",
  "Redmi 6 Pro",
  "Redmi 7",
  "Redmi 7A",
  "Redmi 8",
  "Redmi 8A",
  "Redmi 8A Dual",
  "Redmi 9",
  "Redmi 9A",
  "Redmi 9C",
  "Redmi 9T",
  "Redmi 10",
  "Redmi 10 A",
  "Redmi 10C",
  "Redmi 11",
  "Redmi 12",
  "Redmi 12 5G",
  "Redmi 13",
  "Redmi 13C",
  "Redmi 13C 5G",
  "Redmi 14",
  "Redmi 14C",
  "Redmi 15",
  "Redmi 15C",
  "Redmi 15 5G",
  "Redmi 15C 5G",
  ].map(redmiModel);
  
  
  
// ── Accessories ─────────────────────────────────────────────────────────────
const WATCH_PRICES: PriceMap = {
  Batterie: "Sur devis",
  Diagnostic: "15€",
  Réinitialisation: "Sur devis",
};
const AIRPODS_PRICES: PriceMap = { Batterie: "Sur devis", Diagnostic: "15€" };
const CONSOLE_PRICES: PriceMap = {
  HDMI: "Sur devis",
  Nettoyage: "Sur devis",
  "Bloc optique complet": "Sur devis",
};
function watchModel(id: string, name: string): ModelDef {
  return {
    id,
    name,
    type: "accessory",
    repairs: makeRepairs(WATCH_REPAIRS, WATCH_PRICES),
  };
}
function airpodsModel(id: string, name: string): ModelDef {
  return {
    id,
    name,
    type: "accessory",
    repairs: makeRepairs(AIRPODS_REPAIRS, AIRPODS_PRICES),
  };
}
function consoleModel(id: string, name: string): ModelDef {
  return {
    id,
    name,
    type: "accessory",
    repairs: makeRepairs(CONSOLE_REPAIRS, CONSOLE_PRICES),
  };
}

const APPLE_WATCH_MODELS: ModelDef[] = [
  watchModel("apple-watch", "Apple Watch"),
];
const GALAXY_WATCH_MODELS: ModelDef[] = [
  watchModel("galaxy-watch", "Samsung Galaxy Watch"),
];
const AIRPODS_MODELS: ModelDef[] = [
  airpodsModel("airpods-1", "AirPods 1"),
  airpodsModel("airpods-2", "AirPods 2"),
  airpodsModel("airpods-3", "AirPods 3"),
  airpodsModel("airpods-4", "AirPods 4"),
  airpodsModel("airpods-pro", "AirPods Pro"),
];
const PS4_MODELS: ModelDef[] = [consoleModel("ps4", "PS4")];
const PS5_MODELS: ModelDef[] = [consoleModel("ps5", "PS5")];

const CHARGER_PRODUCTS: Product[] = [
  {
    id: "ch-20w-iphone",
    name: "Chargeur rapide 20W USB-C vers iPhone",
    description:
      "Charge rapide 20W pour iPhone, connectique USB-C vers Lightning.",
    iconName: "zap",
  },
  {
    id: "ch-20w-cc",
    name: "Chargeur 20W USB-C vers USB-C",
    description: "Chargeur 20W universel USB-C vers USB-C.",
    iconName: "zap",
  },
  {
    id: "ch-30w-cc",
    name: "Chargeur rapide 30W USB-C vers USB-C",
    description:
      "Charge rapide 30W USB-C vers USB-C, idéale pour Android et iPad.",
    iconName: "zap",
  },
  {
    id: "ch-30w-iphone",
    name: "Chargeur rapide 30W USB-C vers iPhone",
    description:
      "Charge rapide 30W pour iPhone, connectique USB-C vers Lightning.",
    iconName: "zap",
  },
];

const CABLE_PRODUCTS: Product[] = [
  {
    id: "ca-light",
    name: "Câble USB vers Lightning",
    description: "Câble robuste pour iPhone et accessoires Apple.",
    price: "5€",
    image: cableUsbLightning,
  },
  {
    id: "ca-usbc",
    name: "Câble USB vers USB-C",
    description:
      "Câble universel USB vers USB-C, compatible Android, AirPods et accessoires.",
    price: "5€",
    image: cableUsbUsbc,
  },
];

export const ACCESSORY_CATEGORIES: AccessoryCategoryDef[] = [
  {
    slug: "apple-watch",
    name: "Apple Watch",
    iconName: "watch",
    kind: "models",
    models: APPLE_WATCH_MODELS,
  },
  {
    slug: "galaxy-watch",
    name: "Samsung Galaxy Watch",
    iconName: "watch",
    kind: "models",
    models: GALAXY_WATCH_MODELS,
  },
  {
    slug: "airpods",
    name: "AirPods",
    iconName: "airpods",
    kind: "models",
    models: AIRPODS_MODELS,
  },
  {
    slug: "ps4",
    name: "PS4",
    iconName: "zap",
    kind: "models",
    models: PS4_MODELS,
  },
  {
    slug: "ps5",
    name: "PS5",
    iconName: "zap",
    kind: "models",
    models: PS5_MODELS,
  },
  {
    slug: "chargeurs",
    name: "Chargeurs",
    iconName: "zap",
    kind: "products",
    products: CHARGER_PRODUCTS,
  },
  {
    slug: "cables",
    name: "Câbles",
    iconName: "cable",
    kind: "products",
    products: CABLE_PRODUCTS,
  },
];

export const PHONE_BRANDS: BrandDef[] = [
  { id: "iphone", name: "iPhone", slug: "iphone", models: IPHONE_MODELS },
  { id: "samsung", name: "Samsung", slug: "samsung", models: SAMSUNG_MODELS },
  {
    id: "redmi", name: "Redmi", slug: "redmi", series: [
      { slug: "redmi-note-1-8", name: "Redmi Note 1 → 8", models: REDMI_NOTE_1_8_MODELS },
      { slug: "redmi-note-9", name: "Redmi Note 9", models: REDMI_NOTE_9_MODELS },
      { slug: "redmi-note-10", name: "Redmi Note 10", models: REDMI_NOTE_10_MODELS },
      { slug: "redmi-note-11", name: "Redmi Note 11", models: REDMI_NOTE_11_MODELS },
      { slug: "redmi-note-12", name: "Redmi Note 12", models: REDMI_NOTE_12_MODELS },
      { slug: "redmi-note-13", name: "Redmi Note 13", models: REDMI_NOTE_13_MODELS },
      { slug: "redmi-note-14", name: "Redmi Note 14", models: REDMI_NOTE_14_MODELS },
      { slug: "redmi-note-15", name: "Redmi Note 15", models: REDMI_NOTE_15_MODELS },
      { slug: "redmi-classic", name: "Redmi", models: REDMI_CLASSIC_MODELS },
    ],
  }
];

// ── WhatsApp helpers ────────────────────────────────────────────────────────
export function whatsAppLink(
  brand: string,
  model: string,
  repair: string,
): string {
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
  | { kind: "phone-model"; brand: BrandDef; model: ModelDef }
  | { kind: "accessory-model"; category: AccessoryCategoryDef; model: ModelDef }
  | {
      kind: "accessory-product";
      category: AccessoryCategoryDef;
      product: Product;
    };

export function searchAllItems(query: string): SearchHit[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  const hits: SearchHit[] = [];

  for (const brand of PHONE_BRANDS) {
    if (brand.models) {
      for (const model of brand.models) {
        if (
          model.name.toLowerCase().includes(q) ||
          brand.name.toLowerCase().includes(q)
        ) {
          hits.push({ kind: "phone-model", brand, model });
        }
      }
    }

    if (brand.series) {
      for (const series of brand.series) {
        for (const model of series.models) {
          const haystack = `${model.name} ${series.name} ${brand.name}`.toLowerCase();
          if (haystack.includes(q)) {
            hits.push({ kind: "phone-model", brand, model });
          }
        }
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
        const haystack =
          `${product.name} ${cat.name} accessoires`.toLowerCase();
        if (haystack.includes(q)) {
          hits.push({ kind: "accessory-product", category: cat, product });
        }
      }
    }
  }

  return hits;
}
