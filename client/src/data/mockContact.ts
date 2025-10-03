import { ContactInformation, BusinessLocation } from '../../../shared/types/contact';

export const mockContactInformation: ContactInformation = {
  companyName: "CurveRedo Design & Manufacturing",
  description: "Leading provider of custom interior design solutions and high-quality manufacturing services for residential and commercial spaces.",
  phone: "(555) 123-4567",
  email: "info@curveredo.com",
  address: {
    street: "123 Design Boulevard",
    city: "San Francisco",
    state: "CA",
    zipCode: "94102",
    country: "United States"
  },
  businessHours: {
    "Monday": "8:00 AM - 6:00 PM",
    "Tuesday": "8:00 AM - 6:00 PM", 
    "Wednesday": "8:00 AM - 6:00 PM",
    "Thursday": "8:00 AM - 6:00 PM",
    "Friday": "8:00 AM - 5:00 PM",
    "Saturday": "10:00 AM - 3:00 PM",
    "Sunday": "Closed"
  },
  socialMedia: {
    facebook: "https://facebook.com/curveredo",
    instagram: "https://instagram.com/curveredo",
    linkedin: "https://linkedin.com/company/curveredo",
    pinterest: "https://pinterest.com/curveredo",
    houzz: "https://houzz.com/pro/curveredo"
  },
  locations: [
    {
      id: "hq-sf",
      name: "San Francisco Headquarters",
      type: "headquarters",
      address: {
        street: "123 Design Boulevard",
        city: "San Francisco", 
        state: "CA",
        zipCode: "94102",
        country: "United States"
      },
      phone: "(555) 123-4567",
      email: "sf@curveredo.com",
      hours: {
        monday: "8:00 AM - 6:00 PM",
        tuesday: "8:00 AM - 6:00 PM",
        wednesday: "8:00 AM - 6:00 PM", 
        thursday: "8:00 AM - 6:00 PM",
        friday: "8:00 AM - 5:00 PM",
        saturday: "10:00 AM - 3:00 PM",
        sunday: "Closed"
      },
      services: ["Interior Design", "Project Management", "Consultation"],
      isPublic: true
    },
    {
      id: "showroom-la",
      name: "Los Angeles Showroom",
      type: "showroom",
      address: {
        street: "456 Furniture Row",
        city: "Los Angeles",
        state: "CA", 
        zipCode: "90028",
        country: "United States"
      },
      phone: "(555) 987-6543",
      email: "la@curveredo.com",
      hours: {
        monday: "10:00 AM - 7:00 PM",
        tuesday: "10:00 AM - 7:00 PM",
        wednesday: "10:00 AM - 7:00 PM",
        thursday: "10:00 AM - 7:00 PM", 
        friday: "10:00 AM - 7:00 PM",
        saturday: "10:00 AM - 6:00 PM",
        sunday: "12:00 PM - 5:00 PM"
      },
      services: ["Product Viewing", "Design Consultation", "Material Selection"],
      isPublic: true
    },
    {
      id: "warehouse-oakland",
      name: "Oakland Manufacturing Facility",
      type: "warehouse",
      address: {
        street: "789 Industrial Way",
        city: "Oakland",
        state: "CA",
        zipCode: "94607", 
        country: "United States"
      },
      phone: "(555) 456-7890",
      email: "manufacturing@curveredo.com",
      hours: {
        monday: "7:00 AM - 4:00 PM",
        tuesday: "7:00 AM - 4:00 PM",
        wednesday: "7:00 AM - 4:00 PM",
        thursday: "7:00 AM - 4:00 PM",
        friday: "7:00 AM - 4:00 PM",
        saturday: "Closed",
        sunday: "Closed"
      },
      services: ["Custom Manufacturing", "Quality Control", "Shipping"],
      isPublic: false
    }
  ],
  responseTime: "We typically respond within 24 hours during business days",
  languages: ["English", "Spanish", "Mandarin"]
};

export const mockBusinessLocations: BusinessLocation[] = mockContactInformation.locations || [];