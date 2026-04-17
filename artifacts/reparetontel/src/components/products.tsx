import { motion } from "framer-motion";
import { Monitor, BatteryFull, Camera, Zap, Shield, Activity } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

type Service = {
  type: string;
  summary: string;
  priceLabel: string;
  duration: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
};

const SERVICES: Service[] = [
  {
    type: "Écran",
    summary: "Dalle fissurée ou tactile qui ne répond plus ? Remplacement rapide avec pièces de qualité.",
    priceLabel: "À partir de 39€",
    duration: "30–60 min",
    icon: Monitor,
    iconBg: "#f0f7ff",
    iconColor: "#2563EB",
  },
  {
    type: "Batterie",
    summary: "Autonomie réduite ou téléphone qui s'éteint seul ? Retrouvez une endurance comme neuf.",
    priceLabel: "À partir de 25€",
    duration: "20–30 min",
    icon: BatteryFull,
    iconBg: "#f0fdf4",
    iconColor: "#16a34a",
  },
  {
    type: "Caméra",
    summary: "Photos floues, module cassé ou caméra frontale HS ? Remplacement du module photo.",
    priceLabel: "À partir de 35€",
    duration: "30–45 min",
    icon: Camera,
    iconBg: "#fdf4ff",
    iconColor: "#9333ea",
  },
  {
    type: "Connecteur de charge",
    summary: "Port USB-C ou Lightning endommagé, charge intermittente ? Réparation en une intervention.",
    priceLabel: "À partir de 29€",
    duration: "30–45 min",
    icon: Zap,
    iconBg: "#fffbeb",
    iconColor: "#d97706",
  },
  {
    type: "Vitre arrière",
    summary: "Dos fissuré ou éclats de verre ? Remplacement de la vitre arrière à domicile.",
    priceLabel: "Sur demande",
    duration: "30–45 min",
    icon: Shield,
    iconBg: "#fff1f2",
    iconColor: "#e11d48",
  },
  {
    type: "Diagnostic",
    summary: "Panne inconnue ou comportement anormal ? Analyse complète de votre appareil, sans engagement.",
    priceLabel: "Gratuit",
    duration: "15–20 min",
    icon: Activity,
    iconBg: "#f0fdfa",
    iconColor: "#0d9488",
  },
];

function waLink(type: string) {
  const text = `Bonjour, je souhaite obtenir un devis pour une réparation : ${type}.`;
  return `https://wa.me/33605557812?text=${encodeURIComponent(text)}`;
}

export function Products() {
  return (
    <section id="products" className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">

        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4 uppercase">
              Nos réparations
            </h2>
            <p className="text-lg text-muted-foreground">
              Six types d'interventions réalisées à domicile, sur tous les modèles.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                className="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] p-6 hover:shadow-[0_10px_24px_-6px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 shrink-0"
                  style={{ backgroundColor: service.iconBg }}
                >
                  <Icon className="w-6 h-6" style={{ color: service.iconColor }} />
                </div>

                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-base font-bold text-foreground leading-tight">
                    {service.type}
                  </h3>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold shrink-0 ${
                    service.priceLabel === "Gratuit"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : service.priceLabel === "Sur demande"
                      ? "bg-gray-100 text-muted-foreground"
                      : "bg-primary text-white shadow-sm"
                  }`}>
                    {service.priceLabel}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                  {service.summary}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground/60 font-medium">
                    ⏱ {service.duration}
                  </span>
                  <a
                    href={waLink(service.type)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#25D366] hover:text-[#1da853] transition-colors"
                  >
                    <FaWhatsapp className="w-3.5 h-3.5" />
                    Réserver
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
