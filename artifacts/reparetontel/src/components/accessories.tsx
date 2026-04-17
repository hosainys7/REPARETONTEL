import { motion } from "framer-motion";
import { Zap, Cable } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

type Accessory = {
  id: string;
  name: string;
  price?: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
};

const ACCESSORIES: Accessory[] = [
  {
    id: "ch-20w-iphone",
    name: "Chargeur rapide 20W USB-C vers iPhone",
    icon: Zap, iconBg: "#f0f7ff", iconColor: "#2563EB",
  },
  {
    id: "ch-20w-cc",
    name: "Chargeur 20W USB-C vers USB-C",
    icon: Zap, iconBg: "#f0f7ff", iconColor: "#2563EB",
  },
  {
    id: "ch-30w-cc",
    name: "Chargeur rapide 30W USB-C vers USB-C",
    icon: Zap, iconBg: "#fffbeb", iconColor: "#d97706",
  },
  {
    id: "ch-30w-iphone",
    name: "Chargeur rapide 30W USB-C vers iPhone",
    icon: Zap, iconBg: "#fffbeb", iconColor: "#d97706",
  },
  {
    id: "ca-light",
    name: "Câble USB vers Lightning",
    price: "5€",
    icon: Cable, iconBg: "#f0fdf4", iconColor: "#16a34a",
  },
  {
    id: "ca-usbc",
    name: "Câble USB vers USB-C",
    price: "5€",
    icon: Cable, iconBg: "#f0fdf4", iconColor: "#16a34a",
  },
];

function waLink(name: string) {
  const text = `Bonjour, je suis intéressé(e) par : ${name}.`;
  return `https://wa.me/33605557812?text=${encodeURIComponent(text)}`;
}

export function Accessories() {
  return (
    <section id="accessoires" className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">

        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4 uppercase">
              Accessoires
            </h2>
            <p className="text-lg text-muted-foreground">
              Chargeurs et câbles disponibles. Livrés directement avec votre intervention à domicile.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ACCESSORIES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] p-6 hover:shadow-[0_10px_24px_-6px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: item.iconBg }}
                  >
                    <Icon className="w-6 h-6" style={{ color: item.iconColor }} />
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold shrink-0 ${
                    item.price
                      ? "bg-primary text-white shadow-sm"
                      : "bg-gray-100 text-muted-foreground"
                  }`}>
                    {item.price ?? "Sur demande"}
                  </span>
                </div>

                <h3 className="text-base font-bold text-foreground leading-snug mb-5 flex-1">
                  {item.name}
                </h3>

                <a
                  href={waLink(item.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full h-10 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-wide hover:bg-primary/90 transition-colors duration-200"
                >
                  <FaWhatsapp className="w-3.5 h-3.5" />
                  Commander
                </a>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
