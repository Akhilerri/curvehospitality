import { CompanyInfo } from '@shared/types/common';

export const companyData: CompanyInfo = {
  id: 'karan-kothari-usa-llc',
  name: 'Karan Kothari USA LLC',
  description: 'Distinguished hospitality procurement enterprise specializing in custom FF&E manufacturing, interior design, and quality hospitality furniture for hotels and restaurants.',
  foundedYear: 2010,
  mission: 'To deliver exceptional hospitality experiences through innovative design, superior craftsmanship, and unparalleled service excellence.',
  values: [
    'Quality craftsmanship and attention to detail',
    'Innovative design solutions that exceed expectations',
    'Sustainable and responsible business practices',
    'Building lasting partnerships with our clients',
    'Continuous improvement and professional excellence'
  ],
  contactInfo: {
    phone: '+1 (555) 123-4567',
    email: 'office@kkusallc.com',
    address: {
      street: '399 Hoes Ln',
      city: 'Piscataway',
      state: 'NJ',
      zipCode: '08854',
      country: 'United States'
    },
    businessHours: {
      monday: '8:00 AM - 6:00 PM',
      tuesday: '8:00 AM - 6:00 PM',
      wednesday: '8:00 AM - 6:00 PM',
      thursday: '8:00 AM - 6:00 PM',
      friday: '8:00 AM - 6:00 PM',
      saturday: '9:00 AM - 4:00 PM',
      sunday: 'Closed'
    }
  },
  createdAt: new Date('2010-01-01'),
  updatedAt: new Date()
};