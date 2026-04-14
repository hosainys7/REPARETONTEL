import { motion } from "framer-motion";
import { Wrench, RefreshCw, Smartphone, Package, Plus } from "lucide-react";

const SERVICE_CARDS = [
  {
    icon: Wrench,
    title: "Réparation",
    items: ["Téléphone", "Tablette", "Console"],
    cta: "Faire un devis",
    href: "#booking",
  },
  {
    icon: RefreshCw,
    title: "Rachat",
    items: ["iPhone", "Samsung"],
    cta: "Estimer mon appareil",
    href: "#booking",
  },
  {
    icon: Smartphone,
    title: "Vente",
    items: ["Téléphones reconditionnés", "iPhone", "Samsung"],
    cta: "Voir les offres",
    href: "#booking",
  },
  {
    icon: Package,
    title: "Accessoires",
    items: ["Chargeurs", "Câbles", "Protection"],
    cta: "Voir les accessoires",
    href: "#booking",
  },
];

export function Services() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.09 } },
  };
  const item = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <section id="services" className="py-20 bg-gray-50/60">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground mb-2">
            Nos services
          </h2>
          <p className="text-muted-foreground text-base">
            Un accompagnement complet pour votre smartphone à Marseille.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {SERVICE_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={item}
                className="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] p-6 hover:shadow-[0_8px_24px_-6px_rgba(0,0,0,0.1)] transition-shadow duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>

                <h3 className="text-lg font-bold text-foreground mb-3">
                  {card.title}
                </h3>

                <ul className="flex-1 space-y-2 mb-5">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Plus className="w-3.5 h-3.5 text-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href={card.href}
                  className="inline-flex items-center justify-center w-full h-9 rounded-xl border border-primary/30 text-primary text-sm font-semibold hover:bg-primary hover:text-white transition-all duration-200"
                >
                  {card.cta}
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
