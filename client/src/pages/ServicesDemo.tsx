import React, { useState } from 'react';
import { Service } from '@shared/types/services';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { ServiceDetailPage } from '@/components/sections/ServiceDetailPage';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

// Mock data for demonstration
const mockServices: Service[] = [
  {
    id: '1',
    companyId: 'company-1',
    title: 'Custom Manufacturing',
    description: 'Precision manufacturing of custom furniture, fixtures, and architectural elements with expert craftsmanship.',
    type: 'manufacturing',
    capabilities: [
      'Custom furniture design and fabrication',
      'Architectural millwork and cabinetry',
      'Metal fabrication and finishing',
      'Upholstery and soft goods production',
      'Quality control and finishing',
      'Installation and delivery services'
    ],
    processSteps: [
      {
        step: 1,
        title: 'Design Consultation',
        description: 'Initial meeting to understand your vision, requirements, and project scope.',
        duration: '1-2 weeks',
        deliverables: ['Project brief', 'Initial concepts', 'Timeline proposal'],
        clientInvolvement: 'Active participation in design discussions and feedback sessions.'
      },
      {
        step: 2,
        title: 'Technical Development',
        description: 'Detailed engineering drawings, material specifications, and production planning.',
        duration: '2-3 weeks',
        deliverables: ['Technical drawings', 'Material specifications', 'Production schedule'],
        clientInvolvement: 'Review and approval of technical specifications and materials.'
      },
      {
        step: 3,
        title: 'Production',
        description: 'Manufacturing process with regular quality checks and progress updates.',
        duration: '4-8 weeks',
        deliverables: ['Progress reports', 'Quality inspections', 'Finished products'],
        clientInvolvement: 'Regular updates and milestone approvals.'
      },
      {
        step: 4,
        title: 'Delivery & Installation',
        description: 'Professional delivery, installation, and final quality inspection.',
        duration: '1 week',
        deliverables: ['Installation', 'Final inspection', 'Care instructions'],
        clientInvolvement: 'Final walkthrough and sign-off.'
      }
    ],
    deliverables: [
      'Custom manufactured products',
      'Installation services',
      'Quality warranty',
      'Care and maintenance guide',
      'Technical documentation'
    ],
    pricing: {
      type: 'project',
      description: 'Pricing varies based on complexity, materials, and quantity. Contact us for a detailed quote.',
      priceRange: {
        min: 5000,
        max: 50000
      }
    },
    duration: {
      typical: '6-12 weeks',
      minimum: '4 weeks',
      maximum: '16 weeks',
      factors: [
        'Project complexity',
        'Material availability',
        'Custom specifications',
        'Quantity requirements'
      ]
    },
    orderIndex: 1,
    isActive: true
  },
  {
    id: '2',
    companyId: 'company-1',
    title: 'Interior Design',
    description: 'Complete interior design services from space planning to final styling with expert design guidance.',
    type: 'interior_design',
    capabilities: [
      'Space planning and layout design',
      'Color and material selection',
      'Furniture and fixture specification',
      'Lighting design and planning',
      '3D visualization and renderings',
      'Project coordination and management'
    ],
    processSteps: [
      {
        step: 1,
        title: 'Discovery & Programming',
        description: 'Understanding your lifestyle, preferences, and functional requirements.',
        duration: '1 week',
        deliverables: ['Design brief', 'Space analysis', 'Program requirements'],
        clientInvolvement: 'Detailed interviews and space walkthrough.'
      },
      {
        step: 2,
        title: 'Concept Development',
        description: 'Creating initial design concepts and mood boards for your approval.',
        duration: '2-3 weeks',
        deliverables: ['Concept boards', 'Space plans', '3D visualizations'],
        clientInvolvement: 'Review concepts and provide feedback for refinement.'
      },
      {
        step: 3,
        title: 'Design Development',
        description: 'Detailed design with specifications, materials, and product selections.',
        duration: '3-4 weeks',
        deliverables: ['Detailed drawings', 'Material boards', 'Product specifications'],
        clientInvolvement: 'Approve materials, finishes, and product selections.'
      },
      {
        step: 4,
        title: 'Implementation',
        description: 'Coordinating procurement, delivery, and installation of all elements.',
        duration: '4-12 weeks',
        deliverables: ['Project coordination', 'Installation oversight', 'Final styling'],
        clientInvolvement: 'Regular updates and milestone approvals.'
      }
    ],
    deliverables: [
      'Complete design package',
      'Material and finish specifications',
      'Furniture and fixture plans',
      'Project coordination',
      'Final styling and installation'
    ],
    pricing: {
      type: 'project',
      description: 'Design fees based on project scope and square footage. Furniture and materials quoted separately.',
      priceRange: {
        min: 10000,
        max: 100000
      }
    },
    duration: {
      typical: '3-6 months',
      minimum: '6 weeks',
      maximum: '12 months',
      factors: [
        'Project size and complexity',
        'Custom elements required',
        'Client decision timeline',
        'Product lead times'
      ]
    },
    orderIndex: 2,
    isActive: true
  },
  {
    id: '3',
    companyId: 'company-1',
    title: 'Strategic Procurement',
    description: 'Professional sourcing and procurement services for furniture, fixtures, and materials with vendor management.',
    type: 'procurement',
    capabilities: [
      'Vendor sourcing and qualification',
      'Price negotiation and contracts',
      'Quality control and inspection',
      'Logistics and delivery coordination',
      'Inventory management',
      'Cost optimization strategies'
    ],
    processSteps: [
      {
        step: 1,
        title: 'Requirements Analysis',
        description: 'Detailed analysis of procurement needs, specifications, and budget parameters.',
        duration: '1 week',
        deliverables: ['Procurement plan', 'Vendor criteria', 'Budget analysis'],
        clientInvolvement: 'Define requirements and approve procurement strategy.'
      },
      {
        step: 2,
        title: 'Vendor Sourcing',
        description: 'Identifying and qualifying vendors, obtaining quotes, and negotiating terms.',
        duration: '2-3 weeks',
        deliverables: ['Vendor proposals', 'Cost comparisons', 'Contract terms'],
        clientInvolvement: 'Review vendor options and approve selections.'
      },
      {
        step: 3,
        title: 'Order Management',
        description: 'Processing orders, tracking production, and managing delivery schedules.',
        duration: '4-12 weeks',
        deliverables: ['Order confirmations', 'Progress tracking', 'Quality reports'],
        clientInvolvement: 'Approve orders and receive regular status updates.'
      }
    ],
    deliverables: [
      'Vendor management',
      'Cost savings analysis',
      'Quality assurance',
      'Delivery coordination',
      'Documentation and reporting'
    ],
    pricing: {
      type: 'project',
      description: 'Service fees typically 5-10% of procurement value, with cost savings often exceeding fees.',
      startingPrice: 2500
    },
    duration: {
      typical: '6-16 weeks',
      minimum: '4 weeks',
      maximum: '24 weeks',
      factors: [
        'Product complexity',
        'Vendor lead times',
        'Custom manufacturing',
        'Shipping requirements'
      ]
    },
    orderIndex: 3,
    isActive: true
  },
  {
    id: '4',
    companyId: 'company-1',
    title: 'Project Management',
    description: 'End-to-end project coordination ensuring timely delivery, quality control, and seamless execution.',
    type: 'project_management',
    capabilities: [
      'Project planning and scheduling',
      'Vendor and contractor coordination',
      'Quality control and inspections',
      'Budget tracking and reporting',
      'Risk management and mitigation',
      'Client communication and updates'
    ],
    processSteps: [
      {
        step: 1,
        title: 'Project Initiation',
        description: 'Establishing project scope, timeline, and communication protocols.',
        duration: '1 week',
        deliverables: ['Project charter', 'Communication plan', 'Risk assessment'],
        clientInvolvement: 'Define project goals and approve management approach.'
      },
      {
        step: 2,
        title: 'Planning & Coordination',
        description: 'Detailed project planning, resource allocation, and vendor coordination.',
        duration: '1-2 weeks',
        deliverables: ['Project schedule', 'Resource plan', 'Vendor coordination'],
        clientInvolvement: 'Review and approve project timeline and milestones.'
      },
      {
        step: 3,
        title: 'Execution & Monitoring',
        description: 'Active project management with regular monitoring, reporting, and issue resolution.',
        duration: 'Project duration',
        deliverables: ['Progress reports', 'Issue resolution', 'Quality control'],
        clientInvolvement: 'Regular status meetings and milestone approvals.'
      },
      {
        step: 4,
        title: 'Project Closeout',
        description: 'Final inspections, documentation, and project handover.',
        duration: '1 week',
        deliverables: ['Final inspection', 'Project documentation', 'Lessons learned'],
        clientInvolvement: 'Final walkthrough and project acceptance.'
      }
    ],
    deliverables: [
      'Project planning and scheduling',
      'Regular progress reporting',
      'Quality control and inspections',
      'Issue resolution and risk management',
      'Final project documentation'
    ],
    pricing: {
      type: 'project',
      description: 'Management fees typically 10-15% of total project value, ensuring professional oversight.',
      priceRange: {
        min: 5000,
        max: 25000
      }
    },
    duration: {
      typical: 'Project dependent',
      factors: [
        'Project complexity',
        'Number of vendors',
        'Timeline requirements',
        'Quality standards'
      ]
    },
    orderIndex: 4,
    isActive: true
  }
];

export function ServicesDemo() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
  };

  const handleBackClick = () => {
    setSelectedService(null);
  };

  const handleContactClick = () => {
    alert('Contact functionality would be implemented here');
  };

  const handleQuoteClick = () => {
    alert('Quote request functionality would be implemented here');
  };

  if (selectedService) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="outline" 
            onClick={handleBackClick}
            className="mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Button>
          
          <ServiceDetailPage
            service={selectedService}
            onContactClick={handleContactClick}
            onQuoteClick={handleQuoteClick}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <ServicesSection
          services={mockServices}
          onServiceClick={handleServiceClick}
        />
      </div>
    </div>
  );
}