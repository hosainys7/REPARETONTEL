import { motion } from "framer-motion";

export function MapSection() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              Déplacement sur tout Marseille
            </h2>
            <p className="text-lg text-muted-foreground">
              Notre technicien intervient directement chez vous ou sur votre lieu de travail.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden shadow-sm border border-gray-200 h-[400px] w-full relative bg-gray-50"
          >
            <iframe 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              scrolling="no" 
              marginHeight={0} 
              marginWidth={0} 
              src="https://www.openstreetmap.org/export/embed.html?bbox=5.2,43.2,5.5,43.4&layer=mapnik"
              className="absolute inset-0 grayscale contrast-125 opacity-80 mix-blend-multiply pointer-events-none"
              title="Carte de Marseille"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
}