import React, { useEffect } from 'react';
import { PortfolioGallery } from '../components/sections/PortfolioGallery';
import { ProjectFilter } from '../components/sections/ProjectFilter';
import { CaseStudyModal } from '../components/sections/CaseStudyModal';
import { usePortfolio } from '../hooks/usePortfolio';
import { mockProjects } from '../data/mockProjects';
import { Project } from '../../../shared/types/projects';

export const Portfolio: React.FC = () => {
  const {
    projects,
    featuredProjects,
    allProjects,
    filters,
    filterOptions,
    hasActiveFilters,
    activeFilterCount,
    updateFilter,
    clearFilters,
    clearFilter,
    selectedProject,
    setSelectedProject,
  } = usePortfolio(mockProjects);

  // Set page title
  useEffect(() => {
    document.title = 'Portfolio - Our Projects | CurveRedo';
  }, []);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Our Portfolio
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover our diverse range of interior design and manufacturing projects, 
                from luxury hotels to corporate headquarters, each tailored to our clients' unique vision.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Filter Section - Moved to top */}
          <div className="mb-8">
            <ProjectFilter
              filters={filters}
              filterOptions={filterOptions}
              onFilterChange={updateFilter}
              onClearFilters={clearFilters}
              onClearFilter={clearFilter}
              hasActiveFilters={hasActiveFilters}
              activeFilterCount={activeFilterCount}
              totalProjects={allProjects.length}
              filteredCount={projects.length}
            />
          </div>

          {/* Results Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                All Projects
              </h2>
              <div className="text-sm text-gray-600">
                {projects.length} {projects.length === 1 ? 'project' : 'projects'}
              </div>
            </div>
          </div>

          {/* Projects Gallery */}
          <PortfolioGallery
            projects={projects}
            onProjectClick={handleProjectClick}
          />

          {/* Empty State */}
          {projects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">No projects found</div>
              <p className="text-gray-500 text-sm mb-4">
                Try adjusting your filters to see more projects.
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Case Study Modal */}
        <CaseStudyModal
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={handleCloseModal}
        />
      </div>
    </>
  );
};

export default Portfolio;