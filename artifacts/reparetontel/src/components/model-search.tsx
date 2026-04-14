import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Smartphone } from "lucide-react";

const BRANDS = [
  {
    name: "iPhone",
    slug: "iphone",
    color: "#1d1d1f",
    bg: "#f5f5f7",
    label: "Apple",
  },
  {
    name: "Samsung",
    slug: "samsung",
    color: "#1428A0",
    bg: "#f0f2ff",
    label: "Samsung",
  },
  {
    name: "Huawei",
    slug: "huawei",
    color: "#CF0A2C",
    bg: "#fff0f2",
    label: "Huawei",
  },
  {
    name: "Google Pixel",
    slug: "pixel",
    color: "#1a73e8",
    bg: "#f0f7ff",
    label: "Google",
  },
  {
    name: "Xiaomi",
    slug: "xiaomi",
    color: "#FF6900",
    bg: "#fff4ee",
    label: "Xiaomi",
  },
  {
    name: "Redmi",
    slug: "redmi",
    color: "#e02020",
    bg: "#fff0f0",
    label: "Redmi",
  },
];

const STEPS = ["Modèle", "Réparation", "Réserver"];

export function ModelSearch() {
  const [query, setQuery] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const handleBrandClick = (brand: typeof BRANDS[0]) => {
    setSelectedBrand(brand.slug);
    setActiveStep(1);
    const rowEl = document.getElementById(`row-${brand.slug}`);
    const productsEl = document.getElementById("products");
    const target = rowEl || productsEl;
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSearch = () => {
    const productsEl = document.getElementById("products");
    if (productsEl) productsEl.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const filteredBrands = query.trim()
    ? BRANDS.filter((b) =>
        b.name.toLowerCase().includes(query.toLowerCase()) ||
        b.label.toLowerCase().includes(query.toLowerCase())
      )
    : BRANDS;

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };
  const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground mb-2 uppercase">
            Quel modèle avez-vous&nbsp;?
          </h2>
          <p className="text-muted-foreground text-base">
            Saisissez un modèle ou choisissez une marque ci-dessous
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Ex: iPhone 13, iPhone 11, Samsung S25, Samsung A15"
              className="w-full h-14 pl-5 pr-14 rounded-2xl border border-gray-200 bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] text-foreground placeholder:text-muted-foreground/60 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
            />
            <button
              onClick={handleSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-sm hover:bg-primary/90 transition-colors"
            >
              <Search className="w-4 h-4 text-white" />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-center justify-center gap-0 mb-10"
        >
          {STEPS.map((step, idx) => (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                    idx === activeStep
                      ? "bg-primary border-primary text-white shadow-sm"
                      : idx < activeStep
                      ? "bg-primary/20 border-primary/30 text-primary"
                      : "bg-gray-100 border-gray-200 text-muted-foreground"
                  }`}
                >
                  {idx + 1}
                </div>
                <span
                  className={`text-[11px] font-semibold mt-1 uppercase tracking-wide ${
                    idx === activeStep ? "text-primary" : "text-muted-foreground/50"
                  }`}
                >
                  {step}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div
                  className={`w-16 md:w-24 h-px mb-4 mx-1 transition-colors duration-300 ${
                    idx < activeStep ? "bg-primary/40" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          ))}
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4"
        >
          {filteredBrands.map((brand) => (
            <motion.button
              key={brand.slug}
              variants={item}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleBrandClick(brand)}
              className={`group flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                selectedBrand === brand.slug
                  ? "border-primary/40 bg-primary/5 shadow-[0_0_0_2px_rgba(37,99,235,0.15)]"
                  : "border-gray-100 bg-white shadow-[0_2px_10px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.12)] hover:border-gray-200"
              }`}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: brand.bg }}
              >
                <Smartphone className="w-5 h-5" style={{ color: brand.color }} />
              </div>
              <div className="text-center">
                <div
                  className="text-sm font-bold tracking-tight"
                  style={{
                    color: selectedBrand === brand.slug ? "#2563EB" : brand.color,
                  }}
                >
                  {brand.name}
                </div>
                {brand.label !== brand.name && (
                  <div className="text-[10px] text-muted-foreground/60 font-medium mt-0.5">
                    {brand.label}
                  </div>
                )}
              </div>
            </motion.button>
          ))}

          {filteredBrands.length === 0 && (
            <div className="col-span-2 sm:col-span-3 text-center py-8 text-muted-foreground text-sm">
              Aucun résultat pour «&nbsp;{query}&nbsp;»
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
