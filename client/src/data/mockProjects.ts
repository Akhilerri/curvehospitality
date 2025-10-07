import { Project, ProjectImage, Testimonial } from '../../../shared/types/projects';
import { ProjectSegment } from '../../../shared/types/common';

const createProjectImage = (
  url: string,
  type: 'before' | 'after' | 'process' | 'final',
  order: number,
  room?: string,
  description?: string
): ProjectImage => ({
  url,
  alt: description || `${type} image`,
  width: 800,
  height: 600,
  type,
  order,
  room,
  description,
});

export const mockProjects: Project[] = [
  {
    id: '1',
    companyId: 'company-1',
    title: 'Luxury Hotel Renovation - The Grand Plaza',
    client: 'Grand Plaza Hotels',
    location: 'New York, NY',
    brand: 'Grand Plaza',
    segment: 'hospitality' as ProjectSegment,
    description: 'Complete renovation of a 200-room luxury hotel including lobby, guest rooms, and dining areas.',
    challenges: [
      'Maintaining operations during renovation',
      'Preserving historic architectural elements',
      'Meeting tight timeline for peak season reopening'
    ],
    solutions: [
      'Phased renovation approach to minimize disruption',
      'Custom millwork to complement existing architecture',
      '24/7 construction schedule with specialized teams'
    ],
    results: [
      '40% increase in guest satisfaction scores',
      '25% increase in average daily rate',
      'LEED Gold certification achieved'
    ],
    images: [
      createProjectImage('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80', 'after', 1, 'Lobby', 'Luxurious hotel lobby with modern design'),
      createProjectImage('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80', 'after', 2, 'Lobby', 'Grand hotel entrance with elegant furnishings'),
      createProjectImage('https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80', 'after', 3, 'Guest Room', 'Luxury hotel suite with city views'),
      createProjectImage('https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80', 'after', 4, 'Guest Room', 'Modern hotel room with premium amenities'),
    ],
    completedAt: new Date('2023-08-15'),
    isFeatured: true,
    testimonial: {
      clientName: 'Sarah Johnson',
      clientTitle: 'General Manager',
      clientCompany: 'Grand Plaza Hotels',
      quote: 'The transformation exceeded our expectations. The team delivered exceptional quality while keeping our operations running smoothly.',
      rating: 5,
      date: new Date('2023-09-01'),
    },
    tags: ['luxury', 'hospitality', 'renovation', 'LEED'],
    services: ['interior-design', 'project-management'],
    createdAt: new Date('2023-03-01'),
    updatedAt: new Date('2023-08-15'),
  },
  {
    id: '2',
    companyId: 'company-1',
    title: 'Corporate Headquarters - TechCorp',
    client: 'TechCorp Industries',
    location: 'San Francisco, CA',
    brand: 'TechCorp',
    segment: 'corporate' as ProjectSegment,
    description: 'Modern office design for a 50,000 sq ft corporate headquarters with open collaboration spaces.',
    challenges: [
      'Creating flexible spaces for hybrid work',
      'Incorporating sustainable materials',
      'Balancing privacy with collaboration'
    ],
    solutions: [
      'Modular furniture systems for adaptability',
      'Biophilic design elements throughout',
      'Acoustic solutions for noise management'
    ],
    results: [
      '60% improvement in employee satisfaction',
      '30% reduction in energy consumption',
      'WELL Building Standard certification'
    ],
    images: [
      createProjectImage('https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80', 'final', 1, 'Lobby', 'Modern hotel reception area'),
      createProjectImage('https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80', 'final', 2, 'Lounge', 'Contemporary hotel lounge space'),
      createProjectImage('https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80', 'final', 3, 'Outdoor', 'Hotel outdoor terrace with seating'),
    ],
    completedAt: new Date('2023-06-30'),
    isFeatured: true,
    testimonial: {
      clientName: 'Michael Chen',
      clientTitle: 'VP of Operations',
      clientCompany: 'TechCorp Industries',
      quote: 'Our new office has transformed how our teams collaborate. The design perfectly balances our need for both focus and teamwork.',
      rating: 5,
      date: new Date('2023-07-15'),
    },
    tags: ['corporate', 'modern', 'sustainable', 'technology'],
    services: ['interior-design', 'procurement'],
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2023-06-30'),
  },
  {
    id: '3',
    companyId: 'company-1',
    title: 'Boutique Restaurant - Coastal Bistro',
    client: 'Coastal Dining Group',
    location: 'Miami, FL',
    brand: 'Coastal Bistro',
    segment: 'hospitality' as ProjectSegment,
    description: 'Intimate 80-seat restaurant with coastal-inspired design and custom furniture.',
    challenges: [
      'Maximizing seating in limited space',
      'Creating ambiance for different dining occasions',
      'Incorporating brand identity into design'
    ],
    solutions: [
      'Multi-level seating with banquettes and bar',
      'Adjustable lighting systems',
      'Custom artwork and coastal color palette'
    ],
    results: [
      'Fully booked within first month',
      'Featured in Architectural Digest',
      '95% positive customer reviews'
    ],
    images: [
      createProjectImage('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80', 'final', 1, 'Dining Room', 'Elegant restaurant interior with ambient lighting'),
      createProjectImage('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80', 'final', 2, 'Dining Room', 'Fine dining restaurant with sophisticated decor'),
      createProjectImage('https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80', 'final', 3, 'Bar Area', 'Modern hotel bar with premium finishes'),
    ],
    completedAt: new Date('2023-04-20'),
    isFeatured: false,
    testimonial: {
      clientName: 'Elena Rodriguez',
      clientTitle: 'Owner',
      clientCompany: 'Coastal Dining Group',
      quote: 'The design captures the essence of coastal dining perfectly. Our guests love the atmosphere.',
      rating: 5,
      date: new Date('2023-05-01'),
    },
    tags: ['restaurant', 'coastal', 'intimate', 'custom'],
    services: ['interior-design', 'manufacturing'],
    createdAt: new Date('2023-02-01'),
    updatedAt: new Date('2023-04-20'),
  },
  {
    id: '4',
    companyId: 'company-1',
    title: 'Residential Penthouse - Skyline Towers',
    client: 'Private Client',
    location: 'Chicago, IL',
    brand: 'Skyline Towers',
    segment: 'residential' as ProjectSegment,
    description: '4,000 sq ft penthouse with panoramic city views and luxury finishes.',
    challenges: [
      'Working with existing architectural constraints',
      'Integrating smart home technology',
      'Coordinating with building management'
    ],
    solutions: [
      'Custom built-ins to maximize space',
      'Seamless technology integration',
      'Phased installation to minimize disruption'
    ],
    results: [
      'Featured in Luxury Home Magazine',
      'Smart home integration completed',
      'Client referrals to other residents'
    ],
    images: [
      createProjectImage('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80', 'final', 1, 'Suite', 'Luxury hotel suite living area'),
      createProjectImage('https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80', 'final', 2, 'Bedroom', 'Premium hotel bedroom with elegant design'),
      createProjectImage('https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80', 'final', 3, 'Bathroom', 'Spa-like hotel bathroom with luxury fixtures'),
    ],
    completedAt: new Date('2023-09-10'),
    isFeatured: false,
    tags: ['residential', 'luxury', 'penthouse', 'smart-home'],
    services: ['interior-design', 'procurement', 'project-management'],
    createdAt: new Date('2023-05-01'),
    updatedAt: new Date('2023-09-10'),
  },
  {
    id: '5',
    companyId: 'company-1',
    title: 'Medical Center Renovation - HealthFirst',
    client: 'HealthFirst Medical',
    location: 'Boston, MA',
    brand: 'HealthFirst',
    segment: 'healthcare' as ProjectSegment,
    description: 'Patient-centered design for a 30,000 sq ft medical facility with specialized treatment areas.',
    challenges: [
      'Meeting healthcare regulations and standards',
      'Creating calming environment for patients',
      'Maintaining sterile conditions during construction'
    ],
    solutions: [
      'Evidence-based design principles',
      'Biophilic elements and natural lighting',
      'Specialized construction protocols'
    ],
    results: [
      '50% reduction in patient anxiety scores',
      'LEED Healthcare certification',
      'Improved staff workflow efficiency'
    ],
    images: [
      createProjectImage('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80', 'final', 1, 'Pool', 'Luxury hotel pool area with cabanas'),
      createProjectImage('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80', 'final', 2, 'Exterior', 'Modern hotel exterior architecture'),
      createProjectImage('https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80', 'final', 3, 'Spa', 'Hotel spa and wellness center'),
    ],
    completedAt: new Date('2023-07-25'),
    isFeatured: true,
    testimonial: {
      clientName: 'Dr. Amanda Foster',
      clientTitle: 'Chief Medical Officer',
      clientCompany: 'HealthFirst Medical',
      quote: 'The new design has significantly improved both patient experience and staff satisfaction. It truly supports our mission of healing.',
      rating: 5,
      date: new Date('2023-08-10'),
    },
    tags: ['healthcare', 'evidence-based', 'biophilic', 'LEED'],
    services: ['interior-design', 'project-management'],
    createdAt: new Date('2023-03-15'),
    updatedAt: new Date('2023-07-25'),
  },
  {
    id: '6',
    companyId: 'company-1',
    title: 'Retail Flagship Store - Urban Threads',
    client: 'Urban Threads Fashion',
    location: 'Los Angeles, CA',
    brand: 'Urban Threads',
    segment: 'retail' as ProjectSegment,
    description: '5,000 sq ft flagship store with interactive displays and flexible merchandising areas.',
    challenges: [
      'Creating Instagram-worthy spaces',
      'Flexible display systems for seasonal changes',
      'Integrating digital technology with physical retail'
    ],
    solutions: [
      'Modular display systems',
      'Interactive digital mirrors and displays',
      'Photogenic backdrop areas throughout store'
    ],
    results: [
      '200% increase in social media engagement',
      '35% increase in average transaction value',
      'Store design replicated in 5 additional locations'
    ],
    images: [
      createProjectImage('https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80', 'final', 1, 'Rooftop', 'Hotel rooftop bar with city views'),
      createProjectImage('https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80', 'final', 2, 'Terrace', 'Outdoor hotel terrace seating area'),
      createProjectImage('https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80', 'final', 3, 'Garden', 'Hotel garden and outdoor lounge'),
    ],
    completedAt: new Date('2023-05-15'),
    isFeatured: false,
    tags: ['retail', 'flagship', 'digital-integration', 'modular'],
    services: ['interior-design', 'manufacturing'],
    createdAt: new Date('2023-01-20'),
    updatedAt: new Date('2023-05-15'),
  },
];

// Helper functions for filtering
export const getUniqueValues = <T extends keyof Project>(
  projects: Project[],
  field: T
): Array<NonNullable<Project[T]>> => {
  const values = projects
    .map(project => project[field])
    .filter((value): value is NonNullable<Project[T]> => value != null);
  
  return Array.from(new Set(values));
};

export const getProjectsByFilter = (
  projects: Project[],
  filters: {
    brand?: string;
    segment?: ProjectSegment;
    location?: string;
    isFeatured?: boolean;
  }
): Project[] => {
  return projects.filter(project => {
    if (filters.brand && project.brand !== filters.brand) return false;
    if (filters.segment && project.segment !== filters.segment) return false;
    if (filters.location && project.location !== filters.location) return false;
    if (filters.isFeatured !== undefined && project.isFeatured !== filters.isFeatured) return false;
    return true;
  });
};

export const getFeaturedProjects = (projects: Project[]): Project[] => {
  return projects.filter(project => project.isFeatured);
};