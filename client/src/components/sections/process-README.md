# Process Section Components

This directory contains components for displaying the company's work process, including workflow visualization and project timeline functionality.

## Components

### ProcessSection
Main container component that combines workflow visualization and timeline views with a toggle between them.

**Props:**
- `workflow: ProcessWorkflow` - The complete workflow data
- `currentPhase?: string` - ID of the currently active phase
- `completedPhases?: string[]` - Array of completed phase IDs
- `className?: string` - Additional CSS classes

**Features:**
- Toggle between workflow overview and timeline view
- Responsive design with mobile optimization
- Process benefits section
- Call-to-action integration

### ProcessWorkflowVisualization
Visual representation of the complete workflow with step-by-step breakdown.

**Props:**
- `workflow: ProcessWorkflow` - The workflow data to display
- `className?: string` - Additional CSS classes

**Features:**
- Phase-based organization with step cards
- Visual connectors between steps
- Deliverables and client involvement display
- Responsive grid layout
- Icon integration for visual appeal

### ProcessTimeline
Interactive timeline showing project phases with expandable details.

**Props:**
- `phases: ProcessPhase[]` - Array of process phases
- `currentPhase?: string` - ID of the currently active phase
- `completedPhases?: string[]` - Array of completed phase IDs
- `className?: string` - Additional CSS classes

**Features:**
- Expandable phase details
- Visual status indicators (completed, active, upcoming)
- Deliverables and client involvement breakdown
- Timeline legend
- Click-to-expand functionality

## Hooks

### useProcess
Main hook for managing process workflow data and state.

**Returns:**
- `workflow: ProcessWorkflow | null` - The workflow data
- `phases: ProcessPhase[]` - Array of phases
- `currentPhase?: string` - Current active phase ID
- `completedPhases: string[]` - Array of completed phase IDs
- `isLoading: boolean` - Loading state
- `error: string | null` - Error message if any
- `setCurrentPhase: (phaseId: string) => void` - Set current phase
- `markPhaseComplete: (phaseId: string) => void` - Mark phase as complete
- `markPhaseIncomplete: (phaseId: string) => void` - Mark phase as incomplete

### useProcessStats
Utility hook for calculating process statistics.

**Parameters:**
- `workflow: ProcessWorkflow | null` - The workflow to analyze

**Returns:**
- `totalPhases: number` - Total number of phases
- `totalSteps: number` - Total number of steps across all phases
- `totalDeliverables: number` - Total number of deliverables
- `estimatedDuration: string | null` - Total estimated duration

## Data Types

### ProcessWorkflow
```typescript
interface ProcessWorkflow {
  id: string;
  title: string;
  description: string;
  phases: ProcessPhase[];
  totalDuration?: string;
  overview?: string;
}
```

### ProcessPhase
```typescript
interface ProcessPhase {
  id: string;
  title: string;
  description: string;
  steps: ProcessStep[];
  duration?: string;
  orderIndex: number;
}
```

### ProcessStep
```typescript
interface ProcessStep {
  id: string;
  title: string;
  description: string;
  duration?: string;
  deliverables: string[];
  clientInvolvement: string[];
  icon?: string;
  orderIndex: number;
}
```

## Usage Examples

### Basic Process Section
```tsx
import { ProcessSection } from '@/components/sections';
import { useProcess } from '@/hooks/useProcess';

function ProcessPage() {
  const { workflow, currentPhase, completedPhases } = useProcess();
  
  return (
    <ProcessSection 
      workflow={workflow}
      currentPhase={currentPhase}
      completedPhases={completedPhases}
    />
  );
}
```

### Workflow Visualization Only
```tsx
import { ProcessWorkflowVisualization } from '@/components/sections';
import { mockProcessWorkflow } from '@/data/mockProcess';

function WorkflowPage() {
  return (
    <ProcessWorkflowVisualization workflow={mockProcessWorkflow} />
  );
}
```

### Interactive Timeline
```tsx
import { ProcessTimeline } from '@/components/sections';
import { useProcess } from '@/hooks/useProcess';

function TimelinePage() {
  const { phases, currentPhase, completedPhases } = useProcess();
  
  return (
    <ProcessTimeline 
      phases={phases}
      currentPhase={currentPhase}
      completedPhases={completedPhases}
    />
  );
}
```

## Styling

The components use Tailwind CSS with the following design principles:
- Consistent spacing using the 8px grid system
- Primary and secondary color scheme integration
- Responsive breakpoints for mobile, tablet, and desktop
- Hover and focus states for interactive elements
- Smooth transitions and animations

## Mock Data

Mock data is provided in `@/data/mockProcess.ts` including:
- Complete workflow with 4 phases
- 8 detailed process steps
- Deliverables and client involvement for each step
- Icon mappings for visual elements

## Requirements Satisfied

This implementation satisfies the following requirements:
- **5.1**: Step-by-step process display with visual representations
- **5.2**: Timeline component showing project phases and client involvement
- **5.3**: Responsive design with flowcharts and infographics
- **5.4**: Display deliverables and expectations at each stage

## Demo Pages

- `/process` - Full process page with hero section and FAQ
- `/process-demo` - Interactive demo with controls and component isolation