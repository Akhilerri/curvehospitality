import { ProcessWorkflow, ProcessPhase, ProcessStep } from '@shared/types/process';

const discoverySteps: ProcessStep[] = [
  {
    id: 'step-1-1',
    title: 'Initial Consultation',
    description: 'Meet with client to understand project vision, requirements, and constraints',
    duration: '1-2 hours',
    deliverables: ['Project brief', 'Initial requirements document'],
    clientInvolvement: ['Project vision discussion', 'Requirements gathering session'],
    icon: 'MessageCircle',
    orderIndex: 1,
  },
  {
    id: 'step-1-2',
    title: 'Site Assessment',
    description: 'Comprehensive evaluation of the space, measurements, and existing conditions',
    duration: '2-4 hours',
    deliverables: ['Site survey report', 'Existing conditions documentation', 'Photo inventory'],
    clientInvolvement: ['Site walkthrough', 'Access coordination'],
    icon: 'MapPin',
    orderIndex: 2,
  },
  {
    id: 'step-1-3',
    title: 'Budget & Timeline Planning',
    description: 'Establish project budget parameters and realistic timeline expectations',
    duration: '1-2 days',
    deliverables: ['Budget framework', 'Project timeline', 'Scope definition'],
    clientInvolvement: ['Budget discussion', 'Timeline approval'],
    icon: 'Calendar',
    orderIndex: 3,
  },
];

const designSteps: ProcessStep[] = [
  {
    id: 'step-2-1',
    title: 'Concept Development',
    description: 'Create initial design concepts and mood boards based on client requirements',
    duration: '1-2 weeks',
    deliverables: ['Concept boards', 'Space planning options', 'Material palette'],
    clientInvolvement: ['Concept review meeting', 'Feedback session'],
    icon: 'Palette',
    orderIndex: 1,
  },
  {
    id: 'step-2-2',
    title: 'Design Development',
    description: 'Refine selected concept with detailed drawings and specifications',
    duration: '2-3 weeks',
    deliverables: ['Detailed floor plans', '3D renderings', 'Material specifications'],
    clientInvolvement: ['Design review sessions', 'Material selections'],
    icon: 'Drafting',
    orderIndex: 2,
  },
  {
    id: 'step-2-3',
    title: 'Final Design Approval',
    description: 'Present final design package and obtain client approval to proceed',
    duration: '1 week',
    deliverables: ['Final design package', 'Signed approval documents'],
    clientInvolvement: ['Final presentation', 'Design sign-off'],
    icon: 'CheckCircle',
    orderIndex: 3,
  },
];

const procurementSteps: ProcessStep[] = [
  {
    id: 'step-3-1',
    title: 'Vendor Selection',
    description: 'Identify and evaluate suppliers for furniture, fixtures, and materials',
    duration: '1-2 weeks',
    deliverables: ['Vendor list', 'Quote comparisons', 'Quality assessments'],
    clientInvolvement: ['Vendor approval', 'Budget confirmation'],
    icon: 'Users',
    orderIndex: 1,
  },
  {
    id: 'step-3-2',
    title: 'Order Management',
    description: 'Place orders, coordinate delivery schedules, and track production',
    duration: '4-8 weeks',
    deliverables: ['Purchase orders', 'Delivery schedule', 'Quality control reports'],
    clientInvolvement: ['Order approvals', 'Schedule coordination'],
    icon: 'Package',
    orderIndex: 2,
  },
];

const implementationSteps: ProcessStep[] = [
  {
    id: 'step-4-1',
    title: 'Project Coordination',
    description: 'Coordinate all trades, deliveries, and installation schedules',
    duration: '2-6 weeks',
    deliverables: ['Installation schedule', 'Coordination meetings', 'Progress reports'],
    clientInvolvement: ['Schedule approvals', 'Access coordination'],
    icon: 'Settings',
    orderIndex: 1,
  },
  {
    id: 'step-4-2',
    title: 'Installation & Setup',
    description: 'Oversee installation of all furniture, fixtures, and finishing touches',
    duration: '1-3 weeks',
    deliverables: ['Installation supervision', 'Quality inspections', 'Punch list'],
    clientInvolvement: ['Installation oversight', 'Final walkthrough'],
    icon: 'Wrench',
    orderIndex: 2,
  },
  {
    id: 'step-4-3',
    title: 'Project Completion',
    description: 'Final inspection, documentation, and project handover to client',
    duration: '1 week',
    deliverables: ['Final documentation', 'Warranty information', 'Maintenance guidelines'],
    clientInvolvement: ['Final approval', 'Project handover meeting'],
    icon: 'Award',
    orderIndex: 3,
  },
];

const mockPhases: ProcessPhase[] = [
  {
    id: 'phase-1',
    title: 'Discovery & Planning',
    description: 'Understanding your vision and establishing project foundations',
    steps: discoverySteps,
    duration: '1-2 weeks',
    orderIndex: 1,
  },
  {
    id: 'phase-2',
    title: 'Design Development',
    description: 'Creating and refining your custom design solution',
    steps: designSteps,
    duration: '4-6 weeks',
    orderIndex: 2,
  },
  {
    id: 'phase-3',
    title: 'Procurement & Manufacturing',
    description: 'Sourcing materials and coordinating production',
    steps: procurementSteps,
    duration: '6-10 weeks',
    orderIndex: 3,
  },
  {
    id: 'phase-4',
    title: 'Implementation & Completion',
    description: 'Bringing your design to life with professional installation',
    steps: implementationSteps,
    duration: '3-9 weeks',
    orderIndex: 4,
  },
];

export const mockProcessWorkflow: ProcessWorkflow = {
  id: 'workflow-1',
  title: 'Our Design & Manufacturing Process',
  description: 'A comprehensive approach that ensures exceptional results from concept to completion',
  phases: mockPhases,
  totalDuration: '14-27 weeks',
  overview: 'Our proven process combines creative design expertise with manufacturing excellence to deliver spaces that exceed expectations. Each phase is carefully structured to ensure clear communication, quality control, and client satisfaction throughout your project journey.',
};

export const processIcons = {
  MessageCircle: '💬',
  MapPin: '📍',
  Calendar: '📅',
  Palette: '🎨',
  Drafting: '📐',
  CheckCircle: '✅',
  Users: '👥',
  Package: '📦',
  Settings: '⚙️',
  Wrench: '🔧',
  Award: '🏆',
} as const;