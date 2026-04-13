import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

export function MapSection() {
  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-full mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Déplacement sur tout Marseille</h2>
            <p className="text-lg text-muted-foreground">
              Notre service est exclusivement à domicile. Nous couvrons l'ensemble des arrondissements de Marseille.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl overflow-hidden shadow-lg border border-gray-200 h-[400px] w-full max-w-5xl mx-auto relative bg-white"
        >
          <iframe 
            width="100%" 
            height="100%" 
            frameBorder="0" 
            scrolling="no" 
            marginHeight={0} 
            marginWidth={0} 
            src="https://www.openstreetmap.org/export/embed.html?bbox=5.2,43.2,5.5,43.4&layer=mapnik"
            className="absolute inset-0 grayscale contrast-125 opacity-80 mix-blend-multiply"
            title="Carte de Marseille"
          ></iframe>
          <div className="absolute inset-0 bg-blue-500/10 pointer-events-none"></div>
        </motion.div>
      </div>
    </section>
  );
}