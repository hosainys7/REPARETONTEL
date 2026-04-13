import { FaTiktok, FaSnapchatGhost } from "react-icons/fa";
import { Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="lg:col-span-1">
            <a href="#" className="text-2xl font-bold tracking-tight text-white mb-4 block">
              Réparetontel<span className="text-primary text-3xl leading-none">.</span>
            </a>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Votre expert réparation de téléphone à domicile à Marseille. Intervention rapide, service fiable.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <FaTiktok className="w-4 h-4" />
                <span className="sr-only">TikTok</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#FFFC00] hover:text-slate-900 transition-colors">
                <FaSnapchatGhost className="w-4 h-4" />
                <span className="sr-only">Snapchat</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Liens rapides</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Accueil</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">À propos</a></li>
              <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
              <li><a href="#booking" className="hover:text-primary transition-colors">Réservation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Marseille, France<br/>(Service à domicile uniquement)</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+33605557812" className="hover:text-white transition-colors">+33 6 05 55 78 12</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Besoin d'une réparation ?</h4>
            <p className="text-sm mb-4">Contactez-nous directement pour obtenir un devis rapide.</p>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white">
              <a href="#whatsapp">
                Réserver maintenant
              </a>
            </Button>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Réparetontel. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}