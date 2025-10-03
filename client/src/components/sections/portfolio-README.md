# Portfolio & Projects System

This directory contains the complete portfolio and projects system implementation, featuring a responsive masonry gallery, advanced filtering capabilities, and detailed case study modals.

## Components Overview

### 1. PortfolioGallery (`PortfolioGallery.tsx`)
A responsive masonry layout component for displaying project cards.

**Features:**
- Responsive masonry grid (1 column mobile, 2 tablet, 3 desktop)
- Hover effects with project information overlay
- Featured project badges
- Lazy loading support
- Empty state handling

**Props:**
- `projects: Project[]` - Array of projects to display
- `onProjectClick: (project: Project) => void` - Callback when project is clicked
- `className?: string` - Additional CSS classes

### 2. ProjectFilter (`ProjectFilter.tsx`)
Advanced filtering component with search and multiple filter categories.

**Features:**
- Text search across project titles, descriptions, and tags
- Filter by project segment (hospitality, corporate, etc.)
- Filter by brand and location
- Featured projects toggle
- Active filter indicators with clear buttons
- Results count display

**Props:**
- `filters: PortfolioFilters` - Current filter state
- `filterOptions: PortfolioFilterOptions` - Available filter options
- `onFilterChange: (key, value) => void` - Filter change callback
- `onClearFilters: () => void` - Clear all filters callback
- `hasActiveFilters: boolean` - Whether any filters are active
- `activeFilterCount: number` - Number of active filters
- `totalProjects: number` - Total number of projects
- `filteredCount: number` - Number of filtered projects

### 3. CaseStudyModal (`CaseStudyModal.tsx`)
Detailed project view modal with image carousel and comprehensive project information.

**Features:**
- Full-screen modal with backdrop blur
- Image carousel with before/after/process/final categorization
- Thumbnail navigation
- Keyboard navigation (arrow keys, escape)
- Project challenges, solutions, and results
- Client testimonials with ratings
- Project metadata (location, completion date, etc.)
- Responsive design for mobile and desktop

**Props:**
- `project: Project | null` - Project to display
- `isOpen: boolean` - Modal visibility state
- `onClose: () => void` - Close modal callback

## Hooks

### usePortfolio (`usePortfolio.ts`)
Main hook for managing portfolio state and filtering logic.

**Features:**
- URL state management for filters (persists on page refresh)
- Dynamic filter options generation
- Project filtering logic
- Featured projects extraction
- Selected project state management

**Returns:**
- `projects` - Filtered projects array
- `featuredProjects` - Featured projects only
- `allProjects` - All projects (unfiltered)
- `filters` - Current filter state
- `filterOptions` - Available filter options
- `hasActiveFilters` - Boolean indicating active filters
- `activeFilterCount` - Number of active filters
- `updateFilter` - Function to update individual filter
- `clearFilters` - Function to clear all filters
- `clearFilter` - Function to clear specific filter
- `selectedProject` - Currently selected project for modal
- `setSelectedProject` - Function to set selected project

### useUrlState (`useUrlState.ts`)
Generic hook for syncing state with URL search parameters.

**Features:**
- Automatic URL synchronization
- Browser history management
- Custom serialization/deserialization
- Support for both individual values and objects
- Handles browser back/forward navigation

## Data Structure

### Project Type
```typescript
interface Project {
  id: string;
  companyId: string;
  title: string;
  client?: string;
  location?: string;
  brand?: string;
  segment?: ProjectSegment;
  description?: string;
  challenges?: string[];
  solutions?: string[];
  results?: string[];
  images?: ProjectImage[];
  completedAt?: Date;
  isFeatured?: boolean;
  testimonial?: Testimonial;
  tags?: string[];
  services?: string[];
}
```

### ProjectImage Type
```typescript
interface ProjectImage {
  url: string;
  alt: string;
  width: number;
  height: number;
  type: 'before' | 'after' | 'process' | 'final';
  order: number;
  room?: string;
  description?: string;
}
```

## Usage Examples

### Basic Portfolio Page
```tsx
import { Portfolio } from '../pages/Portfolio';

export const PortfolioPage = () => {
  return <Portfolio />;
};
```

### Custom Portfolio Implementation
```tsx
import { PortfolioGallery, ProjectFilter, CaseStudyModal } from '../components/sections';
import { usePortfolio } from '../hooks/usePortfolio';
import { mockProjects } from '../data/mockProjects';

export const CustomPortfolio = () => {
  const {
    projects,
    filters,
    filterOptions,
    updateFilter,
    selectedProject,
    setSelectedProject,
  } = usePortfolio(mockProjects);

  return (
    <div>
      <ProjectFilter
        filters={filters}
        filterOptions={filterOptions}
        onFilterChange={updateFilter}
        // ... other props
      />
      <PortfolioGallery
        projects={projects}
        onProjectClick={setSelectedProject}
      />
      <CaseStudyModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};
```

## Styling

The components use Tailwind CSS for styling with the following design principles:

- **Color Palette:** Gray scale with blue accents for interactive elements
- **Typography:** Consistent font sizes and weights for hierarchy
- **Spacing:** 8px grid system for consistent spacing
- **Responsive:** Mobile-first approach with breakpoints at 640px and 1024px
- **Animations:** Subtle hover effects and transitions for better UX

## Accessibility Features

- **Keyboard Navigation:** Full keyboard support for all interactive elements
- **Screen Reader Support:** Proper ARIA labels and semantic HTML
- **Focus Management:** Visible focus indicators and logical tab order
- **Color Contrast:** WCAG AA compliant color combinations
- **Alternative Text:** Comprehensive alt text for all images

## Performance Optimizations

- **Lazy Loading:** Images load as needed during scrolling
- **Memoization:** React.memo and useMemo for expensive calculations
- **URL State:** Efficient URL parameter management
- **Bundle Splitting:** Components can be lazy-loaded
- **Image Optimization:** Responsive images with proper sizing

## Browser Support

- **Modern Browsers:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Browsers:** iOS Safari 14+, Chrome Mobile 90+
- **Fallbacks:** Graceful degradation for older browsers

## Testing

The components include comprehensive test coverage:

- **Unit Tests:** Individual component functionality
- **Integration Tests:** Component interaction and data flow
- **E2E Tests:** Complete user workflows
- **Accessibility Tests:** Screen reader and keyboard navigation
- **Performance Tests:** Loading times and responsiveness

## Future Enhancements

Potential improvements and extensions:

1. **Virtual Scrolling:** For large project collections
2. **Advanced Search:** Full-text search with highlighting
3. **Sorting Options:** Sort by date, name, or relevance
4. **Infinite Scroll:** Load more projects on scroll
5. **Social Sharing:** Share individual projects
6. **Print Styles:** Optimized printing layouts
7. **Offline Support:** Service worker for offline viewing
8. **Analytics:** Track project views and interactions