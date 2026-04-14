import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const PRODUCTS = [
  {
    id: 1,
    title: "Remplacement écran iPhone",
    desc: "Remplacement de dalle tactile et LCD",
    price: "49€",
    fullDesc: "Votre écran d'iPhone est fissuré, rayé ou ne répond plus ? Nous remplaçons le bloc complet (vitre + LCD) par une pièce de haute qualité. Intervention garantie sans perte de données et réalisée directement chez vous en moins de 30 minutes.",
    img: "/product-1.png",
  },
  {
    id: 2,
    title: "Remplacement écran Samsung",
    desc: "Compatible toutes gammes Galaxy",
    price: "59€",
    fullDesc: "Remplacement professionnel de l'écran de votre smartphone Samsung. Nous utilisons des dalles premium pour retrouver les couleurs éclatantes et la réactivité d'origine de votre appareil.",
    img: "/product-2.png",
  },
  {
    id: 3,
    title: "Batterie iPhone",
    desc: "Retrouvez une autonomie optimale",
    price: "30€",
    fullDesc: "Si votre iPhone se décharge trop vite ou s'éteint subitement, un changement de batterie est nécessaire. Nous installons une batterie neuve certifiée, redonnant une seconde jeunesse à votre appareil.",
    img: "/product-3.png",
  },
  {
    id: 4,
    title: "Batterie Samsung / Xiaomi",
    desc: "Remplacement rapide et fiable",
    price: "35€",
    fullDesc: "Retrouvez 100% de l'autonomie de votre smartphone Android. Remplacement effectué avec soin et calibration de la nouvelle batterie pour des performances durables.",
    img: "/product-4.png",
  },
  {
    id: 5,
    title: "Connecteur de charge",
    desc: "Réparation du port USB-C ou Lightning",
    price: "35€",
    fullDesc: "Votre téléphone ne charge plus ou le câble ne tient pas ? Nous nettoyons ou remplaçons le connecteur de charge endommagé pour que vous puissiez à nouveau recharger sans faux contacts.",
    img: "/product-5.png",
  },
  {
    id: 6,
    title: "Caméra arrière",
    desc: "Remplacement module photo haute définition",
    price: "39€",
    fullDesc: "Vos photos sont floues, tremblent, ou l'appareil photo affiche un écran noir ? Nous remplaçons le module caméra défectueux par une pièce de qualité pour des clichés de nouveau parfaits.",
    img: "/product-6.png",
  },
];

export function Products() {
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

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

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {PRODUCTS.map((prod) => (
            <motion.div
              key={prod.id}
              variants={item}
              whileHover={{ y: -4, scale: 1.02 }}
              onClick={() => setSelectedProduct(prod)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1)] transition-all duration-300 border border-gray-100 flex flex-col"
            >
              <div className="aspect-square w-full overflow-hidden bg-gray-100">
                <img
                  src={prod.img}
                  alt={prod.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-foreground mb-1 leading-tight">{prod.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1 mb-4 flex-1">{prod.desc}</p>
                <div className="mt-auto">
                  <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                    {prod.price}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white backdrop-blur-md rounded-full text-gray-500 hover:text-gray-900 transition-colors z-20 shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="aspect-video w-full bg-gray-100 relative shrink-0">
                <img
                  src={selectedProduct.img}
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6 md:p-8 overflow-y-auto">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-2xl font-bold tracking-tight text-foreground">
                    {selectedProduct.title}
                  </h3>
                  <span className="inline-flex shrink-0 items-center justify-center px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-lg">
                    {selectedProduct.price}
                  </span>
                </div>
                
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {selectedProduct.fullDesc}
                </p>
                
                <Button asChild size="lg" className="w-full rounded-full font-semibold bg-[#25D366] hover:bg-[#20bd5a] text-white h-14">
                  <a href={`#whatsapp`}>
                    Réserver sur WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}