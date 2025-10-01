import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { ProcessSection } from "@/components/ProcessSection";
import { ProjectsGallery } from "@/components/ProjectsGallery";
import { EventsSection } from "@/components/EventsSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { AwardsSection } from "@/components/AwardsSection";
import { QuoteForm } from "@/components/QuoteForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <AboutSection />
        <ProcessSection />
        <ProjectsGallery />
        <EventsSection />
        <TestimonialsSection />
        <AwardsSection />
        <QuoteForm />
      </main>
      <Footer />
    </div>
  );
}
