import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@assets/generated_images/Luxury_hotel_interior_hero_c7c59af4.png";

export function Hero() {
  const scrollToNext = () => {
    const nextSection = document.getElementById("about");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 text-center">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium uppercase tracking-wider">
            Premier FF&E Procurement
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light text-white mb-6 leading-tight">
          Transform Spaces
          <br />
          <span className="italic">Inspire Lives</span>
        </h1>

        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          Elevate your interior design projects with our sleek, customizable
          templates built to showcase your creative work and captivate clients
          at first glance.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            variant="outline"
            className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20"
            asChild
            data-testid="button-view-portfolio"
          >
            <a href="#projects">View Portfolio</a>
          </Button>
          <Button size="lg" asChild data-testid="button-get-started">
            <a href="#quote">Get Started</a>
          </Button>
        </div>
      </div>

      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/80 hover:text-white transition-colors animate-bounce"
        aria-label="Scroll to next section"
        data-testid="button-scroll-down"
      >
        <ChevronDown className="h-8 w-8" />
      </button>
    </section>
  );
}
