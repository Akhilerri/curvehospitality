import { Users, Settings, Sparkles } from "lucide-react";

export function ProcessSection() {
  const steps = [
    {
      number: 1,
      title: "Concept Design",
      description:
        "It more shed went up is roof if loud. Delay music in lived noise an. Beyond genius really enough passed.",
      icon: Users,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      number: 2,
      title: "Design Development",
      description:
        "Beyond genius really enough passed is up. Up maids me an ample stood given. Certainty say suffering.",
      icon: Settings,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      number: 3,
      title: "Space Planning",
      description:
        "Certainty say suffering her intention promotion. Hill sold just her know collected labore et dolore.",
      icon: Sparkles,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
  ];

  return (
    <section id="process" className="py-20 md:py-32 bg-background">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <div className="text-3xl">✨</div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6">
            Learn More About Process
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto">
            Was are delightful solicitude discovered collecting man day. Resolving
            neglected sir tolerably.
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-[80px] left-[20%] right-[20%] h-0.5">
            <svg
              className="w-full h-full"
              preserveAspectRatio="none"
              viewBox="0 0 100 1"
            >
              <line
                x1="0"
                y1="0.5"
                x2="50"
                y2="0.5"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="2,2"
                className="text-border"
              />
              <line
                x1="50"
                y1="0.5"
                x2="100"
                y2="0.5"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="2,2"
                className="text-border"
              />
            </svg>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center relative"
                data-testid={`process-step-${index}`}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-2xl font-bold text-foreground">
                  {step.number}
                </div>

                <div
                  className={`w-20 h-20 rounded-full ${step.iconBg} flex items-center justify-center mb-6 relative z-10 bg-background border-4 border-background shadow-md`}
                >
                  <step.icon className={`h-10 w-10 ${step.iconColor}`} />
                </div>

                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
