import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";

export function EventsSection() {
  const events = [
    {
      id: 1,
      name: "AHLA California Hotel Conference",
      date: "March 14, 2024",
      location: "San Francisco, CA",
      venue: "Moscone Convention Center",
    },
    {
      id: 2,
      name: "AHLA Florida Hotel Conference",
      date: "February 29, 2024",
      location: "Miami, FL",
      venue: "Hyatt Regency Miami\n400 SE 2nd Ave.",
    },
    {
      id: 3,
      name: "The Hunter Conference",
      date: "March 19-21, 2024",
      location: "Atlanta, GA",
      venue: "Atlanta Marriott Marquis\n265 Peachtree Center Ave NE",
    },
    {
      id: 4,
      name: "AHLA Tennessee Hotel Conference",
      date: "April 3, 2024",
      location: "Nashville, TN",
      venue: "Holiday Inn Express Nashville\nDowntown Conference Center",
    },
  ];

  return (
    <section id="events" className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary mb-4 block">
            Meet Us
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6">
            Upcoming Events
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We cordially invite you to meet the esteemed members of our Curve
            team at various upcoming FF&E industry events.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event) => (
            <Card
              key={event.id}
              className="p-6 hover-elevate transition-all duration-300"
              data-testid={`card-event-${event.id}`}
            >
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                {event.name}
              </h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3 text-muted-foreground">
                  <Calendar className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-foreground">
                      {event.location}
                    </div>
                    <div className="whitespace-pre-line text-sm">
                      {event.venue}
                    </div>
                  </div>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => console.log("Learn more about", event.name)}
                data-testid={`button-event-${event.id}`}
              >
                Learn More
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
