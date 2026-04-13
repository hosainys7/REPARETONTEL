import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export function Booking() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast({
        title: "Demande envoyée !",
        description: "Nous vous recontacterons dans les plus brefs délais.",
      });
    }, 1000);
  };

  return (
    <section id="booking" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Réservez rapidement</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Contactez-nous directement sur WhatsApp ou envoyez une demande via le formulaire.
              </p>

              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">WhatsApp</h4>
                    <p className="text-sm text-muted-foreground">Réponse en quelques minutes</p>
                  </div>
                </div>
                <Button asChild className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white">
                  <a href="#whatsapp">
                    Discuter sur WhatsApp
                  </a>
                </Button>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Appelez-nous</p>
                  <p className="font-semibold text-lg text-foreground">+33 6 05 55 78 12</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
            >
              <h3 className="text-2xl font-bold mb-6">Demander un devis ou RDV</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet</Label>
                    <Input id="name" required placeholder="Jean Dupont" className="h-12 bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" type="tel" required placeholder="06 12 34 56 78" className="h-12 bg-gray-50" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message ou description du problème</Label>
                  <Textarea 
                    id="message" 
                    required 
                    placeholder="Bonjour, mon écran d'iPhone 13 est cassé..." 
                    className="min-h-[120px] bg-gray-50 resize-none"
                  />
                </div>
                
                <Button type="submit" size="lg" className="w-full h-12 text-base font-semibold" disabled={isSubmitting}>
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