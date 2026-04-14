import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-8">
              L'expertise mobile à votre porte
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              <strong className="text-foreground font-semibold">Réparetontel</strong> propose un service de réparation de téléphones à domicile à Marseille. Intervention rapide, service fiable et accompagnement professionnel pour redonner vie à vos appareils.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
              {[
                "Service à domicile",
                "Intervention rapide",
                "Relation de confiance"
              ].map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">{badge}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}