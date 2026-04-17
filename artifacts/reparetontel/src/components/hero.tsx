import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTiktok, FaSnapchatGhost } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const SLIDES = [
  { id: 1, src: "/slider-1.png" },
  { id: 2, src: "/slider-2.png" },
  { id: 3, src: "/slider-3.png" },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-black">
      <AnimatePresence mode="sync">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/55 z-10" />
          <img
            src={SLIDES[currentSlide].src}
            alt="Réparation de téléphone à Marseille"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 container mx-auto h-full flex flex-col justify-center px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-xs font-semibold text-white mb-8 tracking-widest uppercase">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <motion.span
                  animate={{ scale: [1, 1.8, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
                />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_6px_2px_rgba(74,222,128,0.6)]" />
              </span>
              Déplacement sur tout Marseille &amp; alentours
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6 uppercase"
          >
            intervention rapide à Marseille
            N’ATTENDEZ PLUS POUR RÉSERVER
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-5 text-lg md:text-2xl text-white/90 font-light italic"
          >
            Un café, un croissant… et un téléphone réparé !
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{ pointerEvents: "auto" }}
            className="relative z-30 mt-4 flex items-center justify-center gap-4"
          >
            <a
              href="https://www.tiktok.com/@reparetontel13"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              style={{ pointerEvents: "auto" }}
              className="relative z-30 inline-flex items-center justify-center w-9 h-9 rounded-full text-white/80 hover:text-white hover:bg-white/15 hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              <FaTiktok className="w-4 h-4" />
            </a>
            <a
              href="https://www.snapchat.com/add/repare-tontel13"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Snapchat"
              style={{ pointerEvents: "auto" }}
              className="relative z-30 inline-flex items-center justify-center w-9 h-9 rounded-full text-white/80 hover:text-white hover:bg-white/15 hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              <FaSnapchatGhost className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-4 text-base md:text-lg text-gray-200 font-light"
          >
            Service de réparation de téléphones à domicile, rapide et professionnel.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="rounded-full w-full sm:w-auto px-8 h-14 text-base bg-primary hover:bg-primary/90 text-white font-semibold">
              <a href="#selector">Réserver maintenant</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full w-full sm:w-auto px-8 h-14 text-base bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white font-semibold backdrop-blur-sm">
              <a href="#services">Voir les réparations</a>
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2.5 rounded-full transition-all duration-500 ${
              idx === currentSlide ? "bg-white w-8" : "bg-white/40 hover:bg-white/60 w-2.5"
            }`}
            aria-label={`Diapositive ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
