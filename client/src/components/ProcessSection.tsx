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
          {/* Dotted line connecting the steps - Desktop only - Behind icons */}
          <div className="hidden md:block absolute top-[94px] left-0 right-0 h-[2px] pointer-events-none z-0">
            <div className="max-w-4xl mx-auto px-[12%] h-full">
              <div className="w-full h-full border-t-2 border-dashed border-gray-400 dark:border-gray-600"></div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center relative"
                data-testid={`process-step-${index}`}
              >
                {/* Step number */}
                <div className="mb-6 text-3xl font-bold text-foreground relative z-20">
                  {step.number}
                </div>

                {/* Icon circle with solid background to cover line */}
                <div className="relative mb-6">
                  {/* Solid white background circle to block the line */}
                  <div className="absolute inset-0 w-24 h-24 -left-2 -top-2 rounded-full bg-background z-10"></div>
                  {/* Icon circle */}
                  <div
                    className={`w-20 h-20 rounded-full ${step.iconBg} flex items-center justify-center relative z-20 shadow-lg`}
                  >
                    <step.icon className={`h-10 w-10 ${step.iconColor}`} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground mb-3 relative z-20">
                  {step.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs relative z-20">
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
