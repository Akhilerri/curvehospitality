import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import guestRoomImage from "@assets/generated_images/Modern_hotel_guest_room_6281e19b.png";
import lobbyImage from "@assets/generated_images/Luxury_hotel_lobby_interior_ae77a8c3.png";
import restaurantImage from "@assets/generated_images/Hotel_restaurant_interior_design_c2131a5e.png";
import suiteImage from "@assets/generated_images/Hotel_suite_bedroom_luxury_1c5c2afa.png";
import loungeImage from "@assets/generated_images/Hotel_lounge_area_contemporary_933edc15.png";
import heroImage from "@assets/generated_images/Luxury_hotel_interior_hero_c7c59af4.png";

export function ProjectsGallery() {
  const [activeFilter, setActiveFilter] = useState("All");

  const projects = [
    {
      id: 1,
      title: "Modern Guest Room Collection",
      category: "Guest Rooms",
      image: guestRoomImage,
      description: "Contemporary furniture design with elegant neutral tones",
    },
    {
      id: 2,
      title: "Luxury Hotel Lobby",
      category: "Lobbies",
      image: lobbyImage,
      description: "Sophisticated seating and custom FF&E elements",
    },
    {
      id: 3,
      title: "Fine Dining Restaurant",
      category: "Restaurants",
      image: restaurantImage,
      description: "Elegant dining furniture and ambient lighting",
    },
    {
      id: 4,
      title: "Executive Suite Bedroom",
      category: "Suites",
      image: suiteImage,
      description: "Luxury bedding and custom headboard design",
    },
    {
      id: 5,
      title: "Contemporary Lounge",
      category: "Lounges",
      image: loungeImage,
      description: "Modern seating arrangement with warm palette",
    },
    {
      id: 6,
      title: "Premium Hotel Interior",
      category: "Lobbies",
      image: heroImage,
      description: "Complete FF&E package with modern design",
    },
  ];

  const filters = [
    "All",
    "Guest Rooms",
    "Lobbies",
    "Restaurants",
    "Suites",
    "Lounges",
  ];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
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

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "outline"}
              onClick={() => setActiveFilter(filter)}
              data-testid={`button-filter-${filter.toLowerCase().replace(" ", "-")}`}
            >
              {filter}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
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
      </div>
    </section>
  );
}
