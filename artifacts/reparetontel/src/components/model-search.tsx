import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Smartphone, Watch, Headphones, Cable as CableIcon, Zap as ZapIcon,
  ChevronLeft, Clock, Camera, Monitor, BatteryFull, Shield, Activity,
  MessageCircle, X, RotateCcw, Zap,
} from "lucide-react";
import {
  PHONE_BRANDS, ACCESSORY_CATEGORIES,
  whatsAppLink, whatsAppQuote, whatsAppProduct, searchAllItems,
  type ModelDef, type Product, type AccessoryCategoryDef, type SearchHit,
} from "@/data/repairCatalog";
import {
  onSelectorNav, smoothScrollToEl, HEADER_OFFSET, type SelectorAction,
} from "@/lib/selectorBus";

type BrandKind = "phones" | "accessoires" | "quote";

const TOP_BRANDS: {
  slug: string; name: string; icon: typeof Smartphone;
  color: string; bg: string; kind: BrandKind; image?: string;
}[] = [
  { slug: "iphone",      name: "iPhone",       icon: Smartphone, color: "#1d1d1f", bg: "#f5f5f7", kind: "phones",      image: "/brands/apple.png"   },
  { slug: "samsung",     name: "Samsung",      icon: Smartphone, color: "#1428A0", bg: "#f0f2ff", kind: "phones",      image: "/brands/samsung.png" },
  { slug: "huawei",      name: "Huawei",       icon: Smartphone, color: "#CF0A2C", bg: "#fff0f2", kind: "quote",       image: "/brands/huawei.jpg"  },
  { slug: "pixel",       name: "Google Pixel", icon: Smartphone, color: "#1a73e8", bg: "#f0f7ff", kind: "quote",       image: "/brands/google.png"  },
  { slug: "xiaomi",      name: "Xiaomi",       icon: Smartphone, color: "#FF6900", bg: "#fff4ee", kind: "quote",       image: "/brands/xiaomi.jpg"  },
  { slug: "redmi",       name: "Redmi",        icon: Smartphone, color: "#e02020", bg: "#fff0f0", kind: "quote",       image: "/brands/redmi.png"   },
  { slug: "accessoires", name: "Accessoires",  icon: Watch,      color: "#2563EB", bg: "#eff6ff", kind: "accessoires"                               },
];

const CATEGORY_IMAGES: Record<string, string> = {
  "ps4": "/brands/ps4.png",
  "ps5": "/brands/ps5.png",
};

const QUOTE_BRANDS = TOP_BRANDS.filter((b) => b.kind === "quote");

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  watch: Watch,
  airpods: Headphones,
  zap: ZapIcon,
  cable: CableIcon,
};

const REPAIR_ICONS: Record<string, React.ElementType> = {
  "Écran": Monitor,
  "Batterie": BatteryFull,
  "Caméra": Camera,
  "Connecteur de charge": Zap,
  "Vitre arrière": Shield,
  "Diagnostic": Activity,
  "Réinitialisation": RotateCcw,
};

const STEPS = ["Modèle", "Réparation", "Réserver"];

type ScrollTarget = "selector" | null;

export function ModelSearch() {
  const [brandSlug, setBrandSlug] = useState<string | null>(null);
  const [accessoryCatSlug, setAccessoryCatSlug] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<ModelDef | null>(null);
  const [query, setQuery] = useState("");

  const sectionRef        = useRef<HTMLElement>(null);
  const stageRef          = useRef<HTMLDivElement>(null);
  const detailRef         = useRef<HTMLDivElement>(null);
  const repairsAnchorRef  = useRef<HTMLDivElement>(null);
  const pendingScroll     = useRef<ScrollTarget>(null);

  const isSearching = query.trim().length > 0;

  const phoneBrand = brandSlug && brandSlug !== "accessoires"
    ? PHONE_BRANDS.find((b) => b.slug === brandSlug) ?? null
    : null;

  const accessoryCat: AccessoryCategoryDef | null = accessoryCatSlug
    ? ACCESSORY_CATEGORIES.find((c) => c.slug === accessoryCatSlug) ?? null
    : null;

  function clearState() {
    setQuery("");
    setBrandSlug(null);
    setAccessoryCatSlug(null);
    setSelectedModel(null);
  }

  // ── Selector-level scroll (brand grid, categories, search, back) ────────
  // Detail-level scroll is handled separately in useLayoutEffect below to
  // guarantee a single, layout-correct final scroll for model selection.
  
  // ── Single, authoritative scroll after model selection ──────────────────
  // The model grid is wrapped in <AnimatePresence mode="wait">. On selection
  // it EXITS over ~300ms before being removed from the DOM. While it's still
  // exiting, the stable anchor sits BELOW the grid → measuring its Y now
  // overshoots, the browser smoothly scrolls past the final landing, and
  // then the grid collapses leaving the viewport parked on Services.
  //
  // Fix: a SINGLE scroll, fired AFTER the exit animation completes, when the
  // anchor's measured Y reflects the final post-collapse layout. Disable
  // CSS scroll-anchoring on <html> for the duration so the browser doesn't
  // try to "preserve visible content" and fight us.
  useLayoutEffect(() => {
    if (!selectedModel) return;

    // Kill focus-driven auto-scroll on the just-clicked card.
    (document.activeElement as HTMLElement | null)?.blur?.();

    // Temporarily disable scroll anchoring so our scrollTo wins.
    const html = document.documentElement;
    const prevAnchor = html.style.overflowAnchor;
    html.style.overflowAnchor = "none";

    const HEADER = HEADER_OFFSET + 16;
    let done = false;

    const doScroll = () => {
      if (done) return;
      done = true;
      const el = repairsAnchorRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const top = Math.max(0, rect.top + window.scrollY - HEADER);
      // Two passes: instant lock to the final position so any in-flight
      // browser scroll is killed, then smooth refinement to the same Y so
      // the user perceives a single fluid motion to "Réparations disponibles".
      window.scrollTo({ top, behavior: "auto" });
      requestAnimationFrame(() => {
        const r2 = el.getBoundingClientRect();
        const top2 = Math.max(0, r2.top + window.scrollY - HEADER);
        window.scrollTo({ top: top2, behavior: "smooth" });
      });
    };

    // Fire AFTER the AnimatePresence (mode="wait") exit completes (~300ms).
    const t = setTimeout(doScroll, 360);

    return () => {
      done = true;
      clearTimeout(t);
      html.style.overflowAnchor = prevAnchor;
    };
  }, [selectedModel]);

  // ── Listen to centralised navigation events ──────────────────────────────
  useEffect(() => {
    const off = onSelectorNav((action: SelectorAction) => {
      // Always wipe state first
      clearState();

      switch (action.kind) {
        case "reset":
          // No scroll here; consumer handles their own destination scroll.
          pendingScroll.current = null;
          break;
        case "open-selector":
          pendingScroll.current = null;
          requestAnimationFrame(() => {
            smoothScrollToEl(sectionRef.current, HEADER_OFFSET);
          });
          break;
        case "open-brand": {
          const brand = PHONE_BRANDS.find((b) => b.slug === action.brandSlug);
          if (brand) {
            setBrandSlug(brand.slug);
          } else if (action.brandSlug === "accessoires") {
            setBrandSlug("accessoires");
          }

          requestAnimationFrame(() => {
            smoothScrollToEl(sectionRef.current, HEADER_OFFSET);
          });
          break;
        }
        case "open-accessory":
          setBrandSlug("accessoires");
          if (action.categorySlug) {
            const cat = ACCESSORY_CATEGORIES.find((c) => c.slug === action.categorySlug);
            if (cat) setAccessoryCatSlug(cat.slug);
          }

          requestAnimationFrame(() => {
            smoothScrollToEl(sectionRef.current, HEADER_OFFSET);
          });
          break;
      }
    });
    return off;
  }, []);

  // ── Search input (always resets state) ───────────────────────────────────
  function handleQueryChange(val: string) {
    setQuery(val);
    setBrandSlug(null);
    setAccessoryCatSlug(null);
    setSelectedModel(null);
  }
  function handleClearQuery() { clearState(); }

  // ── Brand grid clicks (in-component) ─────────────────────────────────────
  function handleBrandClick(slug: string, kind: BrandKind, name: string) {
    if (kind === "quote") {
      window.open(whatsAppQuote(name), "_blank", "noopener,noreferrer");
      return;
    }
    setQuery("");
    setBrandSlug(slug);
    setAccessoryCatSlug(null);
    setSelectedModel(null);
    pendingScroll.current = "selector";
  }

  function handleCategoryClick(slug: string) {
    const cat = ACCESSORY_CATEGORIES.find((c) => c.slug === slug);
    setAccessoryCatSlug(slug);
    // Skip the intermediate model grid when there is only one model to choose —
    // select it automatically so the repair cards appear immediately.
    if (cat && cat.kind === "models" && cat.models.length === 1) {
      setSelectedModel(cat.models[0]);
    } else {
      setSelectedModel(null);
      pendingScroll.current = "selector";
    }
  }

  function handleModelClick(model: ModelDef) {
    // No pendingScroll here — useLayoutEffect on selectedModel handles the
    // single, authoritative scroll to the repair detail block.
    setSelectedModel(model);
  }

  function handleSearchHitClick(hit: SearchHit) {
    setQuery("");
    if (hit.kind === "phone-model") {
      setBrandSlug(hit.brand.slug);
      setAccessoryCatSlug(null);
      setSelectedModel(hit.model);
    } else if (hit.kind === "accessory-model") {
      setBrandSlug("accessoires");
      setAccessoryCatSlug(hit.category.slug);
      setSelectedModel(hit.model);
    } else {
      setBrandSlug("accessoires");
      setAccessoryCatSlug(hit.category.slug);
      setSelectedModel(null);
      pendingScroll.current = "selector";
    }
  }

  function handleBackToBrands()     { clearState(); pendingScroll.current = "selector"; }
  function handleBackToCategories() { setAccessoryCatSlug(null); setSelectedModel(null); pendingScroll.current = "selector"; }
  function handleBackToModels()     { setSelectedModel(null); pendingScroll.current = "selector"; }

  // ── Step indicator ────────────────────────────────────────────────────────
  const activeStep = selectedModel ? 1 : 0;

  const brandName = brandSlug === "accessoires" ? "Accessoires" : phoneBrand?.name ?? "";

  const showTopBrands = !brandSlug && !isSearching;
  const showAccessoryCategories = brandSlug === "accessoires" && !accessoryCatSlug && !isSearching;
  const showProducts = brandSlug === "accessoires" && accessoryCat?.kind === "products" && !isSearching;
  const showPhoneModels = !!phoneBrand && !selectedModel && !isSearching;
  const showAccessoryModels = brandSlug === "accessoires" && accessoryCat?.kind === "models" && !selectedModel && !isSearching;

  const searchHits = isSearching ? searchAllItems(query) : [];
  const quoteMatches = isSearching
    ? QUOTE_BRANDS.filter((b) => b.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <section id="selector" ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground mb-2 uppercase">
            Choisissez votre modèle
          </h2>
          <p className="text-muted-foreground text-base">
            Cherchez un téléphone, un accessoire, un chargeur, un câble — ou choisissez une marque ci-dessous
          </p>
        </motion.div>

        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Ex : iPhone 13, Samsung A15, AirPods, Watch, Chargeur, Câble…"
              className="w-full h-14 pl-5 pr-24 rounded-2xl border border-gray-200 bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] text-foreground placeholder:text-muted-foreground/60 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
            />
            {isSearching && (
              <button
                onClick={handleClearQuery}
                className="absolute right-14 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-muted-foreground transition-colors"
                aria-label="Effacer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-sm pointer-events-none">
              <Search className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-0 mb-10">
          {STEPS.map((step, idx) => (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                  idx === activeStep
                    ? "bg-primary border-primary text-white shadow-sm"
                    : idx < activeStep
                    ? "bg-primary/20 border-primary/30 text-primary"
                    : "bg-gray-100 border-gray-200 text-muted-foreground"
                }`}>
                  {idx + 1}
                </div>
                <span className={`text-[11px] font-semibold mt-1 uppercase tracking-wide ${
                  idx === activeStep ? "text-primary" : "text-muted-foreground/50"
                }`}>{step}</span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className={`w-16 md:w-24 h-px mb-4 mx-1 transition-colors duration-300 ${
                  idx < activeStep ? "bg-primary/40" : "bg-gray-200"
                }`} />
              )}
            </div>
          ))}
        </div>

        <div ref={stageRef}>
        <AnimatePresence mode="wait">

          {isSearching && (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex items-center gap-2 mb-5">
                <span className="text-sm font-medium text-muted-foreground">Résultats pour</span>
                <span className="text-sm font-semibold text-primary">«&nbsp;{query}&nbsp;»</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  {searchHits.length + quoteMatches.length} résultat{(searchHits.length + quoteMatches.length) !== 1 ? "s" : ""}
                </span>
              </div>

              {searchHits.length + quoteMatches.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground text-sm">
                  Aucun résultat pour «&nbsp;{query}&nbsp;»
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {quoteMatches.map((b) => (
                    <motion.button
                      key={`q-${b.slug}`}
                      whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      onClick={() => window.open(whatsAppQuote(b.name), "_blank", "noopener,noreferrer")}
                      className="flex flex-col items-center justify-center gap-2.5 p-4 rounded-2xl border border-gray-100 bg-white shadow-[0_2px_8px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_16px_-4px_rgba(0,0,0,0.1)] transition-all duration-200 cursor-pointer text-center"
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: b.bg }}>
                        <Smartphone className="w-5 h-5" style={{ color: b.color }} />
                      </div>
                      <div>
                        <span className="text-xs font-semibold leading-tight block" style={{ color: b.color }}>{b.name}</span>
                        <span className="text-[10px] text-primary font-bold mt-0.5 block">Sur devis →</span>
                      </div>
                    </motion.button>
                  ))}

                  {searchHits.map((hit, i) => {
                    const label =
                      hit.kind === "phone-model" ? hit.model.name :
                      hit.kind === "accessory-model" ? hit.model.name :
                      hit.product.name;
                    const sub =
                      hit.kind === "phone-model" ? hit.brand.name :
                      hit.kind === "accessory-model" ? hit.category.name :
                      hit.category.name;
                    const Icon =
                      hit.kind === "phone-model" ? Smartphone :
                      hit.kind === "accessory-model"
                        ? (CATEGORY_ICONS[hit.category.iconName] ?? Watch)
                        : (CATEGORY_ICONS[hit.category.iconName] ?? CableIcon);
                    return (
                      <motion.button
                        key={`h-${i}-${label}`}
                        whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }}
                        onClick={() => handleSearchHitClick(hit)}
                        className="flex flex-col items-center justify-center gap-2.5 p-4 rounded-2xl border border-gray-100 bg-white shadow-[0_2px_8px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_16px_-4px_rgba(0,0,0,0.1)] transition-all duration-200 cursor-pointer text-center"
                      >
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100">
                          <Icon className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold leading-tight block text-foreground">{label}</span>
                          <span className="text-[10px] text-muted-foreground/70 mt-0.5 block">{sub}</span>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {showTopBrands && (
            <motion.div
              key="brands"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4"
            >
              {TOP_BRANDS.map((brand) => {
                const Icon = brand.icon;
                return (
                  <motion.button
                    key={brand.slug}
                    whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    onClick={() => handleBrandClick(brand.slug, brand.kind, brand.name)}
                    className="group flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border border-gray-100 bg-white shadow-[0_2px_10px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.12)] hover:border-gray-200 transition-all duration-200 cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: brand.bg }}>
                      {brand.image
                        ? <img src={brand.image} alt={brand.name} className="w-8 h-8 object-contain" />
                        : <Icon className="w-5 h-5" style={{ color: brand.color }} />}
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-bold tracking-tight" style={{ color: brand.color }}>
                        {brand.name}
                      </div>
                      {brand.kind === "quote" && (
                        <div className="text-[10px] text-primary font-semibold mt-1">Sur devis →</div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          )}

          {showAccessoryCategories && (
            <motion.div
              key="cats"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-5">
                <button onClick={handleBackToBrands} className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  <ChevronLeft className="w-4 h-4" /> Marques
                </button>
                <span className="text-muted-foreground/40">/</span>
                <span className="text-sm font-semibold text-primary">Accessoires</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
                {ACCESSORY_CATEGORIES.map((cat) => {
                  const Icon = CATEGORY_ICONS[cat.iconName] ?? Watch;
                  return (
                    <motion.button
                      key={cat.slug}
                      whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      onClick={() => handleCategoryClick(cat.slug)}
                      className="flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border border-gray-100 bg-white shadow-[0_2px_10px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.12)] hover:border-gray-200 transition-all duration-200 cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#eff6ff]">
                        {CATEGORY_IMAGES[cat.slug]
                          ? <img src={CATEGORY_IMAGES[cat.slug]} alt={cat.name} className="w-8 h-8 object-contain" />
                          : <Icon className="w-5 h-5 text-primary" />}
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold tracking-tight text-foreground leading-tight">{cat.name}</div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {showPhoneModels && phoneBrand && (
            <motion.div
              key={`pm-${phoneBrand.slug}`}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-5">
                <button onClick={handleBackToBrands} className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  <ChevronLeft className="w-4 h-4" /> Marques
                </button>
                <span className="text-muted-foreground/40">/</span>
                <span className="text-sm font-semibold text-primary">{phoneBrand.name}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {phoneBrand.models.map((m) => (
                  <ModelCard key={m.id} name={m.name} sub={null} icon={Smartphone} onClick={() => handleModelClick(m)} />
                ))}
              </div>
            </motion.div>
          )}

          {showAccessoryModels && accessoryCat?.kind === "models" && (
            <motion.div
              key={`am-${accessoryCat.slug}`}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-5">
                <button onClick={handleBackToBrands} className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  <ChevronLeft className="w-4 h-4" /> Marques
                </button>
                <span className="text-muted-foreground/40">/</span>
                <button onClick={handleBackToCategories} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Accessoires</button>
                <span className="text-muted-foreground/40">/</span>
                <span className="text-sm font-semibold text-primary">{accessoryCat.name}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {accessoryCat.models.map((m) => {
                  const Icon = CATEGORY_ICONS[accessoryCat.iconName] ?? Watch;
                  return <ModelCard key={m.id} name={m.name} sub={null} icon={Icon} onClick={() => handleModelClick(m)} />;
                })}
              </div>
            </motion.div>
          )}

          {showProducts && accessoryCat?.kind === "products" && (
            <motion.div
              key={`prod-${accessoryCat.slug}`}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-5">
                <button onClick={handleBackToBrands} className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  <ChevronLeft className="w-4 h-4" /> Marques
                </button>
                <span className="text-muted-foreground/40">/</span>
                <button onClick={handleBackToCategories} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Accessoires</button>
                <span className="text-muted-foreground/40">/</span>
                <span className="text-sm font-semibold text-primary">{accessoryCat.name}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {accessoryCat.products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
        </div>

        {/* Stable scroll anchor — always mounted, sits right before the
            (animated) repair detail block so scrollIntoView lands reliably
            even when the model grid above collapses. */}
        <div
          ref={repairsAnchorRef}
          aria-hidden="true"
          className="scroll-mt-24"
          style={{ scrollMarginTop: HEADER_OFFSET + 16 }}
        />

        <AnimatePresence>
          {selectedModel && (
            <motion.div
              ref={detailRef}
              key={`repairs-${selectedModel.id}`}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="mt-10 pt-8 border-t border-gray-100"
            >
              {/* Breadcrumb — single-model direct-open accessory categories
                  (Apple Watch, Galaxy Watch, PS4, PS5) show
                  "Marques / Accessoires / Name" and back goes to Accessoires.
                  All other flows keep the existing breadcrumb. */}
              {brandSlug === "accessoires" && accessoryCat?.kind === "models" && accessoryCat.models.length === 1 ? (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <button onClick={handleBackToBrands} className="flex items-center gap-1 hover:text-primary transition-colors">
                    <ChevronLeft className="w-3.5 h-3.5" /> Marques
                  </button>
                  <span className="text-muted-foreground/40">/</span>
                  <button onClick={handleBackToCategories} className="hover:text-primary transition-colors">Accessoires</button>
                  <span className="text-muted-foreground/40">/</span>
                  <span className="text-primary font-medium">{selectedModel.name}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <button onClick={handleBackToModels} className="flex items-center gap-1 hover:text-primary transition-colors">
                    <ChevronLeft className="w-3.5 h-3.5" />
                    {accessoryCat?.name ?? brandName ?? "Modèles"}
                  </button>
                  <span className="text-muted-foreground/40">/</span>
                  <span className="text-primary font-medium">{selectedModel.name}</span>
                </div>
              )}
              <h3 className="text-xl font-bold text-foreground tracking-tight mb-6">Réparations disponibles</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {selectedModel.repairs.map((repair) => {
                  const Icon = REPAIR_ICONS[repair.type] ?? Activity;
                  const subjectBrand = brandSlug === "accessoires" ? "" : (brandName || "");
                  const waLink = whatsAppLink(subjectBrand, selectedModel.name, repair.type);
                  return (
                    <motion.div
                      key={repair.type}
                      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.08)] p-5 hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.1)] transition-shadow duration-200"
                    >
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold shrink-0 ${
                          repair.priceLabel === "Sur devis"
                            ? "bg-gray-100 text-muted-foreground"
                            : "bg-green-50 text-green-700 border border-green-200"
                        }`}>
                          {repair.priceLabel}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-foreground mb-1">{repair.type}</h4>
                      {(() => {
                        const [question, ...rest] = repair.summary.split("\n");
                        const solution = rest.join(" ");
                        return (
                          <>
                            <p className="text-sm font-bold text-primary leading-snug mb-1">{question}</p>
                            <p className="text-xs text-muted-foreground leading-relaxed mb-2 flex-1">{solution}</p>
                          </>
                        );
                      })()}
                      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/60 mb-4">
                        <Clock className="w-3 h-3 shrink-0" />
                        {repair.duration}
                      </div>
                      <a
                        href={waLink} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full h-9 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-wide hover:bg-primary/90 transition-colors duration-200"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        Réserver sur WhatsApp
                      </a>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

function ModelCard({
  name, sub, icon: Icon, onClick,
}: { name: string; sub: string | null; icon: React.ElementType; onClick: () => void }) {
  return (
    <motion.button
      whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2.5 p-4 rounded-2xl border border-gray-100 bg-white shadow-[0_2px_8px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_16px_-4px_rgba(0,0,0,0.1)] hover:border-gray-200 transition-all duration-200 cursor-pointer text-center"
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100">
        <Icon className="w-5 h-5 text-muted-foreground" />
      </div>
      <div>
        <span className="text-xs font-semibold leading-tight block text-foreground">{name}</span>
        {sub && <span className="text-[10px] text-muted-foreground/70 mt-0.5 block">{sub}</span>}
      </div>
    </motion.button>
  );
}

function ProductCard({ product }: { product: Product }) {
  const Icon = product.iconName === "cable" ? CableIcon : ZapIcon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.08)] p-5 hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.1)] transition-shadow duration-200"
    >
      <div className="flex items-start justify-between gap-2 mb-4">
        {product.image ? (
          <div className="w-16 h-16 rounded-xl bg-gray-50 overflow-hidden flex items-center justify-center shrink-0">
            <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        )}
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold shrink-0 ${
          product.price ? "bg-green-50 text-green-700 border border-green-200" : "bg-gray-100 text-muted-foreground"
        }`}>
          {product.price ?? "Sur devis"}
        </span>
      </div>
      <h4 className="font-bold text-sm text-foreground mb-1 leading-snug">{product.name}</h4>
      <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">{product.description}</p>
      <a
        href={whatsAppProduct(product.name, product.price)}
        target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 w-full h-9 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-wide hover:bg-primary/90 transition-colors duration-200"
      >
        <MessageCircle className="w-3.5 h-3.5" />
        Commander sur WhatsApp
      </a>
    </motion.div>
  );
}
