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
            
            <div className="space-y-4 mb-12">
              <p className="text-xl text-muted-foreground leading-relaxed">
                <strong className="text-primary font-semibold">RÉPARE-TONTEL13</strong> propose un service de réparation de téléphones à domicile à Marseille et alentours. Nous intervenons rapidement sur les pannes les plus fréquentes&nbsp;: écran, batterie, caméra, connecteur et autres réparations du quotidien.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nous prenons en charge plusieurs marques comme <strong className="text-primary font-medium">iPhone, Samsung, Huawei, Google Pixel, Xiaomi</strong> et <strong className="text-primary font-medium">Redmi</strong>. Notre objectif est simple&nbsp;: vous offrir un service fiable, rapide et pratique, où que vous soyez.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
              {[
                "Service à domicile",
                "Disponible 24h/24",
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