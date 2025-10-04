
import { Link } from "wouter";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { ProcessSection } from "@/components/ProcessSection";
import { ProjectsGallery } from "@/components/ProjectsGallery";
import { EventsSection } from "@/components/EventsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { AwardsSection } from "@/components/AwardsSection";
import { QuoteForm } from "@/components/QuoteForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Building2, Palette, Package, FolderOpen, Settings, BookOpen, Phone } from "lucide-react";
import { useHomeSEO } from "@/hooks/useSEO";

// Quick navigation cards for main sections
const sectionCards = [
  {
    title: "About Us",
    description: "Learn about our company history, team, and values",
    icon: Building2,
    href: "/about",
    color: "text-blue-600"
  },
  {
    title: "Services",
    description: "Manufacturing, Interior Design, Procurement & Project Management",
    icon: Palette,
    href: "/services",
    color: "text-green-600"
  },
  {
    title: "Products",
    description: "Browse our comprehensive catalog of furniture and fixtures",
    icon: Package,
    href: "/products",
    color: "text-purple-600"
  },
  {
    title: "Portfolio",
    description: "View our completed projects and case studies",
    icon: FolderOpen,
    href: "/portfolio",
    color: "text-orange-600"
  },
  {
    title: "Process",
    description: "Understand how we work and what to expect",
    icon: Settings,
    href: "/process",
    color: "text-teal-600"
  },
  {
    title: "Resources",
    description: "Access our blog, insights, and downloadable guides",
    icon: BookOpen,
    href: "/resources",
    color: "text-indigo-600"
  },
  {
    title: "Contact",
    description: "Get in touch for consultations and quotes",
    icon: Phone,
    href: "/contact",
    color: "text-red-600"
  }
];

export default function Home() {
  useHomeSEO();

  return (
    <>
      <Hero />
      
      {/* Quick Navigation Section */}
      <section className="section-spacing bg-muted/50">
        <div className="section-container">
          <div className="section-header">
            <h2 className="text-3xl font-bold mb-4">Explore Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover everything we offer, from our comprehensive services to our extensive product catalog
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {sectionCards.map((card) => {
              const Icon = card.icon;
              return (
                <Card key={card.href} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 touch-manipulation">
                  <CardHeader className="pb-3 p-4 sm:p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${card.color}`} />
                      <CardTitle className="text-base sm:text-lg">{card.title}</CardTitle>
                    </div>
                    <CardDescription className="text-xs sm:text-sm">
                      {card.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 p-4 sm:p-6">
                    <Button asChild variant="ghost" className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground transition-colors text-sm">
                      <Link href={card.href}>
                        Learn More
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <AboutSection />
      <ProcessSection />
      <ProjectsGallery />
      <EventsSection />
      <TestimonialsSection />
      <AwardsSection />
      <QuoteForm />
    </>
  );
}
