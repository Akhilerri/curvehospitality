import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { 
  ClipboardList, 
  Pencil, 
  Layout, 
  Box, 
  Home, 
  ShoppingCart, 
  Factory, 
  Truck, 
  HeadphonesIcon 
} from "lucide-react";

export default function Process() {
  const processes = [
    {
      id: 1,
      title: "Concept Design",
      description: "We take a comprehensive approach to design conceptualization by incorporating your brand standards and vision into every detail.",
      icon: ClipboardList,
      position: { top: "10%", left: "15%" },
    },
    {
      id: 2,
      title: "Design Development",
      description: "In this phase, the design concept is transformed into conceptual drawings and detailed specifications for approval.",
      icon: Pencil,
      position: { top: "25%", left: "45%" },
    },
    {
      id: 3,
      title: "Space Planning",
      description: "Upon completion of the due diligence in proper design development, we create detailed space plans for optimal functionality.",
      icon: Layout,
      position: { top: "15%", left: "75%" },
    },
    {
      id: 4,
      title: "3D Model Rendering",
      description: "Upon approval of the design concept and space planning, we create photorealistic 3D renderings of your project.",
      icon: Box,
      position: { top: "45%", left: "70%" },
    },
    {
      id: 5,
      title: "Model Room",
      description: "In order to test the design in an actual space, we create a full-scale model room for your review and approval.",
      icon: Home,
      position: { top: "60%", left: "55%" },
    },
    {
      id: 6,
      title: "Procurement",
      description: "Our dedicated Procurement Agent will serve as your liaison between design vision and manufacturing reality.",
      icon: ShoppingCart,
      position: { top: "50%", left: "30%" },
    },
    {
      id: 7,
      title: "Manufacturing & QC",
      description: "We employ a team of highly skilled technicians with expertise in furniture manufacturing and rigorous quality control.",
      icon: Factory,
      position: { top: "70%", left: "15%" },
    },
    {
      id: 8,
      title: "Delivery",
      description: "Our Logistics team offers a comprehensive solution that seamlessly integrates warehousing, delivery, and installation.",
      icon: Truck,
      position: { top: "85%", left: "40%" },
    },
    {
      id: 9,
      title: "Customer Support",
      description: "At Curve Hospitality, we are dedicated to providing our clients with exceptional ongoing support and service.",
      icon: HeadphonesIcon,
      position: { top: "80%", left: "70%" },
    },
  ];

  const pathPoints = [
    "M 15 15",
    "C 25 15, 35 25, 45 25",
    "C 55 25, 65 15, 75 20",
    "C 75 30, 75 40, 70 45",
    "C 65 50, 60 55, 55 60",
    "C 50 60, 40 55, 30 50",
    "C 20 55, 15 65, 15 70",
    "C 20 75, 30 80, 40 85",
    "C 50 85, 60 82, 70 80",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1">
        <section className="py-20 md:py-32 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wider text-primary mb-4 block">
                  FF&E Operation Across The World
                </span>
                <h1 className="text-5xl md:text-6xl font-serif font-light text-foreground mb-6 leading-tight">
                  We have best team
                  <br />
                  and best process
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                  Not need shy far traveling assurance. Resolving neglected. Not thoughts at exercise blessing. Indulged so way everything joy.
                </p>
                <Button size="lg" data-testid="button-get-started">
                  Get Started
                </Button>
              </div>

              <div className="relative h-[600px] hidden lg:block">
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                  <path
                    d={pathPoints.join(" ")}
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                  />
                  {processes.map((process, index) => {
                    const x = parseFloat(process.position.left);
                    const y = parseFloat(process.position.top);
                    return (
                      <circle
                        key={process.id}
                        cx={x}
                        cy={y}
                        r="1.5"
                        fill="hsl(var(--primary))"
                        className="opacity-80"
                      />
                    );
                  })}
                </svg>

                {processes.map((process) => (
                  <div
                    key={process.id}
                    className="absolute"
                    style={{
                      top: process.position.top,
                      left: process.position.left,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="relative group">
                      <div className="w-3 h-3 rounded-full bg-primary absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10" />
                      
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mt-4 w-64 z-20">
                        <div className="bg-card border border-border rounded-lg p-4 shadow-lg">
                          <div className="flex items-start gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <process.icon className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground text-sm mb-1">
                                {process.title}
                              </h3>
                              <p className="text-xs text-muted-foreground leading-relaxed">
                                {process.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {processes.map((process, index) => (
                <div
                  key={process.id}
                  className="bg-card border border-border rounded-lg p-6 hover-elevate transition-all"
                  data-testid={`process-card-${index}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <process.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-primary mb-1">
                        Step {process.id}
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">
                        {process.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {process.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
