import { Guide, GuideCategory } from '../../../shared/types/guides';

export const mockGuideCategories: GuideCategory[] = [
  {
    id: 'design-fundamentals',
    name: 'Design Fundamentals',
    description: 'Essential guides covering the basics of interior design principles and practices',
    icon: '🎨',
    guideCount: 5
  },
  {
    id: 'project-planning',
    name: 'Project Planning',
    description: 'Comprehensive guides for planning and managing interior design projects',
    icon: '📋',
    guideCount: 4
  },
  {
    id: 'material-selection',
    name: 'Material Selection',
    description: 'Expert guidance on choosing the right materials for your projects',
    icon: '🏗️',
    guideCount: 6
  },
  {
    id: 'sustainability',
    name: 'Sustainability',
    description: 'Resources for implementing sustainable design practices',
    icon: '🌱',
    guideCount: 3
  },
  {
    id: 'business-resources',
    name: 'Business Resources',
    description: 'Tools and templates for running a successful design business',
    icon: '💼',
    guideCount: 4
  }
];

export const mockGuides: Guide[] = [
  {
    id: 'complete-guide-to-space-planning',
    companyId: 'company-1',
    title: 'The Complete Guide to Space Planning',
    description: 'A comprehensive 50-page guide covering everything you need to know about effective space planning for residential and commercial projects. Includes templates, checklists, and real-world examples.',
    fileUrl: '/downloads/guides/complete-guide-space-planning.pdf',
    fileSize: '12.5 MB',
    downloadCount: 2847,
    requiresLeadCapture: true,
    isActive: true,
    category: mockGuideCategories[0], // Design Fundamentals
    tags: ['Space Planning', 'Layout Design', 'Residential', 'Commercial'],
    thumbnail: {
      url: '/images/guides/space-planning-guide-thumb.jpg',
      alt: 'Space Planning Guide Cover',
      width: 400,
      height: 500
    },
    previewImages: [
      {
        url: '/images/guides/space-planning-preview-1.jpg',
        alt: 'Space Planning Guide Page 1',
        width: 600,
        height: 800
      },
      {
        url: '/images/guides/space-planning-preview-2.jpg',
        alt: 'Space Planning Guide Page 2',
        width: 600,
        height: 800
      }
    ],
    fileType: 'pdf',
    language: 'en',
    lastUpdated: new Date('2024-01-15'),
    createdAt: new Date('2023-06-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'sustainable-materials-handbook',
    companyId: 'company-1',
    title: 'Sustainable Materials Handbook',
    description: 'Discover eco-friendly materials and sustainable design practices. This handbook features over 100 sustainable materials with sourcing information, environmental impact data, and application examples.',
    fileUrl: '/downloads/guides/sustainable-materials-handbook.pdf',
    fileSize: '18.2 MB',
    downloadCount: 1923,
    requiresLeadCapture: true,
    isActive: true,
    category: mockGuideCategories[3], // Sustainability
    tags: ['Sustainable Design', 'Eco-Friendly Materials', 'Green Building', 'LEED'],
    thumbnail: {
      url: '/images/guides/sustainable-materials-thumb.jpg',
      alt: 'Sustainable Materials Handbook Cover',
      width: 400,
      height: 500
    },
    previewImages: [
      {
        url: '/images/guides/sustainable-materials-preview-1.jpg',
        alt: 'Sustainable Materials Page 1',
        width: 600,
        height: 800
      }
    ],
    fileType: 'pdf',
    language: 'en',
    lastUpdated: new Date('2024-01-20'),
    createdAt: new Date('2023-08-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: 'project-budget-template',
    companyId: 'company-1',
    title: 'Interior Design Project Budget Template',
    description: 'Professional Excel template for tracking project budgets, expenses, and profitability. Includes formulas for automatic calculations and customizable categories.',
    fileUrl: '/downloads/guides/project-budget-template.xlsx',
    fileSize: '2.1 MB',
    downloadCount: 3456,
    requiresLeadCapture: false,
    isActive: true,
    category: mockGuideCategories[1], // Project Planning
    tags: ['Budget Planning', 'Excel Template', 'Project Management', 'Financial Planning'],
    thumbnail: {
      url: '/images/guides/budget-template-thumb.jpg',
      alt: 'Budget Template Preview',
      width: 400,
      height: 500
    },
    fileType: 'other',
    language: 'en',
    lastUpdated: new Date('2024-01-10'),
    createdAt: new Date('2023-09-01'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: 'color-psychology-in-design',
    companyId: 'company-1',
    title: 'Color Psychology in Interior Design',
    description: 'Understanding how colors affect mood, behavior, and perception in interior spaces. Includes color palettes, psychological effects, and practical application guidelines.',
    fileUrl: '/downloads/guides/color-psychology-design.pdf',
    fileSize: '8.7 MB',
    downloadCount: 2156,
    requiresLeadCapture: true,
    isActive: true,
    category: mockGuideCategories[0], // Design Fundamentals
    tags: ['Color Theory', 'Psychology', 'Mood Design', 'Color Palettes'],
    thumbnail: {
      url: '/images/guides/color-psychology-thumb.jpg',
      alt: 'Color Psychology Guide Cover',
      width: 400,
      height: 500
    },
    fileType: 'pdf',
    language: 'en',
    lastUpdated: new Date('2023-12-05'),
    createdAt: new Date('2023-07-20'),
    updatedAt: new Date('2023-12-05')
  },
  {
    id: 'lighting-design-checklist',
    companyId: 'company-1',
    title: 'Comprehensive Lighting Design Checklist',
    description: 'Step-by-step checklist for planning and implementing effective lighting design. Covers ambient, task, and accent lighting for every room type.',
    fileUrl: '/downloads/guides/lighting-design-checklist.pdf',
    fileSize: '3.4 MB',
    downloadCount: 1789,
    requiresLeadCapture: false,
    isActive: true,
    category: mockGuideCategories[0], // Design Fundamentals
    tags: ['Lighting Design', 'Checklist', 'Ambient Lighting', 'Task Lighting'],
    thumbnail: {
      url: '/images/guides/lighting-checklist-thumb.jpg',
      alt: 'Lighting Design Checklist Cover',
      width: 400,
      height: 500
    },
    fileType: 'pdf',
    language: 'en',
    lastUpdated: new Date('2023-11-30'),
    createdAt: new Date('2023-05-15'),
    updatedAt: new Date('2023-11-30')
  },
  {
    id: 'furniture-specification-guide',
    companyId: 'company-1',
    title: 'Furniture Specification Guide',
    description: 'Professional guide to specifying custom furniture including materials, finishes, hardware, and quality standards. Essential for designers working with manufacturers.',
    fileUrl: '/downloads/guides/furniture-specification-guide.pdf',
    fileSize: '15.8 MB',
    downloadCount: 1234,
    requiresLeadCapture: true,
    isActive: true,
    category: mockGuideCategories[2], // Material Selection
    tags: ['Furniture Specification', 'Custom Furniture', 'Materials', 'Quality Standards'],
    thumbnail: {
      url: '/images/guides/furniture-spec-thumb.jpg',
      alt: 'Furniture Specification Guide Cover',
      width: 400,
      height: 500
    },
    fileType: 'pdf',
    language: 'en',
    lastUpdated: new Date('2024-01-05'),
    createdAt: new Date('2023-10-01'),
    updatedAt: new Date('2024-01-05')
  },
  {
    id: 'client-presentation-template',
    companyId: 'company-1',
    title: 'Client Presentation Template Pack',
    description: 'Professional PowerPoint templates for client presentations including mood boards, concept presentations, and project proposals. Fully customizable and brand-ready.',
    fileUrl: '/downloads/guides/client-presentation-templates.zip',
    fileSize: '45.2 MB',
    downloadCount: 2678,
    requiresLeadCapture: true,
    isActive: true,
    category: mockGuideCategories[4], // Business Resources
    tags: ['Presentation Templates', 'Client Communication', 'PowerPoint', 'Mood Boards'],
    thumbnail: {
      url: '/images/guides/presentation-template-thumb.jpg',
      alt: 'Client Presentation Templates Preview',
      width: 400,
      height: 500
    },
    fileType: 'zip',
    language: 'en',
    lastUpdated: new Date('2023-12-20'),
    createdAt: new Date('2023-04-10'),
    updatedAt: new Date('2023-12-20')
  },
  {
    id: 'material-sourcing-directory',
    companyId: 'company-1',
    title: 'Material Sourcing Directory',
    description: 'Comprehensive directory of trusted material suppliers, manufacturers, and vendors. Includes contact information, specialties, and quality ratings.',
    fileUrl: '/downloads/guides/material-sourcing-directory.pdf',
    fileSize: '6.9 MB',
    downloadCount: 1567,
    requiresLeadCapture: true,
    isActive: true,
    category: mockGuideCategories[2], // Material Selection
    tags: ['Material Sourcing', 'Suppliers', 'Vendors', 'Directory'],
    thumbnail: {
      url: '/images/guides/sourcing-directory-thumb.jpg',
      alt: 'Material Sourcing Directory Cover',
      width: 400,
      height: 500
    },
    fileType: 'pdf',
    language: 'en',
    lastUpdated: new Date('2024-01-25'),
    createdAt: new Date('2023-03-15'),
    updatedAt: new Date('2024-01-25')
  }
];

// Helper functions for filtering and searching guides
export const getGuidesByCategory = (categoryId: string): Guide[] => {
  return mockGuides.filter(guide => 
    guide.category?.id === categoryId && guide.isActive
  );
};

export const getGuidesByFileType = (fileType: string): Guide[] => {
  return mockGuides.filter(guide => 
    guide.fileType === fileType && guide.isActive
  );
};

export const searchGuides = (query: string): Guide[] => {
  const searchTerm = query.toLowerCase();
  return mockGuides.filter(guide => 
    (guide.title.toLowerCase().includes(searchTerm) ||
     guide.description?.toLowerCase().includes(searchTerm) ||
     guide.tags?.some(tag => tag.toLowerCase().includes(searchTerm))) &&
    guide.isActive
  );
};

export const getActiveGuides = (): Guide[] => {
  return mockGuides.filter(guide => guide.isActive);
};

export const getFeaturedGuides = (limit: number = 3): Guide[] => {
  return getActiveGuides()
    .sort((a, b) => (b.downloadCount || 0) - (a.downloadCount || 0))
    .slice(0, limit);
};

export const getPopularGuides = (limit: number = 5): Guide[] => {
  return getActiveGuides()
    .sort((a, b) => (b.downloadCount || 0) - (a.downloadCount || 0))
    .slice(0, limit);
};

export const getRecentGuides = (limit: number = 4): Guide[] => {
  return getActiveGuides()
    .sort((a, b) => new Date(b.lastUpdated || 0).getTime() - new Date(a.lastUpdated || 0).getTime())
    .slice(0, limit);
};

export const getGuideById = (id: string): Guide | undefined => {
  return mockGuides.find(guide => guide.id === id && guide.isActive);
};

export const getRelatedGuides = (guide: Guide, limit: number = 3): Guide[] => {
  const related = mockGuides.filter(g => {
    if (g.id === guide.id || !g.isActive) return false;
    
    // Same category gets higher priority
    if (g.category?.id === guide.category?.id) return true;
    
    // Shared tags
    if (guide.tags && g.tags) {
      return guide.tags.some(tag => g.tags?.includes(tag));
    }
    
    return false;
  });

  // Sort by relevance (same category first, then by shared tags)
  related.sort((a, b) => {
    const aScore = (a.category?.id === guide.category?.id ? 10 : 0) + 
      (guide.tags?.filter(tag => a.tags?.includes(tag)).length || 0);
    const bScore = (b.category?.id === guide.category?.id ? 10 : 0) + 
      (guide.tags?.filter(tag => b.tags?.includes(tag)).length || 0);
    
    return bScore - aScore;
  });

  return related.slice(0, limit);
};