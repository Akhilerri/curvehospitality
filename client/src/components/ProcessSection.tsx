import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import conceptImage from "@assets/generated_images/Design_concept_development_materials_ab1d3994.png";
import renderingImage from "@assets/generated_images/3D_rendering_design_process_4a261b0f.png";
import manufacturingImage from "@assets/generated_images/Furniture_manufacturing_quality_control_7e52c474.png";

export function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Concept Design",
      description:
        "We take a comprehensive approach to design conceptualization by incorporating your brand standards and vision into every detail.",
      image: conceptImage,
    },
    {
      number: "02",
      title: "Design Development",
      description:
        "In this phase, the design concept is transformed into conceptual drawings and detailed specifications.",
      image: null,
    },
    {
      number: "03",
      title: "Space Planning",
      description:
        "Upon completion of the due diligence in proper design development, we create detailed space plans for optimal functionality.",
      image: null,
    },
    {
      number: "04",
      title: "3D Model Rendering",
      description:
        "Upon approval of the design concept and space planning, we create photorealistic 3D renderings of your project.",
      image: renderingImage,
    },
    {
      number: "05",
      title: "Model Room",
      description:
        "In order to test the design in an actual space, we create a full-scale model room for your review and approval.",
      image: null,
    },
    {
      number: "06",
      title: "Procurement",
      description:
        "Our dedicated Procurement Agent will serve as your liaison between design vision and manufacturing reality.",
      image: null,
    },
    {
      number: "07",
      title: "Manufacturing & Quality Control",
      description:
        "We employ a team of highly skilled technicians with expertise in furniture manufacturing and rigorous quality control.",
      image: manufacturingImage,
    },
    {
      number: "08",
      title: "Delivery",
      description:
        "Our Logistics team offers a comprehensive solution that seamlessly integrates warehousing, delivery, and installation.",
      image: null,
    },
    {
      number: "09",
      title: "Customer Support",
      description:
        "At Curve Hospitality, we are dedicated to providing our clients with exceptional ongoing support and service.",
      image: null,
    },
  ];

  return (
    <section id="process" className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary mb-4 block">
            Our Process
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6">
            From Concept to Completion
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive 9-step process ensures exceptional results from
            initial concept through final delivery and ongoing support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="group overflow-hidden hover-elevate transition-all duration-300"
              data-testid={`card-process-${index}`}
            >
              {step.image && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl font-serif font-light text-primary/20">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mb-4">{step.description}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="group/btn p-0 h-auto"
                  data-testid={`button-explore-${index}`}
                >
                  <span className="text-primary">Explore</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
