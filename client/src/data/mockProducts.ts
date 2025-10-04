import { Product } from '@shared/types/products';

export const mockProducts: Product[] = [
  // Case Goods - Desks
  {
    id: 'desk-executive-1',
    companyId: 'company-1',
    categoryId: 'desks',
    name: 'Executive Mahogany Desk',
    description: 'Handcrafted executive desk made from premium mahogany wood with brass hardware and leather inlay writing surface.',
    sku: 'EXE-MAH-001',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
        alt: 'Executive Mahogany Desk',
        width: 800,
        height: 600,
      }
    ],
    materials: ['Mahogany Wood', 'Brass Hardware', 'Leather'],
    priceRange: '$2,500 - $3,500',
    isFeatured: true,
    specifications: {
      'Width': '72 inches',
      'Depth': '36 inches',
      'Height': '30 inches',
      'Finish': 'Hand-rubbed mahogany',
    },
    dimensions: {
      length: 72,
      width: 36,
      height: 30,
      unit: 'inches',
    },
    weight: 150,
    tags: ['executive', 'traditional', 'luxury'],
    availability: {
      status: 'in_stock',
      quantity: 5,
      leadTime: '2-3 weeks',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'desk-modern-1',
    companyId: 'company-1',
    categoryId: 'desks',
    name: 'Modern Glass Writing Desk',
    description: 'Contemporary glass-top desk with chrome legs, perfect for modern office spaces.',
    sku: 'MOD-GLS-001',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
        alt: 'Modern Glass Writing Desk',
        width: 800,
        height: 600,
      }
    ],
    materials: ['Tempered Glass', 'Chrome Steel'],
    priceRange: '$800 - $1,200',
    isFeatured: false,
    specifications: {
      'Width': '60 inches',
      'Depth': '30 inches',
      'Height': '29 inches',
      'Glass Thickness': '12mm tempered',
    },
    dimensions: {
      length: 60,
      width: 30,
      height: 29,
      unit: 'inches',
    },
    weight: 85,
    tags: ['modern', 'contemporary', 'glass'],
    availability: {
      status: 'in_stock',
      quantity: 12,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Seating - Office Chairs
  {
    id: 'chair-executive-1',
    companyId: 'company-1',
    categoryId: 'office-chairs',
    name: 'Ergonomic Executive Chair',
    description: 'Premium leather executive chair with lumbar support and adjustable height.',
    sku: 'ERG-EXE-001',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=600&fit=crop',
        alt: 'Ergonomic Executive Chair',
        width: 800,
        height: 600,
      }
    ],
    materials: ['Genuine Leather', 'Steel Frame', 'Memory Foam'],
    priceRange: '$600 - $900',
    isFeatured: true,
    specifications: {
      'Seat Height': '18-22 inches adjustable',
      'Weight Capacity': '300 lbs',
      'Warranty': '5 years',
    },
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Brown', hex: '#8B4513' },
    ],
    tags: ['ergonomic', 'executive', 'adjustable'],
    availability: {
      status: 'in_stock',
      quantity: 8,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Lighting - Ceiling Fixtures
  {
    id: 'light-chandelier-1',
    companyId: 'company-1',
    categoryId: 'ceiling-fixtures',
    name: 'Crystal Chandelier',
    description: 'Elegant crystal chandelier with 12 lights, perfect for dining rooms and entryways.',
    sku: 'CRY-CHA-001',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800&h=600&fit=crop',
        alt: 'Crystal Chandelier',
        width: 800,
        height: 600,
      }
    ],
    materials: ['Crystal', 'Brass Frame', 'LED Compatible'],
    priceRange: '$1,200 - $1,800',
    isFeatured: true,
    specifications: {
      'Diameter': '36 inches',
      'Height': '42 inches',
      'Bulbs': '12 x E12 candelabra',
      'Wattage': '60W max per bulb',
    },
    tags: ['crystal', 'traditional', 'dining'],
    availability: {
      status: 'in_stock',
      quantity: 3,
      leadTime: '4-6 weeks',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Soft Goods - Rugs
  {
    id: 'rug-persian-1',
    companyId: 'company-1',
    categoryId: 'rugs',
    name: 'Hand-Knotted Persian Rug',
    description: 'Authentic hand-knotted Persian rug with intricate patterns and rich colors.',
    sku: 'PER-RUG-001',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=600&fit=crop',
        alt: 'Hand-Knotted Persian Rug',
        width: 800,
        height: 600,
      }
    ],
    materials: ['100% Wool', 'Natural Dyes'],
    priceRange: '$2,000 - $3,000',
    isFeatured: false,
    specifications: {
      'Size': '9x12 feet',
      'Knot Count': '400 KPSI',
      'Origin': 'Iran',
      'Pattern': 'Traditional Isfahan',
    },
    colors: [
      { name: 'Deep Red', hex: '#8B0000' },
      { name: 'Navy Blue', hex: '#000080' },
      { name: 'Gold', hex: '#FFD700' },
    ],
    tags: ['persian', 'handmade', 'traditional'],
    availability: {
      status: 'in_stock',
      quantity: 1,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Stone Countertops - Granite
  {
    id: 'granite-black-1',
    companyId: 'company-1',
    categoryId: 'granite',
    name: 'Absolute Black Granite',
    description: 'Premium absolute black granite with polished finish, perfect for kitchen countertops.',
    sku: 'GRA-BLK-001',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop',
        alt: 'Absolute Black Granite',
        width: 800,
        height: 600,
      }
    ],
    materials: ['Natural Granite'],
    priceRange: '$45 - $65 per sq ft',
    isFeatured: false,
    specifications: {
      'Thickness': '3cm (1.25 inches)',
      'Finish': 'Polished',
      'Origin': 'India',
      'Hardness': 'Mohs 6-7',
    },
    tags: ['granite', 'black', 'kitchen'],
    availability: {
      status: 'in_stock',
      leadTime: '2-3 weeks for fabrication',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Bathroom Fixtures - Vanities
  {
    id: 'vanity-double-1',
    companyId: 'company-1',
    categoryId: 'vanities',
    name: 'Double Sink Vanity',
    description: 'Modern double sink vanity with quartz countertop and soft-close drawers.',
    sku: 'VAN-DBL-001',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&h=600&fit=crop',
        alt: 'Double Sink Vanity',
        width: 800,
        height: 600,
      }
    ],
    materials: ['Solid Wood', 'Quartz Countertop', 'Ceramic Sinks'],
    priceRange: '$1,800 - $2,500',
    isFeatured: true,
    specifications: {
      'Width': '72 inches',
      'Depth': '22 inches',
      'Height': '34 inches',
      'Sinks': 'Dual undermount ceramic',
    },
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Gray', hex: '#808080' },
      { name: 'Navy', hex: '#000080' },
    ],
    tags: ['vanity', 'double-sink', 'modern'],
    availability: {
      status: 'in_stock',
      quantity: 4,
      leadTime: '3-4 weeks',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Flooring - Hardwood
  {
    id: 'hardwood-oak-1',
    companyId: 'company-1',
    categoryId: 'hardwood',
    name: 'European White Oak Flooring',
    description: 'Premium European white oak engineered flooring with wire-brushed texture.',
    sku: 'HWD-OAK-001',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
        alt: 'European White Oak Flooring',
        width: 800,
        height: 600,
      }
    ],
    materials: ['European White Oak', 'UV-Cured Finish'],
    priceRange: '$8 - $12 per sq ft',
    isFeatured: false,
    specifications: {
      'Plank Width': '7.5 inches',
      'Thickness': '5/8 inch',
      'Length': 'Up to 84 inches',
      'Finish': 'Wire-brushed, UV-cured',
    },
    colors: [
      { name: 'Natural', hex: '#DEB887' },
      { name: 'Weathered Gray', hex: '#A9A9A9' },
      { name: 'Espresso', hex: '#3C2415' },
    ],
    tags: ['hardwood', 'oak', 'engineered'],
    availability: {
      status: 'in_stock',
      leadTime: '1-2 weeks',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },

  // Additional products for pagination testing
  {
    id: 'cabinet-kitchen-1',
    companyId: 'company-1',
    categoryId: 'cabinets',
    name: 'Shaker Style Kitchen Cabinet',
    description: 'Classic shaker style kitchen cabinet with soft-close hinges and adjustable shelves.',
    sku: 'CAB-SHA-001',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
        alt: 'Shaker Style Kitchen Cabinet',
        width: 800,
        height: 600,
      }
    ],
    materials: ['Solid Maple', 'Soft-Close Hardware'],
    priceRange: '$200 - $400 per linear ft',
    isFeatured: false,
    tags: ['cabinet', 'shaker', 'kitchen'],
    availability: {
      status: 'in_stock',
      leadTime: '4-6 weeks',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'lamp-table-1',
    companyId: 'company-1',
    categoryId: 'table-lamps',
    name: 'Ceramic Table Lamp',
    description: 'Elegant ceramic table lamp with linen shade, perfect for bedside or accent lighting.',
    sku: 'LAM-CER-001',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
        alt: 'Ceramic Table Lamp',
        width: 800,
        height: 600,
      }
    ],
    materials: ['Ceramic Base', 'Linen Shade'],
    priceRange: '$150 - $250',
    isFeatured: false,
    tags: ['lamp', 'ceramic', 'accent'],
    availability: {
      status: 'in_stock',
      quantity: 15,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

// Helper function to get products by category
export function getProductsByCategory(categoryId: string | null, products: Product[] = mockProducts): Product[] {
  if (!categoryId) return products;
  return products.filter(product => product.categoryId === categoryId);
}

// Helper function for pagination
export function paginateProducts(products: Product[], page: number, itemsPerPage: number) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  return {
    products: products.slice(startIndex, endIndex),
    totalPages: Math.ceil(products.length / itemsPerPage),
    totalItems: products.length,
    currentPage: page,
    itemsPerPage,
  };
}