import React, { useState, useEffect } from 'react';
import { Project } from '../../../../shared/types/projects';
import { ProjectSegment } from '../../../../shared/types/common';

interface PortfolioGalleryProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  className?: string;
}

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  style?: React.CSSProperties;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, style }) => {
  const [isHovered, setIsHovered] = useState(false);
  const primaryImage = project.images?.[0];

  return (
    <div
      className="relative bg-card rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] touch-manipulation border border-border"
      style={style}
      onClick={() => onClick(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Project Image */}
      <div className="relative overflow-hidden">
        {primaryImage ? (
          <img
            src={primaryImage.url}
            alt={primaryImage.alt}
            className="w-full h-48 sm:h-56 md:h-64 lg:h-48 xl:h-56 object-cover transition-transform duration-300 hover:scale-110"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="w-full h-48 sm:h-56 md:h-64 lg:h-48 xl:h-56 bg-muted flex items-center justify-center">
            <span className="text-muted-foreground text-xs sm:text-sm">No Image Available</span>
          </div>
        )}
        
        {/* Overlay with project info */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0 sm:opacity-0'
          } sm:opacity-0 sm:hover:opacity-100`}
        >
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white">
            <h3 className="text-sm sm:text-lg font-semibold mb-1 line-clamp-2">{project.title}</h3>
            {project.client && (
              <p className="text-xs sm:text-sm text-gray-200 mb-2">{project.client}</p>
            )}
            <div className="flex flex-wrap gap-1 sm:gap-2 mb-2">
              {project.segment && (
                <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
                  {project.segment}
                </span>
              )}
              {project.location && (
                <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
                  {project.location}
                </span>
              )}
            </div>
            {project.description && (
              <p className="text-xs sm:text-sm text-gray-200 line-clamp-2 hidden sm:block">{project.description}</p>
            )}
          </div>
        </div>

        {/* Featured badge */}
        {project.isFeatured && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Card content (always visible) */}
      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-semibold text-card-foreground mb-1 line-clamp-1">
          {project.title}
        </h3>
        {project.client && (
          <p className="text-xs sm:text-sm text-muted-foreground mb-2">{project.client}</p>
        )}
        <div className="flex flex-wrap gap-1 mb-2">
          {project.segment && (
            <span className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs">
              {project.segment}
            </span>
          )}
          {project.location && (
            <span className="px-2 py-1 bg-muted text-muted-foreground rounded-full text-xs">
              {project.location}
            </span>
          )}
        </div>
        {project.completedAt && (
          <p className="text-xs text-muted-foreground">
            <span className="hidden sm:inline">Completed: </span>
            {new Date(project.completedAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
};

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({
  projects,
  onProjectClick,
  className = '',
}) => {
  const [columns, setColumns] = useState(3);

  // Responsive column calculation
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setColumns(1); // Mobile: 1 column
      } else if (width < 1024) {
        setColumns(2); // Tablet: 2 columns
      } else {
        setColumns(3); // Desktop: 3 columns
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Distribute projects across columns for masonry layout
  const distributeProjects = (projects: Project[], columnCount: number) => {
    const columnArrays: Project[][] = Array.from({ length: columnCount }, () => []);
    
    projects.forEach((project, index) => {
      const columnIndex = index % columnCount;
      columnArrays[columnIndex].push(project);
    });
    
    return columnArrays;
  };

  const projectColumns = distributeProjects(projects, columns);

  if (projects.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-muted-foreground text-lg mb-2">No projects found</div>
        <p className="text-muted-foreground text-sm">
          Try adjusting your filters to see more projects.
        </p>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Desktop and Tablet Masonry Layout */}
      <div className="hidden sm:flex gap-4">
        {projectColumns.map((columnProjects, columnIndex) => (
          <div key={columnIndex} className="flex-1 space-y-4">
            {columnProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={onProjectClick}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Mobile Single Column Layout */}
      <div className="sm:hidden space-y-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={onProjectClick}
          />
        ))}
      </div>
    </div>
  );
};

export default PortfolioGallery;