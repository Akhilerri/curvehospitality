# Services Section Components

This directory contains the components for the Services section of the business website, implementing task 5 from the business website specification.

## Components

### ServicesSection
Main container component that displays the services overview with a header and call-to-action section.

**Props:**
- `services: Service[]` - Array of service objects
- `onServiceClick?: (service: Service) => void` - Callback when a service card is clicked
- `className?: string` - Optional CSS classes

### ServiceOverviewGrid
Grid component that displays service cards with hover effects and navigation capabilities.

**Props:**
- `services: Service[]` - Array of service objects
- `onServiceClick?: (service: Service) => void` - Callback when a service card is clicked
- `className?: string` - Optional CSS classes

**Features:**
- Responsive grid layout (1 column on mobile, 2 on tablet, 4 on desktop)
- Hover effects with elevation and color transitions
- Service icons for each service type (Manufacturing, Interior Design, Procurement, Project Management)
- Capability previews with "show more" indication
- Call-to-action buttons

### ServiceDetailPage
Detailed view component for individual services with comprehensive information display.

**Props:**
- `service: Service` - The service object to display
- `onContactClick?: () => void` - Callback for contact actions
- `onQuoteClick?: () => void` - Callback for quote requests
- `className?: string` - Optional CSS classes

**Features:**
- Hero section with service title and description
- Capabilities section with organized list
- Process steps with detailed workflow
- Deliverables section
- Pricing information sidebar
- Timeline/duration information
- Contact options with multiple methods
- Responsive layout with sidebar on desktop

## Service Types

The components support four service types as defined in the requirements:

1. **Manufacturing** (`manufacturing`) - Custom furniture and fixture manufacturing
2. **Interior Design** (`interior_design`) - Complete design services
3. **Procurement** (`procurement`) - Strategic sourcing and vendor management
4. **Project Management** (`project_management`) - End-to-end project coordination

## Usage Example

```tsx
import { ServicesSection, ServiceDetailPage } from '@/components/sections';
import { Service } from '@shared/types/services';

function ServicesPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  if (selectedService) {
    return (
      <ServiceDetailPage
        service={selectedService}
        onContactClick={() => navigate('/contact')}
        onQuoteClick={() => navigate('/quote')}
      />
    );
  }

  return (
    <ServicesSection
      services={services}
      onServiceClick={setSelectedService}
    />
  );
}
```

## Requirements Fulfilled

This implementation fulfills the following requirements from the specification:

- **Requirement 2.1**: Display four main service categories with descriptions
- **Requirement 2.2**: Provide detailed service information and capabilities
- **Requirement 2.3**: Include relevant imagery and examples (structure provided)
- **Requirement 2.4**: Clear calls-to-action for contact and quotes

## Integration

The services section is integrated into the main application at `/services` route and uses the existing:
- UI components from `@/components/ui`
- Type definitions from `@shared/types/services`
- Validation schemas from `@shared/validation/services`
- Business layout wrapper for consistent styling