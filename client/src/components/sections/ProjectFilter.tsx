import React, { useState } from 'react';
import { Search, X, Filter, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { ProjectSegment } from '../../../../shared/types/common';
import { PortfolioFilters, PortfolioFilterOptions } from '../../hooks/usePortfolio';

interface ProjectFilterProps {
  filters: PortfolioFilters;
  filterOptions: PortfolioFilterOptions;
  onFilterChange: (key: keyof PortfolioFilters, value: any) => void;
  onClearFilters: () => void;
  onClearFilter: (key: keyof PortfolioFilters) => void;
  hasActiveFilters: boolean;
  activeFilterCount: number;
  totalProjects: number;
  filteredCount: number;
}

const FilterButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
  onClear?: () => void;
}> = ({ label, isActive, onClick, onClear }) => (
  <div className="relative">
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        isActive
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted text-muted-foreground hover:bg-muted/80'
      }`}
    >
      {label}
    </button>
    {isActive && onClear && (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClear();
        }}
        className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/80 transition-colors"
      >
        <X size={12} />
      </button>
    )}
  </div>
);

export const ProjectFilter: React.FC<ProjectFilterProps> = ({
  filters,
  filterOptions,
  onFilterChange,
  onClearFilters,
  onClearFilter,
  hasActiveFilters,
  activeFilterCount,
  totalProjects,
  filteredCount,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const segmentLabels: Record<ProjectSegment, string> = {
    hospitality: 'Hospitality',
    corporate: 'Corporate',
    residential: 'Residential',
    retail: 'Retail',
    healthcare: 'Healthcare',
    education: 'Education',
    commercial: 'Commercial',
  };

  return (
    <div className="mb-6">
      {/* Compact Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border border-border rounded-lg p-4">
        {/* Left side - Filter button and active filters */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg text-sm font-medium transition-colors"
          >
            <Filter size={16} className="text-muted-foreground" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                {activeFilterCount}
              </span>
            )}
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {/* Quick filter chips - visible when collapsed */}
          {!isExpanded && (
            <div className="flex flex-wrap gap-2">
              {filters.isFeatured && (
                <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs rounded-full">
                  <Star size={12} className="fill-current" />
                  <span>Featured</span>
                  <button onClick={() => onClearFilter('isFeatured')} className="hover:text-yellow-900 dark:hover:text-yellow-100">
                    <X size={12} />
                  </button>
                </div>
              )}
              {filters.segment && (
                <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-xs rounded-full">
                  <span>{segmentLabels[filters.segment]}</span>
                  <button onClick={() => onClearFilter('segment')} className="hover:text-blue-900 dark:hover:text-blue-100">
                    <X size={12} />
                  </button>
                </div>
              )}
              {filters.brand && (
                <div className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-xs rounded-full">
                  <span>{filters.brand}</span>
                  <button onClick={() => onClearFilter('brand')} className="hover:text-green-900 dark:hover:text-green-100">
                    <X size={12} />
                  </button>
                </div>
              )}
              {filters.location && (
                <div className="flex items-center gap-1 px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 text-xs rounded-full">
                  <span>{filters.location}</span>
                  <button onClick={() => onClearFilter('location')} className="hover:text-purple-900 dark:hover:text-purple-100">
                    <X size={12} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right side - Search and results */}
        <div className="flex items-center gap-3">
          {/* Compact search */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              value={filters.searchQuery || ''}
              onChange={(e) => onFilterChange('searchQuery', e.target.value)}
              className="w-48 sm:w-64 pl-9 pr-8 py-2 text-sm border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
            />
            {filters.searchQuery && (
              <button
                onClick={() => onClearFilter('searchQuery')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Results count */}
          <div className="text-sm text-muted-foreground whitespace-nowrap">
            <span className="font-medium">{filteredCount}</span> of {totalProjects}
          </div>

          {/* Clear all */}
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-sm text-destructive hover:text-destructive/80 font-medium whitespace-nowrap"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Expanded Filter Panel */}
      {isExpanded && (
        <div className="mt-2 bg-card border border-border rounded-lg p-4 space-y-4">
          {/* Featured Toggle */}
          <div>
            <button
              onClick={() => onFilterChange('isFeatured', filters.isFeatured ? undefined : true)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filters.isFeatured
                  ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 border border-yellow-300 dark:border-yellow-700'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Star size={16} className={filters.isFeatured ? 'fill-current' : ''} />
              Featured Projects Only
            </button>
          </div>

          {/* Filter Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Segments */}
            {filterOptions.segments.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Project Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.segments.map((segment) => (
                    <FilterButton
                      key={segment}
                      label={segmentLabels[segment]}
                      isActive={filters.segment === segment}
                      onClick={() => onFilterChange('segment', filters.segment === segment ? undefined : segment)}
                      onClear={filters.segment === segment ? () => onClearFilter('segment') : undefined}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Brands */}
            {filterOptions.brands.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Brand
                </label>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.brands.slice(0, 6).map((brand) => (
                    <FilterButton
                      key={brand}
                      label={brand}
                      isActive={filters.brand === brand}
                      onClick={() => onFilterChange('brand', filters.brand === brand ? undefined : brand)}
                      onClear={filters.brand === brand ? () => onClearFilter('brand') : undefined}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Locations */}
            {filterOptions.locations.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Location
                </label>
                <div className="flex flex-wrap gap-2">
                  {filterOptions.locations.slice(0, 6).map((location) => (
                    <FilterButton
                      key={location}
                      label={location}
                      isActive={filters.location === location}
                      onClick={() => onFilterChange('location', filters.location === location ? undefined : location)}
                      onClear={filters.location === location ? () => onClearFilter('location') : undefined}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectFilter;