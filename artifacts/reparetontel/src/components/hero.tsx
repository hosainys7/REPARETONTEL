import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Wrench, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gray-900/70 z-10" />
        <img
          src="/hero-repair.png"
          alt="Technicien réparant un smartphone"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="container relative z-20 px-4 md:px-6 mx-auto">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center rounded-full bg-primary/20 border border-primary/30 px-3 py-1 text-sm font-medium text-blue-200 mb-6 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
              Service à domicile à Marseille
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Réparation de téléphone à domicile à <span className="text-blue-400">Marseille</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed">
              Intervention rapide, service fiable et prise de rendez-vous simple. Un expert de confiance directement chez vous.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-base font-semibold px-8 h-14 bg-primary hover:bg-primary/90 text-white shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] hover:shadow-[0_0_60px_-15px_rgba(37,99,235,0.7)] transition-all">
                <a href="#whatsapp">
                  Réserver maintenant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base font-semibold px-8 h-14 bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white backdrop-blur-sm">
                <a href="#services">
                  <Wrench className="mr-2 h-5 w-5" />
                  Voir les services
                </a>
              </Button>
            </div>
            
            <div className="mt-12 flex items-center gap-6 text-sm text-gray-300">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-gray-800 bg-gray-700 flex items-center justify-center text-xs font-bold text-white overflow-hidden relative">
                    {/* Placeholder for avatars, using abstract gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-blue-${400+(i*100)} to-blue-${600+(i*100)} opacity-70`}></div>
                    <span className="relative z-10">{String.fromCharCode(64 + i)}</span>
                  </div>
                ))}
              </div>
              <div>
                <p className="font-semibold text-white">Recommandé par +500 clients</p>
                <div className="flex text-yellow-400 text-xs mt-1">
                  {"★★★★★"}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}