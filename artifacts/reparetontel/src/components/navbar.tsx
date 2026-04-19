import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import {
  Menu, X, ChevronDown, Smartphone, Watch, Headphones,
  Cable as CableIcon, Zap as ZapIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsAppQuote } from "@/data/repairCatalog";

type RepairLink =
  | { name: string; type: "select"; href: string; color: string; icon: typeof Smartphone }
  | { name: string; type: "wa"; waBrand: string; color: string; icon: typeof Smartphone };

const REPAIR_LINKS: RepairLink[] = [
  { name: "iPhone",       type: "select", href: "#repairs/iphone",  color: "#1d1d1f", icon: Smartphone },
  { name: "Samsung",      type: "select", href: "#repairs/samsung", color: "#1428A0", icon: Smartphone },
  { name: "Huawei",       type: "wa",     waBrand: "Huawei",        color: "#CF0A2C", icon: Smartphone },
  { name: "Redmi",        type: "wa",     waBrand: "Redmi",         color: "#e02020", icon: Smartphone },
  { name: "Google Pixel", type: "wa",     waBrand: "Google Pixel",  color: "#1a73e8", icon: Smartphone },
  { name: "Xiaomi",       type: "wa",     waBrand: "Xiaomi",        color: "#FF6900", icon: Smartphone },
];

const ACCESSORY_LINKS = [
  { name: "Apple Watch",          href: "#accessoires/apple-watch",  icon: Watch       },
  { name: "Samsung Galaxy Watch", href: "#accessoires/galaxy-watch", icon: Watch       },
  { name: "AirPods",              href: "#accessoires/airpods",      icon: Headphones  },
  { name: "Chargeurs",            href: "#accessoires/chargeurs",    icon: ZapIcon     },
  { name: "Câbles",               href: "#accessoires/cables",       icon: CableIcon   },
];

const TOP_LINKS = [
  { name: "Accueil",     href: "#"          },
  { name: "Services",    href: "#services"  },
  { name: "À propos",    href: "#about"     },
  { name: "Réservation", href: "#booking"   },
];

// Force a hashchange even when the same hash is re-clicked
function navigateHash(hash: string) {
  if (typeof window === "undefined") return;
  if (window.location.hash === hash) {
    // reset, then re-apply on next tick so the listener fires again
    history.replaceState(null, "", window.location.pathname + window.location.search);
    setTimeout(() => { window.location.hash = hash; }, 0);
  } else {
    window.location.hash = hash;
  }
}

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"repairs" | "accessoires" | null>(null);
  const [mobileSection, setMobileSection] = useState<"repairs" | "accessoires" | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 20));

  // Outside-click close for desktop dropdowns
  useEffect(() => {
    function onDocClick() { setOpenDropdown(null); }
    if (openDropdown) {
      document.addEventListener("click", onDocClick);
      return () => document.removeEventListener("click", onDocClick);
    }
  }, [openDropdown]);

  function openMenu(name: "repairs" | "accessoires") {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(name);
  }
  function scheduleClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150);
  }

  function handleRepairLink(e: React.MouseEvent, link: RepairLink) {
    e.preventDefault();
    setOpenDropdown(null);
    setIsOpen(false);
    if (link.type === "wa") {
      window.open(whatsAppQuote(link.waBrand), "_blank", "noopener,noreferrer");
    } else {
      navigateHash(link.href);
    }
  }
  function handleAccessoryLink(e: React.MouseEvent, href: string) {
    e.preventDefault();
    setOpenDropdown(null);
    setIsOpen(false);
    navigateHash(href);
  }

  const navLinkClass = (active: boolean) =>
    `text-sm font-medium whitespace-nowrap transition-colors ${
      scrolled
        ? `text-foreground/70 hover:text-primary ${active ? "text-primary" : ""}`
        : `text-white/85 hover:text-white ${active ? "text-white" : ""}`
    }`;

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ backgroundColor: "rgba(255,255,255,0)", borderBottom: "1px solid rgba(255,255,255,0)" }}
        animate={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0)",
          borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid rgba(255,255,255,0)",
          backdropFilter: scrolled ? "blur(14px)" : "blur(0px)",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center h-20 gap-8">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 shrink-0">
              <img src="/logo.jpeg" alt="RÉPARE-TONTEL13 logo" className="h-8 w-8 rounded-lg object-contain shrink-0" />
              <span className={`text-xs font-bold tracking-[0.12em] uppercase transition-colors duration-300 whitespace-nowrap ${scrolled ? "text-foreground" : "text-white"}`}>
                RÉPARE-TONTEL13
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-7 flex-1 justify-center">
              <a href="#" className={navLinkClass(false)}>Accueil</a>

              {/* RÉPARATIONS DROPDOWN */}
              <div
                className="relative"
                onMouseEnter={() => openMenu("repairs")}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === "repairs" ? null : "repairs"); }}
                  className={`${navLinkClass(openDropdown === "repairs")} flex items-center gap-1`}
                  aria-expanded={openDropdown === "repairs"}
                >
                  Réparations
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === "repairs" ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {openDropdown === "repairs" && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="w-[280px] rounded-2xl bg-white border border-gray-100 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.18)] p-3">
                        <div className="px-3 pt-1 pb-2">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-primary">Réparations</div>
                          <div className="text-xs text-muted-foreground mt-0.5">Choisissez votre marque</div>
                        </div>
                        <ul className="flex flex-col">
                          {REPAIR_LINKS.map((link) => {
                            const Icon = link.icon;
                            return (
                              <li key={link.name}>
                                <a
                                  href={link.type === "select" ? link.href : "#"}
                                  onClick={(e) => handleRepairLink(e, link)}
                                  className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/5 transition-colors duration-150 cursor-pointer"
                                >
                                  <span className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${link.color}10` }}>
                                    <Icon className="w-4 h-4" style={{ color: link.color }} />
                                  </span>
                                  <span className="flex-1 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                    {link.name}
                                  </span>
                                  {link.type === "wa" && (
                                    <span className="text-[10px] font-bold text-primary uppercase tracking-wide">Devis</span>
                                  )}
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ACCESSOIRES DROPDOWN */}
              <div
                className="relative"
                onMouseEnter={() => openMenu("accessoires")}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setOpenDropdown(openDropdown === "accessoires" ? null : "accessoires"); }}
                  className={`${navLinkClass(openDropdown === "accessoires")} flex items-center gap-1`}
                  aria-expanded={openDropdown === "accessoires"}
                >
                  Accessoires
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${openDropdown === "accessoires" ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {openDropdown === "accessoires" && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="w-[280px] rounded-2xl bg-white border border-gray-100 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.18)] p-3">
                        <div className="px-3 pt-1 pb-2">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-primary">Accessoires</div>
                          <div className="text-xs text-muted-foreground mt-0.5">Réparations & produits</div>
                        </div>
                        <ul className="flex flex-col">
                          {ACCESSORY_LINKS.map((link) => {
                            const Icon = link.icon;
                            return (
                              <li key={link.name}>
                                <a
                                  href={link.href}
                                  onClick={(e) => handleAccessoryLink(e, link.href)}
                                  className="group flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/5 transition-colors duration-150 cursor-pointer"
                                >
                                  <span className="w-8 h-8 rounded-lg bg-[#eff6ff] flex items-center justify-center">
                                    <Icon className="w-4 h-4 text-primary" />
                                  </span>
                                  <span className="flex-1 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                    {link.name}
                                  </span>
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {TOP_LINKS.slice(1).map((link) => (
                <a key={link.name} href={link.href} className={navLinkClass(false)}>{link.name}</a>
              ))}
            </nav>

            <div className="hidden md:flex items-center shrink-0 ml-auto">
              <Button asChild className="rounded-full px-6 h-9 text-sm font-semibold shadow-md bg-primary hover:bg-primary/90 text-white">
                <a href="#booking">Réserver</a>
              </Button>
            </div>

            <button className="md:hidden p-2 ml-auto" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
              {isOpen ? <X className={scrolled || isOpen ? "text-foreground" : "text-white"} /> : <Menu className={scrolled ? "text-foreground" : "text-white"} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden overflow-y-auto"
          >
            <nav className="flex flex-col gap-1 max-w-sm mx-auto">
              <MobileLink href="#" label="Accueil" onClick={() => setIsOpen(false)} />

              <MobileAccordion
                label="Réparations"
                isOpen={mobileSection === "repairs"}
                onToggle={() => setMobileSection(mobileSection === "repairs" ? null : "repairs")}
              >
                {REPAIR_LINKS.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.type === "select" ? link.href : "#"}
                      onClick={(e) => handleRepairLink(e, link)}
                      className="flex items-center gap-3 py-2.5 pl-3 pr-2 rounded-lg hover:bg-primary/5 transition-colors"
                    >
                      <span className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: `${link.color}10` }}>
                        <Icon className="w-3.5 h-3.5" style={{ color: link.color }} />
                      </span>
                      <span className="text-base font-medium text-foreground">{link.name}</span>
                      {link.type === "wa" && (
                        <span className="ml-auto text-[10px] font-bold text-primary uppercase tracking-wide">Devis</span>
                      )}
                    </a>
                  );
                })}
              </MobileAccordion>

              <MobileAccordion
                label="Accessoires"
                isOpen={mobileSection === "accessoires"}
                onToggle={() => setMobileSection(mobileSection === "accessoires" ? null : "accessoires")}
              >
                {ACCESSORY_LINKS.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleAccessoryLink(e, link.href)}
                      className="flex items-center gap-3 py-2.5 pl-3 pr-2 rounded-lg hover:bg-primary/5 transition-colors"
                    >
                      <span className="w-7 h-7 rounded-md bg-[#eff6ff] flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5 text-primary" />
                      </span>
                      <span className="text-base font-medium text-foreground">{link.name}</span>
                    </a>
                  );
                })}
              </MobileAccordion>

              {TOP_LINKS.slice(1).map((link) => (
                <MobileLink key={link.name} href={link.href} label={link.name} onClick={() => setIsOpen(false)} />
              ))}

              <div className="mt-6">
                <Button asChild size="lg" className="rounded-full w-full font-semibold bg-primary text-white">
                  <a href="#booking" onClick={() => setIsOpen(false)}>Réserver maintenant</a>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MobileLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="block py-3 px-3 rounded-xl text-lg font-semibold text-foreground hover:bg-gray-50 transition-colors"
    >
      {label}
    </a>
  );
}

function MobileAccordion({
  label, isOpen, onToggle, children,
}: { label: string; isOpen: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className="border-b border-gray-100">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between py-3 px-3 rounded-xl text-lg font-semibold text-foreground hover:bg-gray-50 transition-colors"
      >
        {label}
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-3 pl-2 flex flex-col">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
