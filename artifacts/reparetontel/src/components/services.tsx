import { motion } from "framer-motion";
import { Wrench, Smartphone, RefreshCw, Package } from "lucide-react";

export function Services() {
  const services = [
    {
      icon: Wrench,
      title: "Réparation",
      desc: "Dépannage rapide à domicile",
    },
    {
      icon: Smartphone,
      title: "Vente",
      desc: "Neuf et reconditionné",
    },
    {
      icon: RefreshCw,
      title: "Rachat",
      desc: "Estimation de votre appareil",
    },
    {
      icon: Package,
      title: "Accessoires",
      desc: "Coques, verres, chargeurs",
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-100/50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm"
              >
                <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}