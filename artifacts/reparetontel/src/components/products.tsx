import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Product = {
  id: number;
  brand: string;
  brandSlug: string;
  title: string;
  desc: string;
  price: string;
  summary: string;
  img: string;
};

const ALL_PRODUCTS: Product[] = [
  {
    id: 1, brand: "iPhone", brandSlug: "iphone",
    title: "Écran iPhone 13",
    desc: "Remplacement de dalle tactile et LCD",
    price: "49€",
    summary: "Réparation de l'écran iPhone 13 avec des pièces de qualité. Intervention à domicile à Marseille.",
    img: "/product-1.png",
  },
  {
    id: 2, brand: "iPhone", brandSlug: "iphone",
    title: "Écran iPhone 11",
    desc: "Dalle OLED — résolution parfaite",
    price: "45€",
    summary: "Remplacement d'écran iPhone 11 avec dalle de qualité supérieure. Service rapide et fiable.",
    img: "/product-2.png",
  },
  {
    id: 3, brand: "iPhone", brandSlug: "iphone",
    title: "Batterie iPhone 13",
    desc: "Retrouvez une autonomie optimale",
    price: "30€",
    summary: "Changement de batterie iPhone 13 pour retrouver une autonomie comme neuf. Intervention en moins de 30 min.",
    img: "/product-3.png",
  },
  {
    id: 4, brand: "iPhone", brandSlug: "iphone",
    title: "Batterie iPhone 11",
    desc: "Batterie neuve avec installation rapide",
    price: "28€",
    summary: "Remplacement batterie iPhone 11. Pièce certifiée, installation incluse à domicile.",
    img: "/product-4.png",
  },
  {
    id: 5, brand: "iPhone", brandSlug: "iphone",
    title: "Caméra iPhone 12 Pro Max",
    desc: "Module photo arrière haute définition",
    price: "59€",
    summary: "Remplacement du module caméra arrière iPhone 12 Pro Max pour retrouver une qualité photo optimale.",
    img: "/product-5.png",
  },
  {
    id: 6, brand: "iPhone", brandSlug: "iphone",
    title: "Connecteur iPhone 12",
    desc: "Réparation du port Lightning",
    price: "35€",
    summary: "Réparation du connecteur Lightning iPhone 12. Résolution des problèmes de charge en une intervention.",
    img: "/product-6.png",
  },

  {
    id: 7, brand: "Samsung", brandSlug: "samsung",
    title: "Écran Samsung S25",
    desc: "Dalle AMOLED — qualité d'origine",
    price: "59€",
    summary: "Remplacement écran Samsung Galaxy S25 avec dalle AMOLED d'origine. Rendu parfait garanti.",
    img: "/product-1.png",
  },
  {
    id: 8, brand: "Samsung", brandSlug: "samsung",
    title: "Écran Samsung A15",
    desc: "Remplacement LCD complet",
    price: "45€",
    summary: "Réparation écran Samsung A15. Pièces compatibles de qualité, intervention rapide à domicile.",
    img: "/product-2.png",
  },
  {
    id: 9, brand: "Samsung", brandSlug: "samsung",
    title: "Batterie Samsung A15",
    desc: "Batterie neuve avec installation rapide",
    price: "30€",
    summary: "Remplacement batterie Samsung A15. Retrouvez une autonomie complète en une seule intervention.",
    img: "/product-3.png",
  },
  {
    id: 10, brand: "Samsung", brandSlug: "samsung",
    title: "Batterie Samsung S23",
    desc: "Autonomie restaurée — pièce certifiée",
    price: "35€",
    summary: "Changement batterie Samsung S23 avec pièce de qualité. Intervention rapide à votre domicile.",
    img: "/product-4.png",
  },
  {
    id: 11, brand: "Samsung", brandSlug: "samsung",
    title: "Connecteur Samsung S23",
    desc: "Réparation du port USB-C",
    price: "38€",
    summary: "Réparation connecteur USB-C Samsung S23. Fin des problèmes de charge en une intervention.",
    img: "/product-5.png",
  },
  {
    id: 12, brand: "Samsung", brandSlug: "samsung",
    title: "Écran Samsung S23",
    desc: "Écran AMOLED Ultra — qualité premium",
    price: "55€",
    summary: "Remplacement écran Samsung S23. Dalle haute résolution, couleurs vives garanties.",
    img: "/product-6.png",
  },

  {
    id: 13, brand: "Xiaomi", brandSlug: "xiaomi",
    title: "Écran Xiaomi Redmi Note",
    desc: "Remplacement dalle LCD complet",
    price: "40€",
    summary: "Réparation écran Xiaomi Redmi Note avec pièces compatibles de qualité. Intervention à domicile.",
    img: "/product-1.png",
  },
  {
    id: 14, brand: "Xiaomi", brandSlug: "xiaomi",
    title: "Batterie Xiaomi Redmi",
    desc: "Batterie neuve, installation incluse",
    price: "28€",
    summary: "Remplacement batterie Xiaomi Redmi. Retrouvez votre autonomie d'origine en moins de 30 minutes.",
    img: "/product-2.png",
  },
  {
    id: 15, brand: "Huawei", brandSlug: "huawei",
    title: "Écran Huawei P30",
    desc: "Dalle OLED — qualité premium",
    price: "45€",
    summary: "Remplacement écran Huawei P30. Pièces compatibles de qualité, résultat impeccable.",
    img: "/product-3.png",
  },
  {
    id: 16, brand: "Autres", brandSlug: "pixel",
    title: "Écran Google Pixel",
    desc: "Remplacement écran Pixel",
    price: "50€",
    summary: "Réparation écran Google Pixel avec des pièces de qualité. Intervention rapide à Marseille.",
    img: "/product-4.png",
  },
];

const ROWS = [
  { brand: "iPhone", slug: "iphone", label: "Réparations iPhone" },
  { brand: "Samsung", slug: "samsung", label: "Réparations Samsung" },
  { brand: "Xiaomi", slug: "xiaomi", label: "Autres marques" },
];

const OTHER_SLUGS = ["xiaomi", "huawei", "pixel", "redmi"];

function HorizontalRow({ products, onSelect }: { products: Product[]; onSelect: (p: Product) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: "left" | "right") => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: dir === "left" ? -280 : 280, behavior: "smooth" });
  };
  if (products.length === 0) return null;

  return (
    <div className="relative group/row">
      <button
        onClick={() => scroll("left")}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-200 hover:bg-gray-50"
      >
        <ChevronLeft className="w-4 h-4 text-foreground" />
      </button>

      <div
        ref={ref}
        className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((prod) => (
          <motion.div
            key={prod.id}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            onClick={() => onSelect(prod)}
            className="flex-none w-44 sm:w-52 snap-start cursor-pointer bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_16px_24px_-6px_rgba(0,0,0,0.1)] transition-shadow duration-300 border border-gray-100 flex flex-col"
          >
            <div className="h-36 w-full overflow-hidden bg-gray-100 shrink-0">
              <img
                src={prod.img}
                alt={prod.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-bold text-sm text-foreground mb-1 leading-tight line-clamp-2">{prod.title}</h3>
              <p className="text-xs text-muted-foreground line-clamp-1 mb-3 flex-1">{prod.desc}</p>
              <span className="self-start inline-flex items-center justify-center px-3 py-1 rounded-full bg-primary text-white font-bold text-sm shadow-sm">
                {prod.price}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-200 hover:bg-gray-50"
      >
        <ChevronRight className="w-4 h-4 text-foreground" />
      </button>
    </div>
  );
}

export function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const getRow = (slugs: string[]) =>
    ALL_PRODUCTS.filter((p) => slugs.includes(p.brandSlug));

  return (
    <section id="products" className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Réparations populaires
            </h2>
            <p className="text-lg text-muted-foreground">
              Les interventions les plus demandées, avec des prix transparents.
            </p>
          </motion.div>
        </div>

        <div className="space-y-12">
          {ROWS.map((row, rowIdx) => {
            const slugs = row.slug === "xiaomi" ? OTHER_SLUGS : [row.slug];
            const products = getRow(slugs);
            if (products.length === 0) return null;
            return (
              <motion.div
                key={row.slug}
                id={`row-${row.slug}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: rowIdx * 0.1 }}
              >
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-bold text-foreground">{row.label}</h3>
                  <span className="text-xs text-muted-foreground font-medium">
                    Faites glisser →
                  </span>
                </div>
                <HorizontalRow products={products} onSelect={setSelectedProduct} />
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: "spring", damping: 28, stiffness: 380, mass: 0.9 }}
              className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white backdrop-blur-md rounded-full text-gray-500 hover:text-gray-900 transition-colors z-20 shadow-sm"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="h-44 w-full bg-gray-100 shrink-0 overflow-hidden">
                <img
                  src={selectedProduct.img}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-lg font-bold tracking-tight text-foreground leading-snug">
                    {selectedProduct.title}
                  </h3>
                  <span className="inline-flex shrink-0 items-center justify-center px-3 py-1 rounded-full bg-primary text-white font-bold text-sm shadow-sm">
                    {selectedProduct.price}
                  </span>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {selectedProduct.summary}
                </p>

                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-full font-bold bg-primary hover:bg-primary/90 text-white h-12 text-sm uppercase tracking-wide"
                >
                  <a href="#whatsapp">Réserver sur WhatsApp</a>
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
