import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQS = [
  {
    q: "Quels téléphones réparez-vous ?",
    a: "Nous réparons plusieurs marques, notamment iPhone, Samsung, Huawei, Google Pixel, Xiaomi et Redmi.",
  },
  {
    q: "Quels types de réparations proposez-vous ?",
    a: "Nous intervenons sur les écrans, batteries, caméras, connecteurs de charge et d'autres réparations courantes.",
  },
  {
    q: "Vous vous déplacez où ?",
    a: "Nous nous déplaçons sur tout Marseille et alentours, selon votre emplacement.",
  },
  {
    q: "Le service est-il à domicile uniquement ?",
    a: "Oui, le service est principalement à domicile, mais nous pouvons aussi intervenir sur votre lieu de travail ou dans un lieu pratique pour vous.",
  },
  {
    q: "Êtes-vous disponibles tous les jours ?",
    a: "Oui, nous sommes disponibles 24h/24 et 7j/7.",
  },
  {
    q: "Comment réserver une réparation ?",
    a: "Vous pouvez réserver directement via WhatsApp ou en envoyant une demande depuis le formulaire du site.",
  },
];

function FaqItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.07)] overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-sm font-semibold text-foreground leading-snug">{q}</span>
        <span className="shrink-0 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center transition-colors duration-200">
          {isOpen ? (
            <Minus className="w-3.5 h-3.5 text-primary" />
          ) : (
            <Plus className="w-3.5 h-3.5 text-primary" />
          )}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 border-t border-gray-100">
              <p className="text-sm text-muted-foreground leading-relaxed pt-3">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-foreground mb-2">
            Questions fréquentes
          </h2>
          <p className="text-muted-foreground text-base">
            Tout ce que vous devez savoir avant de nous contacter.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-3"
        >
          {FAQS.map((faq, idx) => (
            <FaqItem
              key={idx}
              q={faq.q}
              a={faq.a}
              isOpen={openIdx === idx}
              onToggle={() => setOpenIdx(openIdx === idx ? null : idx)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
