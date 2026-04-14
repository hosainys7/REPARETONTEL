import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Products } from "@/components/products";
import { Services } from "@/components/services";
import { About } from "@/components/about";
import { Booking } from "@/components/booking";
import { MapSection } from "@/components/map";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans selection:bg-primary/20">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Products />
        <Services />
        <About />
        <Booking />
        <MapSection />
      </main>
      <Footer />
    </div>
  );
}