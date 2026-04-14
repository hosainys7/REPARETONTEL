import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

const BRANDS = [
  { name: "iPhone", emoji: "🍎" },
  { name: "Samsung", emoji: "📱" },
  { name: "Huawei", emoji: "📡" },
  { name: "Google Pixel", emoji: "🔍" },
  { name: "Xiaomi", emoji: "⚡" },
  { name: "Redmi", emoji: "🔴" },
];

const STEPS = ["Marque", "Réparation", "Réservation"];

export function ModelSearch() {
  const [query, setQuery] = useState("");
  const [activeStep] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const handleBrandClick = (name: string) => {
    setSelectedBrand(name);
    const section = document.getElementById("products");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const filteredBrands = BRANDS.filter((b) =>
    b.name.toLowerCase().includes(query.toLowerCase())
  );

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
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground mb-2">
            Quel modèle avez-vous&nbsp;?
          </h2>
          <p className="text-muted-foreground text-base">
            Saisissez votre marque ou choisissez ci-dessous
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
              placeholder="Ex: iPhone 13, Samsung S23, Redmi Note"
              className="w-full h-14 pl-5 pr-14 rounded-2xl border border-gray-200 bg-white shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] text-foreground placeholder:text-muted-foreground/60 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-sm hover:bg-primary/90 transition-colors">
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
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
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
                  className={`text-[11px] font-medium mt-1 ${
                    idx === activeStep ? "text-primary" : "text-muted-foreground/60"
                  }`}
                >
                  {step}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className="w-16 md:w-24 h-px bg-gray-200 mb-4 mx-1" />
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
              key={brand.name}
              variants={item}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleBrandClick(brand.name)}
              className={`group flex flex-col items-center justify-center gap-3 p-5 rounded-2xl border transition-all duration-200 cursor-pointer text-left ${
                selectedBrand === brand.name
                  ? "border-primary/40 bg-primary/5 shadow-[0_0_0_2px_rgba(37,99,235,0.15)]"
                  : "border-gray-100 bg-white shadow-[0_2px_10px_-4px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.12)] hover:border-gray-200"
              }`}
            >
              <span className="text-3xl leading-none">{brand.emoji}</span>
              <span
                className={`text-sm font-semibold tracking-tight ${
                  selectedBrand === brand.name ? "text-primary" : "text-foreground"
                }`}
              >
                {brand.name}
              </span>
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
