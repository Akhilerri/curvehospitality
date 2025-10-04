import { usePageSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Award, Globe, CheckCircle, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// Animated Counter Component
function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return (
    <div ref={counterRef} className="text-3xl md:text-4xl font-bold text-primary">
      {count}{suffix}
    </div>
  );
}

export default function About() {
  usePageSEO(
    'About Us - Karan Kothari USA LLC',
    'Learn about Karan Kothari USA LLC, a distinguished hospitality procurement enterprise renowned for exceptional standards in FF&E manufacturing and interior design.',
    {
      keywords: ['karan kothari usa llc', 'hospitality furniture company', 'FF&E procurement', 'interior design', 'hospitality manufacturing'],
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'About Us', url: '/about' }
      ]
    }
  );

  const stats = [
    { number: 15, suffix: "+", label: "Years of Excellence" },
    { number: 500, suffix: "+", label: "Projects Completed" },
    { number: 50, suffix: "+", label: "Countries Served" },
    { number: 100, suffix: "%", label: "Client Satisfaction" }
  ];

  const services = [
    {
      title: "Custom Manufacturing",
      description: "Case goods, seating, artwork & mirrors, lighting, drapery & bedding, stone countertops, bathroom fixtures & vanities, carpets, and tiles.",
      icon: Building2
    },
    {
      title: "Interior Design",
      description: "Complete interior design solutions tailored to your brand and guest experience requirements.",
      icon: Users
    },
    {
      title: "Global Procurement",
      description: "Extensive network of domestic and offshore manufacturing facilities ensuring quality and competitive pricing.",
      icon: Globe
    },
    {
      title: "Quality Assurance",
      description: "Rigorous quality control processes ensuring the highest standards in every product we deliver.",
      icon: Award
    }
  ];

  const values = [
    "Exceptional quality in every product",
    "Personalized service and attention to detail",
    "Innovative design solutions",
    "Sustainable manufacturing practices",
    "Global reach with local expertise",
    "Commitment to client success"
  ];

  return (
    <div className="page-container bg-background">
      {/* Hero Section */}
      <section className="section-spacing bg-gradient-to-b from-muted/50 to-background">
        <div className="section-container">
          <div className="text-center space-y-6">
            <Badge className="inline-flex items-center gap-2 bg-primary/10 text-primary border-primary/20">
              <Building2 className="w-4 h-4" />
              HOSPITALITY FURNITURE COMPANY
            </Badge>
            <h1 className="text-4xl md:text-6xl font-serif font-light text-foreground leading-tight">
              About Karan Kothari USA LLC
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A distinguished hospitality procurement enterprise renowned for exceptional standards, 
              operating through domestic and offshore manufacturing facilities to deliver an extensive 
              range of high-quality products.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-spacing-sm bg-background">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <AnimatedCounter 
                  end={stat.number} 
                  suffix={stat.suffix}
                  duration={2000 + index * 200} // Stagger the animations
                />
                <div className="text-sm text-muted-foreground font-medium mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-spacing bg-background">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <div className="mb-6">
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                  Our Story
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6">
                Karan Kothari USA LLC Quality Excellence
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Karan Kothari USA LLC is a distinguished hospitality procurement enterprise that is renowned 
                  for its exceptional standards. Our company operates through domestic and offshore 
                  manufacturing facilities to deliver an extensive range of high-quality products.
                </p>
                <p>
                  We specialize in custom manufacturing of case goods, seating, artwork & mirrors, 
                  lighting, drapery & bedding, stone countertops, bathroom fixtures & vanities, 
                  carpets, and tiles. At Karan Kothari USA LLC, we ensure that all client needs and 
                  preferences are met with precision and excellence.
                </p>
                <p>
                  Our commitment to quality, innovation, and client satisfaction has established us 
                  as a trusted partner in the hospitality industry worldwide.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop"
                alt="Karan Kothari USA LLC manufacturing facility"
                className="rounded-lg shadow-lg w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
            </div>
          </div>

          {/* Services Grid */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-serif font-light text-foreground mb-4">
                Our Expertise
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive solutions for all your hospitality furniture and design needs
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card key={index} className="p-6 hover-elevate transition-all duration-300 group">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h4 className="text-xl font-semibold text-foreground mb-3">
                      {service.title}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Values Section */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop"
                alt="Karan Kothari USA LLC team at work"
                className="rounded-lg shadow-lg w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
            </div>
            <div>
              <div className="mb-6">
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                  Our Values
                </span>
              </div>
              <h3 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6">
                What Drives Us
              </h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our values guide every decision we make and every product we create. 
                They represent our commitment to excellence and our dedication to our clients.
              </p>
              <div className="space-y-3">
                {values.map((value, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h3 className="text-3xl md:text-4xl font-serif font-light text-foreground mb-6">
            Ready to Transform Your Space?
          </h3>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Let's discuss how Karan Kothari USA LLC can bring your vision to life with our 
            exceptional products and services.
          </p>
          <div className="flex justify-center">
            <Button size="lg" className="px-8 py-4 text-lg font-semibold" asChild>
              <a href="/contact">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}