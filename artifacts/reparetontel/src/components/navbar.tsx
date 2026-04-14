import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  const links = [
    { name: "Accueil", href: "#" },
    { name: "Produits", href: "#products" },
    { name: "Services", href: "#services" },
    { name: "À propos", href: "#about" },
    { name: "Réservation", href: "#booking" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ backgroundColor: "rgba(255, 255, 255, 0)", borderBottom: "1px solid rgba(255,255,255,0)" }}
        animate={{
          backgroundColor: scrolled ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0)",
          borderBottom: scrolled ? "1px solid rgba(0, 0, 0, 0.05)" : "1px solid rgba(255,255,255,0)",
          backdropFilter: scrolled ? "blur(12px)" : "blur(0px)",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="#" className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${scrolled ? "text-foreground" : "text-white"}`}>
              Réparetontel<span className="text-primary">.</span>
            </a>

            <nav className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    scrolled ? "text-foreground/70" : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="hidden md:block">
              <Button asChild className="rounded-full px-6 font-semibold shadow-md bg-primary hover:bg-primary/90 text-white">
                <a href="#whatsapp">Réserver</a>
              </Button>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
            >
              {isOpen ? (
                <X className={scrolled || isOpen ? "text-foreground" : "text-white"} />
              ) : (
                <Menu className={scrolled ? "text-foreground" : "text-white"} />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-4 md:hidden"
          >
            <nav className="flex flex-col gap-6 text-center">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-semibold text-foreground tracking-tight"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="mt-8">
                <Button asChild size="lg" className="rounded-full w-full font-semibold bg-primary text-white">
                  <a href="#whatsapp" onClick={() => setIsOpen(false)}>Réserver maintenant</a>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}