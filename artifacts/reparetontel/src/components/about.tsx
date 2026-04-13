import { motion } from "framer-motion";
import { CheckCircle2, Clock, ShieldCheck } from "lucide-react";

export function About() {
  const features = [
    {
      icon: <CheckCircle2 className="w-6 h-6 text-primary" />,
      title: "Service à domicile",
      desc: "Nous nous déplaçons chez vous ou sur votre lieu de travail."
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: "Intervention rapide",
      desc: "La majorité des réparations effectuées en moins de 30 minutes."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      title: "Relation de confiance",
      desc: "Pièces de qualité et technicien certifié pour votre tranquillité."
    }
  ];

  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">À propos</h2>
            <div className="w-20 h-1.5 bg-primary rounded-full mb-8"></div>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              <strong className="text-foreground font-semibold">Réparetontel</strong> propose un service de proximité à Marseille pour la réparation, la vente, le rachat et les accessoires de téléphones. Le service se fait à domicile avec un accompagnement sérieux, rapide et professionnel.
            </p>
            
            <div className="space-y-6">
              {features.map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative">
              <div className="absolute inset-0 bg-primary/20 z-10 mix-blend-overlay"></div>
              {/* Using a solid color placeholder as image is not provided for this specific section, could use generate_image if needed, but a clean UI element works too */}
              <div className="w-full h-full bg-gray-100 flex items-center justify-center p-8">
                <div className="w-full h-full border-4 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-center p-8 bg-white shadow-sm">
                   <ShieldCheck className="w-20 h-20 text-primary mb-4 opacity-20" />
                   <h3 className="text-2xl font-bold text-gray-800 mb-2">Technicien Expert</h3>
                   <p className="text-gray-500 max-w-xs">Votre appareil est entre de bonnes mains. Réparation premium à Marseille.</p>
                </div>
              </div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-black text-primary">100%</div>
                <div className="text-sm font-medium text-gray-600 leading-tight">
                  Satisfaction<br />Client
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}