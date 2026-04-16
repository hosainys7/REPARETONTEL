import { motion } from "framer-motion";
import { Clock, CheckCircle2, MapPin } from "lucide-react";

const AVAILABILITY = [
  {
    icon: CheckCircle2,
    label: "Disponible",
    value: "24h/24",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-100",
  },
  {
    icon: CheckCircle2,
    label: "Intervention",
    value: "7j/7",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-100",
  },
  {
    icon: MapPin,
    label: "Zone",
    value: "Marseille & alentours",
    color: "text-primary",
    bg: "bg-primary/5",
    border: "border-primary/10",
  },
];

export function Horaires() {
  return (
    <section className="py-16 bg-gray-50/60">
      <div className="container mx-auto px-4 md:px-8 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground uppercase">
                Horaires d'ouverture
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-xs font-bold uppercase tracking-widest">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
              </span>
              Ouvert 24h/24 &bull; 7j/7
            </span>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_2px_16px_-6px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden">
            {AVAILABILITY.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className={`flex items-center justify-between px-5 py-4 ${
                    idx < AVAILABILITY.length - 1 ? "border-b border-gray-100" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.bg} border ${item.border}`}
                    >
                      <Icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {item.label}
                    </span>
                  </div>
                  <span className={`text-sm font-bold ${item.color}`}>
                    {item.value}
                  </span>
                </div>
              );
            })}

            <div className="px-5 py-4 bg-gradient-to-r from-green-50 to-primary/5 border-t border-gray-100">
              <p className="text-xs text-center text-muted-foreground font-medium tracking-wide uppercase">
                Réponse rapide garantie — contactez-nous à tout moment
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
