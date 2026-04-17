import { motion } from "framer-motion";
import { Monitor, BatteryFull, Camera, Zap, Shield, Activity, ArrowRight } from "lucide-react";

type Service = {
  type: string;
  summary: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
};

const SERVICES: Service[] = [
  {
    type: "Écran",
    summary: "Dalle fissurée ou tactile qui ne répond plus ? Remplacement avec pièces de qualité, en moins d'une heure.",
    icon: Monitor, iconBg: "#f0f7ff", iconColor: "#2563EB",
  },
  {
    type: "Batterie",
    summary: "Autonomie réduite ou téléphone qui s'éteint seul ? Retrouvez une endurance comme neuf.",
    icon: BatteryFull, iconBg: "#f0fdf4", iconColor: "#16a34a",
  },
  {
    type: "Caméra",
    summary: "Photos floues, module cassé ou caméra frontale HS ? Remplacement complet du module photo.",
    icon: Camera, iconBg: "#fdf4ff", iconColor: "#9333ea",
  },
  {
    type: "Connecteur de charge",
    summary: "Port USB-C ou Lightning endommagé, charge intermittente ? Réparation en une intervention.",
    icon: Zap, iconBg: "#fffbeb", iconColor: "#d97706",
  },
  {
    type: "Vitre arrière",
    summary: "Dos fissuré ou éclats de verre ? Remplacement de la vitre arrière directement à domicile.",
    icon: Shield, iconBg: "#fff1f2", iconColor: "#e11d48",
  },
  {
    type: "Diagnostic",
    summary: "Panne inconnue ou comportement anormal ? Analyse complète de votre appareil, sans engagement.",
    icon: Activity, iconBg: "#f0fdfa", iconColor: "#0d9488",
  },
];

function scrollToSelector() {
  document.getElementById("selector")?.scrollIntoView({ behavior: "smooth", block: "start" });
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
              Types d'interventions
            </h2>
            <p className="text-lg text-muted-foreground">
              Six interventions réalisées à domicile sur tous les modèles. Choisissez votre appareil pour voir les tarifs.
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

                <h3 className="text-base font-bold text-foreground leading-tight mb-2">
                  {service.type}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">
                  {service.summary}
                </p>

                <button
                  onClick={scrollToSelector}
                  className="inline-flex items-center justify-center gap-1.5 w-full h-10 rounded-xl border border-primary/20 text-primary text-xs font-bold uppercase tracking-wide hover:bg-primary hover:text-white transition-all duration-200 group/btn"
                >
                  Voir les modèles
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                </button>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <p className="text-sm text-muted-foreground">
            Vous savez déjà ce qu'il vous faut ?{" "}
            <a href="#booking" className="text-primary font-semibold hover:underline">
              Contactez-nous directement
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}
