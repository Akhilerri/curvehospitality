# Contact Section Components

This directory contains components for the Contact section of the business website, implementing comprehensive contact information display and form functionality.

## Components

### ContactSection
Main container component that combines contact information display and contact form.

**Features:**
- Responsive grid layout with contact info and form
- Loading states and error handling
- Sticky form positioning on larger screens

**Usage:**
```tsx
import { ContactSection } from './ContactSection';

<ContactSection />
```

### ContactInformation
Displays comprehensive company contact information including multiple locations, business hours, and social media links.

**Features:**
- Main contact details (phone, email, address)
- Business hours display
- Multiple location support with individual details
- Social media links with icons
- Response time and language information
- Location type indicators (headquarters, showroom, warehouse)

**Props:**
- `contactInfo: ContactInformation` - Contact information data
- `className?: string` - Additional CSS classes

**Usage:**
```tsx
import { ContactInformation } from './ContactInformation';

<ContactInformation contactInfo={contactData} />
```

### ContactForm
Comprehensive contact form with validation and submission handling.

**Features:**
- Form validation using Zod schema
- Project type, budget, and timeline selection
- Preferred contact method selection
- Marketing consent checkbox
- File attachment support (future enhancement)
- Success/error state handling
- Loading states during submission

**Props:**
- `onSuccess?: () => void` - Callback for successful submission
- `className?: string` - Additional CSS classes

**Form Fields:**
- Name (required)
- Email (required)
- Phone (optional)
- Company (optional)
- Project type (dropdown)
- Budget range (dropdown)
- Timeline (dropdown)
- Preferred contact method (dropdown)
- Message (required)
- Marketing consent (checkbox)

**Usage:**
```tsx
import { ContactForm } from './ContactForm';

<ContactForm onSuccess={() => console.log('Form submitted!')} />
```

## Data Structure

### ContactInformation Type
```typescript
interface ContactInformation {
  companyName: string;
  description?: string;
  phone?: string;
  email?: string;
  address?: Address;
  businessHours?: Record<string, string>;
  socialMedia?: SocialMediaLinks;
  locations?: BusinessLocation[];
  responseTime?: string;
  languages?: string[];
}
```

### BusinessLocation Type
```typescript
interface BusinessLocation {
  id: string;
  name: string;
  type: 'headquarters' | 'showroom' | 'warehouse' | 'office';
  address: Address;
  phone?: string;
  email?: string;
  hours?: BusinessHours;
  services?: string[];
  isPublic?: boolean;
}
```

### ContactForm Type
```typescript
interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: ProjectType;
  budget?: BudgetRange;
  timeline?: TimelineRange;
  message: string;
  preferredContact?: PreferredContactMethod;
  marketingConsent?: boolean;
}
```

## Hooks

### useContactInformation
Manages loading and state for contact information data.

**Returns:**
- `contactInfo: ContactInformation | null` - Contact information data
- `loading: boolean` - Loading state
- `error: string | null` - Error message if any

### useContactForm
Handles contact form submission and state management.

**Returns:**
- `submitForm: (data: ContactForm) => Promise<ContactSubmission | null>` - Form submission function
- `submitting: boolean` - Submission loading state
- `submitted: boolean` - Success state
- `error: string | null` - Error message if any
- `resetForm: () => void` - Reset form state

## Mock Data

### mockContactInformation
Comprehensive mock data including:
- Company information and description
- Primary contact details
- Business hours for all days
- Social media links (Facebook, Instagram, LinkedIn, Pinterest, Houzz)
- Multiple locations:
  - San Francisco Headquarters
  - Los Angeles Showroom
  - Oakland Manufacturing Facility
- Response time and supported languages

## Validation

All form inputs are validated using Zod schemas defined in `shared/validation/contact.ts`:

- **Name**: Required, 1-100 characters
- **Email**: Required, valid email format
- **Phone**: Optional, valid phone format
- **Message**: Required, 10-2000 characters
- **Project Type**: Optional enum selection
- **Budget/Timeline**: Optional enum selections

## Styling

Components use Tailwind CSS with the design system:
- Consistent spacing and typography
- Responsive grid layouts
- Card-based information display
- Icon integration with Lucide React
- Form validation error states
- Loading and success states

## Accessibility

- Proper form labels and ARIA attributes
- Keyboard navigation support
- Screen reader friendly content
- Color contrast compliance
- Focus management in forms

## Future Enhancements

1. **File Attachments**: Support for project images/documents
2. **Map Integration**: Interactive maps for business locations
3. **Live Chat**: Real-time chat widget integration
4. **Appointment Booking**: Calendar integration for consultations
5. **Multi-language**: Form translation support
6. **CRM Integration**: Direct integration with customer management systems

## Requirements Satisfied

This implementation satisfies the following requirements:

**Requirement 7.1**: Multiple contact methods and business hours display
**Requirement 7.2**: Contact form with proper validation
**Requirement 7.3**: Form submission handling with confirmations
**Requirement 7.4**: Business hours and response time expectations
**Requirement 7.5**: Multiple location support with contact information