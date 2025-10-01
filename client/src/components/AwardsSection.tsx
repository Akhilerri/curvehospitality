import { Badge } from "@/components/ui/badge";

export function AwardsSection() {
  const awards = [
    {
      name: "Solar Design & Installation Award",
      badge: "WINNER",
      subtitle: "UNDER 100 KW",
      color: "from-orange-500 to-orange-600",
    },
    {
      name: "No.1 Solar Installer 2023",
      badge: "No.1",
      subtitle: "Solar Installer 2023 QLD 40-100KW",
      color: "from-amber-400 to-amber-600",
    },
    {
      name: "Clean Energy Projects of the Year",
      badge: "FINALIST",
      subtitle: "STATE EXCELLENCE AWARDS 2024",
      color: "from-green-500 to-green-600",
    },
    {
      name: "Inc. 5000 Fastest Growing",
      badge: "INC 5000",
      subtitle: "FASTEST GROWING COMPANIES",
      color: "from-primary to-primary",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
            <span className="w-2 h-2 rounded-full bg-primary mr-2" />
            AWARDS
          </Badge>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6">
            Curve's recent awards
            <br />
            and <span className="text-primary font-normal">achievement</span>
          </h2>
          <div className="w-32 h-1 bg-primary mx-auto mb-8 rounded-full" />
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our mission is to provide contemporary design, exceptional service,
            and quality manufactured FF&E to the hospitality industry. Our
            dedication to excellence has been recognized by industry leaders.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-start justify-items-center mb-12">
          {awards.map((award, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
              data-testid={`award-${index}`}
            >
              <div
                className={`w-40 h-40 rounded-full bg-gradient-to-br ${award.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-105 transition-transform duration-300`}
              >
                <div className="text-white">
                  <div className="text-2xl font-bold mb-1">{award.badge}</div>
                  <div className="text-xs px-4 leading-tight">
                    {award.subtitle}
                  </div>
                </div>
              </div>
              <h3 className="text-sm font-medium text-foreground max-w-[200px]">
                {award.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
