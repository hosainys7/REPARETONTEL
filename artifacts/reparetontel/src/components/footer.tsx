import { FaTiktok, FaWhatsapp } from "react-icons/fa6";
import { FaSnapchat } from "react-icons/fa";
import { Phone } from "lucide-react";
import { selectorNav, smoothScrollToHash, scrollToTop } from "@/lib/selectorBus";

function navStandard(hash: string) {
  selectorNav({ kind: "reset" });
  setTimeout(() => smoothScrollToHash(hash), 30);
}
function navHome() {
  selectorNav({ kind: "reset" });
  setTimeout(() => scrollToTop(), 30);
}
function navRepairsRoot() {
  selectorNav({ kind: "open-selector" });
}
function navAccessoiresRoot() {
  selectorNav({ kind: "open-accessory" });
}

export function Footer() {
  const handleHome = (e: React.MouseEvent) => { e.preventDefault(); navHome(); };
  const handleRepairs = (e: React.MouseEvent) => { e.preventDefault(); navRepairsRoot(); };
  const handleAccessoires = (e: React.MouseEvent) => { e.preventDefault(); navAccessoiresRoot(); };
  const handleStandard = (hash: string) => (e: React.MouseEvent) => { e.preventDefault(); navStandard(hash); };
  return (
    <footer className="bg-[#0f172a] text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 max-w-5xl mx-auto">
          
          <div>
            <a href="#" onClick={handleHome} className="text-2xl font-bold tracking-tight mb-4 block">
              RÉPARE-TONTEL13<span className="text-primary">.</span>
            </a>
            <div className="flex items-center gap-3 text-slate-300 font-medium mb-6">
              <Phone className="w-5 h-5 text-primary" />
              <a href="tel:+33605557812" className="hover:text-white transition-colors">+33 6 05 55 78 12</a>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Le service premium de réparation de téléphone à domicile à Marseille. Rapide, fiable et garanti.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Liens rapides</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="#selector"    onClick={handleRepairs}            className="hover:text-white transition-colors">Réparations</a></li>
              <li><a href="#accessoires" onClick={handleAccessoires}        className="hover:text-white transition-colors">Accessoires</a></li>
              <li><a href="#services"    onClick={handleStandard("#services")} className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#about"       onClick={handleStandard("#about")}    className="hover:text-white transition-colors">À propos</a></li>
              <li><a href="#booking"     onClick={handleStandard("#booking")}  className="hover:text-white transition-colors">Réserver</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-6">Réseaux sociaux</h4>
            <div className="flex flex-col gap-4">
              <a
                href="https://wa.me/33605557812"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-[#25D366]">
                  <FaWhatsapp className="w-4 h-4" />
                </div>
                WhatsApp
              </a>
              <a
                href="https://www.tiktok.com/@reparetontel13"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                  <FaTiktok className="w-4 h-4" />
                </div>
                TikTok
              </a>
              <a
                href="https://www.snapchat.com/add/repare-tontel13"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-[#FFFC00]">
                  <FaSnapchat className="w-4 h-4 text-black" />
                </div>
                Snapchat
              </a>
            </div>
          </div>

        </div>

        <div className="max-w-5xl mx-auto pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} RÉPARE-TONTEL13. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#legal" className="hover:text-slate-300 transition-colors">Mentions légales</a>
          </div>
        </div>
      </div>
    </footer>
  );
}