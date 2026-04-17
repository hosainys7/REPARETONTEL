import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ModelSearch } from "@/components/model-search";
import { Services } from "@/components/services";
import { About } from "@/components/about";
import { Horaires } from "@/components/horaires";
import { Booking } from "@/components/booking";
import { Faq } from "@/components/faq";
import { MapSection } from "@/components/map";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans selection:bg-primary/20">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ModelSearch />
        <Services />
        <About />
        <Horaires />
        <Booking />
        <Faq />
        <MapSection />
      </main>
      <Footer />
    </div>
  );
}
