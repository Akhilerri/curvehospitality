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

      <div className="page-container bg-background">
        {/* Hero Section */}
        <section className="bg-card border-b border-border">
          <div className="section-container page-hero">
            <div className="section-header">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Our Portfolio
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Discover our diverse range of interior design and manufacturing projects, 
                from luxury hotels to corporate headquarters, each tailored to our clients' unique vision.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="section-spacing">
          <div className="section-container">
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
              <h2 className="text-xl font-semibold text-foreground">
                All Projects
              </h2>
              <div className="text-sm text-muted-foreground">
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
              <div className="text-muted-foreground text-lg mb-2">No projects found</div>
              <p className="text-muted-foreground text-sm mb-4">
                Try adjusting your filters to see more projects.
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          )}
          </div>
        </section>

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