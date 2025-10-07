import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, ArrowUpRight } from "lucide-react";
// High-quality luxury hotel lobby image
const heroImage = "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
const heroImageFallback = "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 sm:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="space-y-6 sm:space-y-8">
            <Badge className="inline-flex items-center gap-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              CUSTOM FF&E NOW AVAILABLE
            </Badge>

            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light text-foreground mb-4 sm:mb-6 leading-[1.1]">
                Exceptional Design for a
                <br className="hidden sm:block" />
                <span className="text-primary font-normal">Better Tomorrow</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Elevate your interior design projects with our sleek,
                customizable solutions built to showcase your creative work and
                captivate clients at first glance.
              </p>
            </div>

            {/* Desktop Buttons */}
            <div className="hidden sm:flex flex-row items-center gap-4">
              <Button size="lg" asChild data-testid="button-get-in-touch">
                <a href="#quote">Get in Touch</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                data-testid="button-view-work"
              >
                <a href="/portfolio">View Our Work</a>
              </Button>
            </div>

            {/* Mobile CTA Section */}
            <div className="flex sm:hidden flex-col gap-4 w-full max-w-sm mx-auto">
              {/* View Our Work Button */}
              <Button
                size="lg"
                variant="outline"
                asChild
                data-testid="button-view-work-mobile"
                className="w-full border-gray-300 dark:border-gray-600"
              >
                <a href="/portfolio" className="flex items-center justify-center">View Our Work</a>
              </Button>
              
              {/* GET STARTED Button */}
              <Button
                size="lg"
                asChild
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl w-full flex items-center justify-center gap-2"
                data-testid="button-get-started-mobile"
              >
                <a href="#quote" className="flex items-center gap-2">
                  GET STARTED
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              </Button>
            </div>

            <div className="pt-8 border-t border-border">
              <p className="text-base sm:text-lg text-muted-foreground mb-4">
                Trusted by <span className="text-primary font-semibold">1,000+</span> companies and customers
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Luxury hotel interior design"
                className="w-full h-full object-cover"
                loading="eager"
                onError={(e) => {
                  e.currentTarget.src = heroImageFallback;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
