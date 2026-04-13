import { motion } from "framer-motion";
import { Wrench, Smartphone, RefreshCw, Headphones, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Services() {
  const services = [
    {
      icon: <Wrench className="w-8 h-8 text-primary" />,
      title: "Réparation",
      desc: "Réparation de téléphones à domicile, rapide et fiable."
    },
    {
      icon: <Smartphone className="w-8 h-8 text-primary" />,
      title: "Vente",
      desc: "Téléphones neufs et d'occasion selon disponibilité."
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-primary" />,
      title: "Rachat",
      desc: "Rachat de téléphones avec estimation simple."
    },
    {
      icon: <Headphones className="w-8 h-8 text-primary" />,
      title: "Accessoires",
      desc: "Accessoires de téléphone : chargeurs, câbles, coques et plus."
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Nos Services</h2>
            <p className="text-lg text-muted-foreground">
              Des solutions complètes pour tous vos besoins mobiles, directement chez vous.
            </p>
          </motion.div>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, idx) => (
            <motion.div 
              key={idx} 
              variants={item}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow hover:-translate-y-1 duration-300 group"
            >
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <Button asChild size="lg" className="font-semibold px-8 hover-elevate">
            <a href="#whatsapp">
              Réserver un service
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}