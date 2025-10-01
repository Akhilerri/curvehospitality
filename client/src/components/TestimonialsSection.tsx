import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      quote:
        "We are always successful when Curve is the design firm partnered with us. As a national General Contractor, we have had experience working with other hospitality design firms, but we absolutely prefer to work with you over any other.",
      author: "Marco Genio",
      role: "General Contractor",
    },
    {
      id: 2,
      quote:
        "Curve Hospitality has consistently demonstrated excellence in their projects. The quality of their work, showcasing meticulous attention to detail and superior craftsmanship, is evident in every project they undertake.",
      author: "Surpreet Singh",
      role: "Hotel Developer",
    },
    {
      id: 3,
      quote:
        "I would like to say this from the bottom of my heart, for doing a wonderful job on my three projects. Christina was very great at her designs picking up the colors and the whole package. I will greatly recommend your company.",
      author: "Paul Patel",
      role: "Hotel Owner",
    },
    {
      id: 4,
      quote:
        "My experience with Curve was very positive from the initial meetings with the designer, to the negotiations with management, to the final product delivered to the hotel. Christina had an excellent taste and forward vision.",
      author: "Bruno Cencini",
      role: "Hospitality Executive",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary mb-4 block">
            Client Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6">
            What Our Clients Say
          </h2>
        </div>

        <Card className="p-8 md:p-12 relative">
          <Quote className="h-12 w-12 text-primary/20 absolute top-8 left-8" />
          <div className="relative z-10">
            <blockquote className="text-xl md:text-2xl font-serif text-foreground mb-8 leading-relaxed">
              "{testimonials[currentIndex].quote}"
            </blockquote>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-foreground text-lg">
                  {testimonials[currentIndex].author}
                </div>
                <div className="text-muted-foreground">
                  {testimonials[currentIndex].role}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevTestimonial}
                  data-testid="button-prev-testimonial"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextTestimonial}
                  data-testid="button-next-testimonial"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-border hover-elevate"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                data-testid={`button-testimonial-dot-${index}`}
              />
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}
