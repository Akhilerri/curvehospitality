import { useState, useMemo } from 'react';
import { Project } from '../../../shared/types/projects';
import { ProjectSegment } from '../../../shared/types/common';
import { useUrlStateObject } from './useUrlState';

export interface PortfolioFilters {
  brand?: string;
  segment?: ProjectSegment;
  location?: string;
  isFeatured?: boolean;
  searchQuery?: string;
}

export interface PortfolioFilterOptions {
  brands: string[];
  segments: ProjectSegment[];
  locations: string[];
}

const defaultFilters: PortfolioFilters = {};

export const usePortfolio = (projects: Project[]) => {
  const [filters, setFilters] = useUrlStateObject(defaultFilters, {
    replace: true, // Use replaceState to avoid cluttering browser history
    serialize: (value: any) => {
      if (typeof value === 'boolean') return value.toString();
      return String(value);
    },
    deserialize: (value: string) => {
      if (value === 'true') return true;
      if (value === 'false') return false;
      return value;
    },
  });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Generate filter options from available projects
  const filterOptions = useMemo((): PortfolioFilterOptions => {
    const brands = Array.from(
      new Set(projects.map(p => p.brand).filter(Boolean))
    ) as string[];
    
    const segments = Array.from(
      new Set(projects.map(p => p.segment).filter(Boolean))
    ) as ProjectSegment[];
    
    const locations = Array.from(
      new Set(projects.map(p => p.location).filter(Boolean))
    ) as string[];

    return {
      brands: brands.sort(),
      segments: segments.sort(),
      locations: locations.sort(),
    };
  }, [projects]);

  // Filter projects based on current filters
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      // Brand filter
      if (filters.brand && project.brand !== filters.brand) {
        return false;
      }

      // Segment filter
      if (filters.segment && project.segment !== filters.segment) {
        return false;
      }

      // Location filter
      if (filters.location && project.location !== filters.location) {
        return false;
      }

      // Featured filter
      if (filters.isFeatured !== undefined && project.isFeatured !== filters.isFeatured) {
        return false;
      }

      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const searchableText = [
          project.title,
          project.client,
          project.description,
          project.brand,
          project.location,
          ...(project.tags || []),
        ].join(' ').toLowerCase();

        if (!searchableText.includes(query)) {
          return false;
        }
      }

      return true;
    });
  }, [projects, filters]);

  // Featured projects
  const featuredProjects = useMemo(() => {
    return projects.filter(project => project.isFeatured);
  }, [projects]);

  // Update individual filter
  const updateFilter = (key: keyof PortfolioFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value === undefined || value === '' ? undefined : value,
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  // Clear specific filter
  const clearFilter = (key: keyof PortfolioFilters) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return Object.values(filters).some(value => 
      value !== undefined && value !== '' && value !== null
    );
  }, [filters]);

  // Get filter count
  const activeFilterCount = useMemo(() => {
    return Object.values(filters).filter(value => 
      value !== undefined && value !== '' && value !== null
    ).length;
  }, [filters]);

  return {
    // Data
    projects: filteredProjects,
    featuredProjects,
    allProjects: projects,
    
    // Filters
    filters,
    filterOptions,
    hasActiveFilters,
    activeFilterCount,
    
    // Filter actions
    updateFilter,
    clearFilters,
    clearFilter,
    
    // Selected project for modal/detail view
    selectedProject,
    setSelectedProject,
    
    // Utility functions
    getProjectById: (id: string) => projects.find(p => p.id === id),
    getProjectsBySegment: (segment: ProjectSegment) => 
      projects.filter(p => p.segment === segment),
    getProjectsByBrand: (brand: string) => 
      projects.filter(p => p.brand === brand),
  };
};

export default usePortfolio;