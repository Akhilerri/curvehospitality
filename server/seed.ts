import { getDb } from "./db";
import {
  companies,
  teamMembers,
  services,
  productCategories,
  products,
  projects,
  blogPosts,
  guides,
  contactSubmissions,
} from "@shared/schema";

const db = getDb();

export async function seedDatabase() {
  console.log("🌱 Starting database seeding...");

  try {
    // Create a sample company
    const [company] = await db
      .insert(companies)
      .values({
        name: "Curve Hospitality Design",
        description: "Premier interior design and manufacturing company specializing in hospitality and commercial spaces.",
        foundedYear: 2015,
        mission: "To create exceptional spaces that inspire and elevate the human experience through innovative design and superior craftsmanship.",
        values: [
          "Innovation in design and manufacturing",
          "Commitment to quality and excellence",
          "Sustainable and responsible practices",
          "Client-focused collaborative approach",
          "Continuous learning and improvement"
        ],
      })
      .returning();

    console.log("✅ Company created:", company.name);

    // Create team members
    const teamMemberData = [
      {
        companyId: company.id,
        name: "Sarah Johnson",
        role: "Founder & Creative Director",
        bio: "With over 15 years of experience in hospitality design, Sarah leads our creative vision and strategic direction.",
        imageUrl: "/images/team/sarah-johnson.jpg",
        experience: ["Interior Design", "Project Management", "Brand Development"],
        orderIndex: 1,
      },
      {
        companyId: company.id,
        name: "Michael Chen",
        role: "Head of Manufacturing",
        bio: "Michael oversees our manufacturing operations, ensuring quality and precision in every piece we create.",
        imageUrl: "/images/team/michael-chen.jpg",
        experience: ["Manufacturing", "Quality Control", "Supply Chain Management"],
        orderIndex: 2,
      },
      {
        companyId: company.id,
        name: "Emily Rodriguez",
        role: "Senior Interior Designer",
        bio: "Emily brings creativity and technical expertise to our design projects, specializing in luxury hospitality spaces.",
        imageUrl: "/images/team/emily-rodriguez.jpg",
        experience: ["Interior Design", "Space Planning", "Material Selection"],
        orderIndex: 3,
      },
      {
        companyId: company.id,
        name: "David Thompson",
        role: "Project Manager",
        bio: "David ensures seamless project execution from concept to completion, managing timelines and client relationships.",
        imageUrl: "/images/team/david-thompson.jpg",
        experience: ["Project Management", "Client Relations", "Logistics"],
        orderIndex: 4,
      },
    ];

    await db.insert(teamMembers).values(teamMemberData);
    console.log("✅ Team members created");

    // Create services
    const serviceData = [
      {
        companyId: company.id,
        title: "Manufacturing",
        description: "Custom furniture and fixture manufacturing with precision craftsmanship and attention to detail.",
        capabilities: [
          "Custom furniture design and production",
          "Millwork and cabinetry",
          "Upholstery and soft goods",
          "Metal fabrication",
          "Quality control and finishing"
        ],
        processSteps: [
          "Design consultation and specification",
          "Material selection and sourcing",
          "Prototype development",
          "Production and quality control",
          "Delivery and installation"
        ],
        images: ["/images/services/manufacturing-1.jpg", "/images/services/manufacturing-2.jpg"],
        orderIndex: 1,
      },
      {
        companyId: company.id,
        title: "Interior Design",
        description: "Comprehensive interior design services for hospitality and commercial spaces.",
        capabilities: [
          "Space planning and layout design",
          "Material and finish selection",
          "Lighting design",
          "Brand integration",
          "Project coordination"
        ],
        processSteps: [
          "Initial consultation and needs assessment",
          "Concept development and presentation",
          "Design development and documentation",
          "Implementation and project management",
          "Final walkthrough and delivery"
        ],
        images: ["/images/services/interior-design-1.jpg", "/images/services/interior-design-2.jpg"],
        orderIndex: 2,
      },
      {
        companyId: company.id,
        title: "Procurement",
        description: "Strategic sourcing and procurement services for furniture, fixtures, and equipment.",
        capabilities: [
          "Vendor sourcing and evaluation",
          "Cost analysis and negotiation",
          "Quality assurance",
          "Logistics coordination",
          "Installation management"
        ],
        processSteps: [
          "Requirements analysis",
          "Vendor identification and qualification",
          "Proposal evaluation and selection",
          "Order management and tracking",
          "Delivery and installation coordination"
        ],
        images: ["/images/services/procurement-1.jpg", "/images/services/procurement-2.jpg"],
        orderIndex: 3,
      },
      {
        companyId: company.id,
        title: "Project Management",
        description: "End-to-end project management ensuring on-time, on-budget delivery of exceptional results.",
        capabilities: [
          "Project planning and scheduling",
          "Budget management and cost control",
          "Team coordination and communication",
          "Risk management",
          "Quality assurance"
        ],
        processSteps: [
          "Project initiation and planning",
          "Resource allocation and scheduling",
          "Progress monitoring and reporting",
          "Issue resolution and change management",
          "Project closure and evaluation"
        ],
        images: ["/images/services/project-management-1.jpg", "/images/services/project-management-2.jpg"],
        orderIndex: 4,
      },
    ];

    await db.insert(services).values(serviceData);
    console.log("✅ Services created");

    // Create product categories
    const categoryData = [
      {
        companyId: company.id,
        name: "Case Goods",
        description: "Storage and functional furniture pieces including dressers, desks, and cabinets.",
        orderIndex: 1,
      },
      {
        companyId: company.id,
        name: "Seating",
        description: "Chairs, sofas, and seating solutions for various commercial and hospitality applications.",
        orderIndex: 2,
      },
      {
        companyId: company.id,
        name: "Lighting",
        description: "Decorative and functional lighting fixtures including chandeliers, lamps, and sconces.",
        orderIndex: 3,
      },
      {
        companyId: company.id,
        name: "Artwork & Mirrors",
        description: "Curated artwork and custom mirrors to enhance interior spaces.",
        orderIndex: 4,
      },
      {
        companyId: company.id,
        name: "Soft Goods",
        description: "Textiles, drapery, bedding, and upholstery materials.",
        orderIndex: 5,
      },
      {
        companyId: company.id,
        name: "Stone Countertops",
        description: "Natural and engineered stone surfaces for kitchens, bathrooms, and commercial spaces.",
        orderIndex: 6,
      },
      {
        companyId: company.id,
        name: "Bathroom Fixtures & Vanities",
        description: "Complete bathroom solutions including vanities, fixtures, and accessories.",
        orderIndex: 7,
      },
      {
        companyId: company.id,
        name: "Flooring",
        description: "Hardwood, tile, carpet, and specialty flooring solutions.",
        orderIndex: 8,
      },
    ];

    const createdCategories = await db.insert(productCategories).values(categoryData).returning();
    console.log("✅ Product categories created");

    // Create sample products
    const productData = [
      {
        companyId: company.id,
        categoryId: createdCategories[0].id, // Case Goods
        name: "Executive Desk Collection",
        description: "Handcrafted executive desk with premium wood finish and integrated cable management.",
        specifications: {
          dimensions: "72\" W x 36\" D x 30\" H",
          material: "Solid walnut with steel accents",
          finish: "Natural oil finish",
          features: ["Cable management", "Soft-close drawers", "Adjustable feet"]
        },
        images: ["/images/products/executive-desk-1.jpg", "/images/products/executive-desk-2.jpg"],
        materials: ["Walnut", "Steel", "Leather"],
        priceRange: "$2,500 - $3,500",
        isFeatured: true,
      },
      {
        companyId: company.id,
        categoryId: createdCategories[1].id, // Seating
        name: "Hospitality Lounge Chair",
        description: "Comfortable and stylish lounge chair perfect for hotel lobbies and waiting areas.",
        specifications: {
          dimensions: "32\" W x 34\" D x 42\" H",
          material: "Upholstered fabric with hardwood frame",
          finish: "Multiple fabric options available",
          features: ["Commercial grade", "Stain resistant", "Fire retardant"]
        },
        images: ["/images/products/lounge-chair-1.jpg", "/images/products/lounge-chair-2.jpg"],
        materials: ["Hardwood", "Commercial fabric", "High-density foam"],
        priceRange: "$800 - $1,200",
        isFeatured: true,
      },
      {
        companyId: company.id,
        categoryId: createdCategories[2].id, // Lighting
        name: "Modern Pendant Light Series",
        description: "Contemporary pendant lighting with customizable finishes and LED technology.",
        specifications: {
          dimensions: "18\" diameter x 24\" H",
          material: "Brushed brass with glass shade",
          finish: "Multiple finish options",
          features: ["LED compatible", "Dimmable", "Custom sizing available"]
        },
        images: ["/images/products/pendant-light-1.jpg", "/images/products/pendant-light-2.jpg"],
        materials: ["Brass", "Glass", "LED components"],
        priceRange: "$450 - $650",
        isFeatured: false,
      },
    ];

    await db.insert(products).values(productData);
    console.log("✅ Products created");

    // Create sample projects
    const projectData = [
      {
        companyId: company.id,
        title: "Luxury Hotel Renovation - Downtown",
        client: "Metropolitan Hotels Group",
        location: "New York, NY",
        brand: "Metropolitan",
        segment: "Luxury Hotels",
        description: "Complete renovation of a 200-room luxury hotel including lobby, guest rooms, and dining areas.",
        challenges: [
          "Maintaining operations during renovation",
          "Preserving historic architectural elements",
          "Meeting tight timeline constraints"
        ],
        solutions: [
          "Phased renovation approach",
          "Custom millwork to match historic details",
          "24/7 project management coordination"
        ],
        results: [
          "Increased guest satisfaction scores by 35%",
          "Completed 2 weeks ahead of schedule",
          "Achieved LEED Gold certification"
        ],
        images: {
          hero: "/images/projects/hotel-renovation-hero.jpg",
          gallery: [
            "/images/projects/hotel-renovation-1.jpg",
            "/images/projects/hotel-renovation-2.jpg",
            "/images/projects/hotel-renovation-3.jpg"
          ],
          beforeAfter: [
            { before: "/images/projects/hotel-before-1.jpg", after: "/images/projects/hotel-after-1.jpg" }
          ]
        },
        completedAt: "2023-08-15",
        isFeatured: true,
      },
      {
        companyId: company.id,
        title: "Corporate Headquarters Design",
        client: "TechCorp Industries",
        location: "San Francisco, CA",
        brand: "TechCorp",
        segment: "Corporate Offices",
        description: "Modern office design for a growing tech company's new headquarters.",
        challenges: [
          "Creating collaborative spaces",
          "Incorporating brand identity",
          "Flexible workspace requirements"
        ],
        solutions: [
          "Modular furniture systems",
          "Brand-integrated color schemes",
          "Multi-functional meeting spaces"
        ],
        results: [
          "Improved employee productivity metrics",
          "Enhanced company culture and collaboration",
          "Flexible spaces for future growth"
        ],
        images: {
          hero: "/images/projects/corporate-office-hero.jpg",
          gallery: [
            "/images/projects/corporate-office-1.jpg",
            "/images/projects/corporate-office-2.jpg"
          ]
        },
        completedAt: "2023-11-30",
        isFeatured: true,
      },
    ];

    await db.insert(projects).values(projectData);
    console.log("✅ Projects created");

    // Create sample blog posts
    const blogData = [
      {
        companyId: company.id,
        title: "Trends in Hospitality Design for 2024",
        slug: "hospitality-design-trends-2024",
        excerpt: "Explore the latest trends shaping hospitality design, from sustainable materials to technology integration.",
        content: "The hospitality industry continues to evolve, with design playing a crucial role in creating memorable guest experiences. In 2024, we're seeing several key trends that are reshaping how we approach hospitality design...",
        author: "Sarah Johnson",
        category: "Design Trends",
        tags: ["hospitality", "design", "trends", "2024"],
        featuredImage: "/images/blog/hospitality-trends-2024.jpg",
        publishedAt: new Date("2024-01-15"),
        isPublished: true,
      },
      {
        companyId: company.id,
        title: "Sustainable Materials in Commercial Design",
        slug: "sustainable-materials-commercial-design",
        excerpt: "How choosing sustainable materials can benefit both your project and the environment.",
        content: "Sustainability is no longer just a buzzword in commercial design—it's a necessity. As businesses become more environmentally conscious, the demand for sustainable materials and practices continues to grow...",
        author: "Emily Rodriguez",
        category: "Sustainability",
        tags: ["sustainability", "materials", "commercial", "environment"],
        featuredImage: "/images/blog/sustainable-materials.jpg",
        publishedAt: new Date("2024-02-01"),
        isPublished: true,
      },
    ];

    await db.insert(blogPosts).values(blogData);
    console.log("✅ Blog posts created");

    // Create sample guides
    const guideData = [
      {
        companyId: company.id,
        title: "Complete Guide to Hotel Room Design",
        description: "A comprehensive guide covering everything from space planning to material selection for hotel guest rooms.",
        fileUrl: "/downloads/hotel-room-design-guide.pdf",
        fileSize: "2.5 MB",
        downloadCount: 0,
        requiresLeadCapture: true,
        isActive: true,
      },
      {
        companyId: company.id,
        title: "Sustainable Design Checklist",
        description: "Essential checklist for incorporating sustainable practices into your commercial design projects.",
        fileUrl: "/downloads/sustainable-design-checklist.pdf",
        fileSize: "1.2 MB",
        downloadCount: 0,
        requiresLeadCapture: false,
        isActive: true,
      },
    ];

    await db.insert(guides).values(guideData);
    console.log("✅ Guides created");

    // Create sample contact submissions
    const contactData = [
      {
        companyId: company.id,
        name: "John Smith",
        email: "john.smith@example.com",
        phone: "(555) 123-4567",
        projectType: "Hotel Renovation",
        message: "We're interested in renovating our boutique hotel and would like to discuss your services.",
        status: "new",
      },
      {
        companyId: company.id,
        name: "Maria Garcia",
        email: "maria.garcia@example.com",
        phone: "(555) 987-6543",
        projectType: "Office Design",
        message: "Looking for help with our new office space design. Can we schedule a consultation?",
        status: "contacted",
      },
    ];

    await db.insert(contactSubmissions).values(contactData);
    console.log("✅ Contact submissions created");

    console.log("🎉 Database seeding completed successfully!");
    
    return {
      company,
      teamMembers: teamMemberData.length,
      services: serviceData.length,
      categories: categoryData.length,
      products: productData.length,
      projects: projectData.length,
      blogPosts: blogData.length,
      guides: guideData.length,
      contacts: contactData.length,
    };
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then((result) => {
      console.log("Seeding summary:", result);
      process.exit(0);
    })
    .catch((error) => {
      console.error("Seeding failed:", error);
      process.exit(1);
    });
}