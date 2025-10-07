import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
// High-quality hotel and hospitality images
const guestRoomImage = "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
const lobbyImage = "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
const restaurantImage = "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";

// Fallback images
const guestRoomImageFallback = "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
const lobbyImageFallback = "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
const restaurantImageFallback = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";

export function ProjectsGallery() {
  // UPDATED: Only show top 3 featured projects - NO FILTERS - FORCE REFRESH
  console.log("ProjectsGallery component loaded - showing only 3 projects");
  
  const featuredProjects = [
    {
      id: 1,
      title: "Modern Guest Room Collection",
      category: "Guest Rooms",
      image: guestRoomImage,
      fallback: guestRoomImageFallback,
      description: "Contemporary furniture design with elegant neutral tones",
    },
    {
      id: 2,
      title: "Luxury Hotel Lobby",
      category: "Lobbies",
      image: lobbyImage,
      fallback: lobbyImageFallback,
      description: "Sophisticated seating and custom FF&E elements",
    },
    {
      id: 3,
      title: "Fine Dining Restaurant",
      category: "Restaurants",
      image: restaurantImage,
      fallback: restaurantImageFallback,
      description: "Elegant dining furniture and ambient lighting",
    },
  ];

  return (
    <section id="projects" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary mb-4 block">
            Our Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse portfolio of hospitality interior design
            projects showcasing exceptional craftsmanship and attention to
            detail.
          </p>
        </div>

        {/* NO FILTER BUTTONS - REMOVED COMPLETELY */}

        {/* Project Grid - Only 3 Projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredProjects.map((project) => (
            <Card
              key={project.id}
              className="group overflow-hidden hover-elevate transition-all duration-300 cursor-pointer"
              onClick={() => console.log("Project clicked:", project.title)}
              data-testid={`card-project-${project.id}`}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = project.fallback;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <Badge className="mb-2">{project.category}</Badge>
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {project.title}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All Projects Button - Center Aligned */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 font-semibold"
          >
            <Link href="/portfolio">
              View All Projects
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}