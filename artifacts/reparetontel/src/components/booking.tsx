import { useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const WEB3FORMS_ACCESS_KEY = "89540347-d86c-4288-90a4-c3aa04eb8004";

export function Booking() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsSubmitting(true);

    try {
      const formData = new FormData(form);
      formData.append("access_key", WEB3FORMS_ACCESS_KEY);
      formData.append("subject", "Nouvelle demande – Réparetontel13");
      formData.append("from_name", "Site Réparetontel13");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        form.reset();
        toast({
          title: "Demande envoyée !",
          description: "Nous vous recontacterons très rapidement.",
        });
      } else {
        toast({
          title: "Une erreur est survenue",
          description: "Merci de réessayer ou de nous contacter directement sur WhatsApp.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Connexion impossible",
        description: "Vérifiez votre connexion internet, ou contactez-nous sur WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-24 bg-gray-50/80">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                Réservez rapidement
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Contactez-nous directement sur WhatsApp ou remplissez le formulaire pour obtenir un devis.
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 h-full flex flex-col justify-center text-center"
            >
              <div className="w-20 h-20 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mx-auto mb-6">
                <FaWhatsapp className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-4">La méthode la plus rapide</h3>
              <p className="text-muted-foreground mb-4">
                Envoyez-nous une photo de votre appareil ou décrivez le problème. Nous vous répondrons en quelques minutes avec un prix et un créneau.
              </p>
              <p className="text-xl font-bold text-foreground tracking-wide mb-8">
                +33 6 05 55 78 12
              </p>
              <Button asChild size="lg" className="w-full rounded-full h-14 text-base font-semibold bg-[#25D366] hover:bg-[#20bd5a] text-white">
                <a
                  href="https://wa.me/33605557812?text=Bonjour%2C%20je%20souhaite%20obtenir%20un%20devis%20pour%20la%20r%C3%A9paration%20de%20mon%20appareil.%20Pouvez-vous%20m%27aider%20%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discuter sur WhatsApp
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100"
            >
              <h3 className="text-2xl font-bold mb-8 tracking-tight">Formulaire de contact</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot anti-spam (hidden from users, bots fill it) */}
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-semibold">Nom complet</Label>
                  <Input id="name" name="name" required placeholder="Jean Dupont" autoComplete="name" className="h-12 bg-gray-50 border-gray-200 rounded-xl focus-visible:ring-primary/20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
                  <Input id="email" name="email" type="email" required placeholder="jean.dupont@email.com" autoComplete="email" className="h-12 bg-gray-50 border-gray-200 rounded-xl focus-visible:ring-primary/20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-semibold">Téléphone</Label>
                  <Input id="phone" name="phone" type="tel" required placeholder="06 12 34 56 78" autoComplete="tel" className="h-12 bg-gray-50 border-gray-200 rounded-xl focus-visible:ring-primary/20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-semibold">Message ou description</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Bonjour, je souhaite remplacer l'écran de mon..."
                    className="min-h-[120px] bg-gray-50 border-gray-200 rounded-xl resize-none focus-visible:ring-primary/20 p-4"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full h-14 rounded-full text-base font-semibold" disabled={isSubmitting}>
                  {isSubmitting ? "Envoi en cours..." : "Envoyer la demande"}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
