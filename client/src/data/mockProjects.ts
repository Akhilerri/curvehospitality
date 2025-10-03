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
      createProjectImage('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop', 'before', 1, 'Lobby', 'Original lobby with dated furnishings'),
      createProjectImage('https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop', 'after', 2, 'Lobby', 'Renovated lobby with modern luxury design'),
      createProjectImage('https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop', 'before', 3, 'Guest Room', 'Standard guest room before renovation'),
      createProjectImage('https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop', 'after', 4, 'Guest Room', 'Luxury guest room with custom furnishings'),
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
      createProjectImage('https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop', 'before', 1, 'Open Office', 'Traditional cubicle layout'),
      createProjectImage('https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop', 'after', 2, 'Open Office', 'Modern collaborative workspace'),
      createProjectImage('https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop', 'final', 3, 'Meeting Room', 'Glass-walled conference room with tech integration'),
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
      createProjectImage('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop', 'final', 1, 'Dining Room', 'Main dining area with coastal design elements'),
      createProjectImage('https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=600&fit=crop', 'final', 2, 'Bar Area', 'Custom bar with nautical-inspired details'),
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
      createProjectImage('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop', 'final', 1, 'Living Room', 'Spacious living area with city views'),
      createProjectImage('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop', 'final', 2, 'Kitchen', 'Gourmet kitchen with custom cabinetry'),
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
      createProjectImage('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop', 'final', 1, 'Lobby', 'Welcoming reception area with natural elements'),
      createProjectImage('https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&h=600&fit=crop', 'final', 2, 'Treatment Room', 'Modern treatment room with calming design'),
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
      createProjectImage('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop', 'final', 1, 'Entrance', 'Eye-catching storefront with brand elements'),
      createProjectImage('https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop', 'final', 2, 'Sales Floor', 'Flexible merchandising area with digital integration'),
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