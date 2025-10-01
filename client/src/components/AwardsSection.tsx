export function AwardsSection() {
  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary mb-4 block">
            Recognition
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6">
            Company Awards
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
            Our mission is to provide contemporary design, exceptional service,
            and quality manufactured FF&E to the hospitality industry.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {[
            { name: "Top Interior Design Firm", text: "TOP ID" },
            { name: "Houston Chronicle Award", text: "HC" },
            { name: "Fast 100", text: "FAST 100" },
            { name: "Inc. 5000", text: "INC 5000" },
          ].map((award, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-full h-32 bg-card border border-card-border rounded-lg hover-elevate transition-all duration-300"
              data-testid={`award-${index}`}
            >
              <div className="text-center p-6">
                <div className="text-2xl font-bold text-primary mb-1">
                  {award.text}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">
                  {award.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
