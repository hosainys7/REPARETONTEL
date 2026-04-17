import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Smartphone, Watch, ChevronLeft, Clock, Zap, Camera,
  Monitor, BatteryFull, Shield, Activity, MessageCircle, X,
} from "lucide-react";
import {
  BRANDS, whatsAppLink, whatsAppQuote, searchAllModels,
  type ModelDef,
} from "@/data/repairCatalog";

type BrandKind = "catalog" | "quote";

const UI_BRANDS: {
  slug: string; name: string; icon: typeof Smartphone;
  color: string; bg: string; kind: BrandKind;
}[] = [
  { slug: "iphone",      name: "iPhone",       icon: Smartphone, color: "#1d1d1f", bg: "#f5f5f7", kind: "catalog" },
  { slug: "samsung",     name: "Samsung",      icon: Smartphone, color: "#1428A0", bg: "#f0f2ff", kind: "catalog" },
  { slug: "huawei",      name: "Huawei",       icon: Smartphone, color: "#CF0A2C", bg: "#fff0f2", kind: "quote"   },
  { slug: "pixel",       name: "Google Pixel", icon: Smartphone, color: "#1a73e8", bg: "#f0f7ff", kind: "quote"   },
  { slug: "xiaomi",      name: "Xiaomi",       icon: Smartphone, color: "#FF6900", bg: "#fff4ee", kind: "quote"   },
  { slug: "redmi",       name: "Redmi",        icon: Smartphone, color: "#e02020", bg: "#fff0f0", kind: "quote"   },
  { slug: "accessoires", name: "Accessoires",  icon: Watch,      color: "#2563EB", bg: "#eff6ff", kind: "catalog" },
];

const QUOTE_BRANDS = UI_BRANDS.filter((b) => b.kind === "quote");

const REPAIR_ICONS: Record<string, React.ElementType> = {
  "Écran": Monitor,
  "Batterie": BatteryFull,
  "Caméra": Camera,
  "Connecteur de charge": Zap,
  "Vitre arrière": Shield,
  "Diagnostic": Activity,
};

const STEPS = ["Modèle", "Réparation", "Réserver"];

type Entry =
  | { kind: "model"; model: ModelDef; brandSlug: string; brandName: string }
  | { kind: "quote"; brandSlug: string; brandName: string; color: string; bg: string };

export function ModelSearch() {
  const [selectedBrandSlug, setSelectedBrandSlug] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<ModelDef | null>(null);
  const [query, setQuery] = useState("");

  const modelsRef  = useRef<HTMLDivElement>(null);
  const repairsRef = useRef<HTMLDivElement>(null);

  const isSearching  = query.trim().length > 0;
  const catalogBrand = selectedBrandSlug
    ? BRANDS.find((b) => b.slug === selectedBrandSlug) ?? null
    : null;

  // Build search entries: catalog model matches + synthetic quote-brand matches
  const entriesToShow: Entry[] = (() => {
    if (isSearching) {
      const q = query.toLowerCase().trim();
      const quoteMatches: Entry[] = QUOTE_BRANDS
        .filter((b) => b.name.toLowerCase().includes(q) || b.slug.includes(q))
        .map((b) => ({
          kind: "quote" as const,
          brandSlug: b.slug, brandName: b.name, color: b.color, bg: b.bg,
        }));
      const modelMatches: Entry[] = searchAllModels(query).map((r) => ({
        kind: "model" as const,
        model: r.model, brandSlug: r.brand.slug, brandName: r.brand.name,
      }));
      return [...quoteMatches, ...modelMatches];
    }
    if (catalogBrand) {
      return catalogBrand.models.map((m) => ({
        kind: "model" as const,
        model: m, brandSlug: catalogBrand.slug, brandName: catalogBrand.name,
      }));
    }
    return [];
  })();

  const activeStep = selectedModel ? 1 : 0;
  const brandName = UI_BRANDS.find((b) => b.slug === selectedBrandSlug)?.name ?? "";

  function handleQueryChange(val: string) {
    setQuery(val);
    setSelectedBrandSlug(null);
    setSelectedModel(null);
  }

  function handleClearQuery() {
    setQuery("");
    setSelectedBrandSlug(null);
    setSelectedModel(null);
  }

  function handleBrandClick(slug: string, kind: BrandKind, name: string) {
    if (kind === "quote") {
      window.open(whatsAppQuote(name), "_blank", "noopener,noreferrer");
      return;
    }
    setSelectedBrandSlug(slug);
    setSelectedModel(null);
    setQuery("");
    setTimeout(
      () => modelsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      50,
    );
  }

  function handleEntryClick(entry: Entry) {
    if (entry.kind === "quote") {
      window.open(whatsAppQuote(entry.brandName), "_blank", "noopener,noreferrer");
      return;
    }
    setSelectedBrandSlug(entry.brandSlug);
    setSelectedModel(entry.model);
    setQuery("");
    setTimeout(
      () => repairsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      50,
    );
  }

  function handleBackToModels() {
    setSelectedModel(null);
  }

  function handleBackToBrands() {
    setSelectedBrandSlug(null);
    setSelectedModel(null);
    setQuery("");
  }

  const showBrandCards = !selectedBrandSlug && !isSearching;
  const repairBrandLabel = brandName || "Modèles";

  return (
    <section id="selector" className="py-20 bg-white">
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
            Cherchez un téléphone, un accessoire, ou choisissez une marque ci-dessous
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-8"
        >
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Ex : iPhone 13, Samsung A15, AirPods, Watch, Huawei…"
              className="w-full h-14 pl-5 pr-24 rounded-2xl border border-gray-200 bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] text-foreground placeholder:text-muted-foreground/60 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
            />
            {isSearching && (
              <button
                onClick={handleClearQuery}
                className="absolute right-14 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 text-muted-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-sm pointer-events-none">
              <Search className="w-4 h-4 text-white" />
            </div>
          </div>
        </motion.div>

        {/* Step indicator */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center gap-0 mb-10"
        >
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
                }`}>
                  {step}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className={`w-16 md:w-24 h-px mb-4 mx-1 transition-colors duration-300 ${
                  idx < activeStep ? "bg-primary/40" : "bg-gray-200"
                }`} />
              )}
            </div>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {showBrandCards ? (
            <motion.div
              key="brands"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4"
            >
              {UI_BRANDS.map((brand) => {
                const Icon = brand.icon;
                return (
                  <motion.button
                    key={brand.slug}
                    whileHover={{ y: -3, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleBrandClick(brand.slug, brand.kind, brand.name)}
                    className="group flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border border-gray-100 bg-white shadow-[0_2px_10px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.12)] hover:border-gray-200 transition-all duration-200 cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: brand.bg }}>
                      <Icon className="w-5 h-5" style={{ color: brand.color }} />
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
          ) : (
            <motion.div
              key="models"
              ref={modelsRef}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-5">
                <button
                  onClick={handleBackToBrands}
                  className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Marques
                </button>
                {selectedBrandSlug && !isSearching && (
                  <>
                    <span className="text-muted-foreground/40">/</span>
                    <span className="text-sm font-semibold text-primary">{brandName}</span>
                  </>
                )}
                {isSearching && (
                  <span className="ml-auto text-xs text-muted-foreground">
                    {entriesToShow.length} résultat{entriesToShow.length !== 1 ? "s" : ""}
                  </span>
                )}
              </div>

              {entriesToShow.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground text-sm">
                  Aucun résultat pour «&nbsp;{query}&nbsp;»
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {entriesToShow.map((entry) => {
                    if (entry.kind === "quote") {
                      return (
                        <motion.button
                          key={`q-${entry.brandSlug}`}
                          whileHover={{ y: -3, scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleEntryClick(entry)}
                          className="flex flex-col items-center justify-center gap-2.5 p-4 rounded-2xl border border-gray-100 bg-white shadow-[0_2px_8px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_16px_-4px_rgba(0,0,0,0.1)] hover:border-gray-200 transition-all duration-200 cursor-pointer text-center"
                        >
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: entry.bg }}>
                            <Smartphone className="w-5 h-5" style={{ color: entry.color }} />
                          </div>
                          <div>
                            <span className="text-xs font-semibold leading-tight block" style={{ color: entry.color }}>
                              {entry.brandName}
                            </span>
                            <span className="text-[10px] text-primary font-bold mt-0.5 block">Sur devis →</span>
                          </div>
                        </motion.button>
                      );
                    }
                    const isAccessory = entry.brandSlug === "accessoires";
                    const ItemIcon = isAccessory ? Watch : Smartphone;
                    return (
                      <motion.button
                        key={entry.model.id}
                        whileHover={{ y: -3, scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleEntryClick(entry)}
                        className={`flex flex-col items-center justify-center gap-2.5 p-4 rounded-2xl border transition-all duration-200 cursor-pointer text-center ${
                          selectedModel?.id === entry.model.id
                            ? "border-primary/40 bg-primary/5 shadow-[0_0_0_2px_rgba(37,99,235,0.15)]"
                            : "border-gray-100 bg-white shadow-[0_2px_8px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_16px_-4px_rgba(0,0,0,0.1)] hover:border-gray-200"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          selectedModel?.id === entry.model.id ? "bg-primary/10" : "bg-gray-100"
                        }`}>
                          <ItemIcon className={`w-5 h-5 ${selectedModel?.id === entry.model.id ? "text-primary" : "text-muted-foreground"}`} />
                        </div>
                        <div>
                          <span className={`text-xs font-semibold leading-tight block ${
                            selectedModel?.id === entry.model.id ? "text-primary" : "text-foreground"
                          }`}>
                            {entry.model.name}
                          </span>
                          {isSearching && (
                            <span className="text-[10px] text-muted-foreground/60 mt-0.5 block">{entry.brandName}</span>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedModel && (
            <motion.div
              ref={repairsRef}
              key={`repairs-${selectedModel.id}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="mt-10 pt-8 border-t border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <button
                      onClick={handleBackToModels}
                      className="flex items-center gap-1 hover:text-primary transition-colors"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      {repairBrandLabel}
                    </button>
                    <span className="text-muted-foreground/40">/</span>
                    <span className="text-primary font-medium">{selectedModel.name}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground tracking-tight">
                    Réparations disponibles
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {selectedModel.repairs.map((repair) => {
                  const Icon = REPAIR_ICONS[repair.type] ?? Activity;
                  const waLink = whatsAppLink(brandName || "ce téléphone", selectedModel.name, repair.type);
                  return (
                    <motion.div
                      key={repair.type}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.08)] p-5 hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.1)] transition-shadow duration-200"
                    >
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold shrink-0 ${
                          repair.priceLabel === "Gratuit"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : repair.priceLabel === "Sur demande"
                            ? "bg-gray-100 text-muted-foreground"
                            : "bg-primary text-white shadow-sm"
                        }`}>
                          {repair.priceLabel}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-foreground mb-1">{repair.type}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-2 flex-1">{repair.summary}</p>

                      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/60 mb-4">
                        <Clock className="w-3 h-3 shrink-0" />
                        {repair.duration}
                      </div>

                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
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
