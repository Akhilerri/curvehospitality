import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wrench, Shield, Users, Package } from "lucide-react";
// Try local image first, fallback to stock image
const showroomImage = "/assets/generated_images/Modern_furniture_showroom_display_154964c0.png";
const showroomImageFallback = "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2058&q=80";

export function AboutSection() {
  const features = [
    {
      title: "Custom Manufacturing",
      description:
        "Tailored solutions for every client need with our in-house manufacturing capabilities.",
      icon: Wrench,
      color: "text-blue-600",
    },
    {
      title: "Quality Assurance",
      description:
        "Stringent quality control processes ensuring the highest standards in every product.",
      icon: Shield,
      color: "text-green-600",
    },
    {
      title: "Expert Design Team",
      description:
        "Award-winning interior designers with extensive hospitality industry experience.",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Comprehensive Service",
      description:
        "From concept to delivery, we manage every aspect of your FF&E procurement.",
      icon: Package,
      color: "text-orange-600",
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="mb-4">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                About Karan Kothari USA LLC
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6">
              Curve Quality
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Karan Kothari USA LLC is a distinguished hospitality procurement
              enterprise that is renowned for its exceptional standards. Our
              company operates through domestic and offshore manufacturing
              facilities to deliver an extensive range of high-quality products.
            </p>
            <p className="text-base text-muted-foreground mb-8 leading-relaxed">
              We specialize in custom manufacturing of case goods, seating,
              artwork & mirrors, lighting, drapery & bedding, stone countertops,
              bathroom fixtures & vanities, carpets, and tiles. At Curve
              Hospitality, we ensure that all client needs and preferences are
              met with precision and excellence.
            </p>
            <Button size="lg" asChild data-testid="button-learn-more">
              <a href="#process">Learn More About Our Process</a>
            </Button>
          </div>

          <div className="relative">
            <img
              src={showroomImage}
              alt="Modern furniture showroom"
              className="rounded-lg shadow-lg w-full"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = showroomImageFallback;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-6 hover-elevate transition-all duration-300 group"
                data-testid={`card-feature-${index}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors`}>
                    <Icon className={`h-6 w-6 ${feature.color} group-hover:scale-110 transition-transform`} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
