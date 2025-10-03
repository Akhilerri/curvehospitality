import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Star, Calendar, MapPin, Building, Quote } from 'lucide-react';
import { Project, ProjectImage } from '../../../../shared/types/projects';

interface CaseStudyModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

interface ImageCarouselProps {
  images: ProjectImage[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  currentIndex,
  onIndexChange,
}) => {
  const currentImage = images[currentIndex];

  const goToPrevious = () => {
    onIndexChange(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    onIndexChange(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  if (!currentImage) return null;

  return (
    <div className="relative">
      {/* Main Image */}
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={currentImage.url}
          alt={currentImage.alt}
          className="w-full h-full object-cover"
        />
        
        {/* Image Type Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            currentImage.type === 'before' ? 'bg-red-100 text-red-800' :
            currentImage.type === 'after' ? 'bg-green-100 text-green-800' :
            currentImage.type === 'process' ? 'bg-blue-100 text-blue-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {currentImage.type.charAt(0).toUpperCase() + currentImage.type.slice(1)}
          </span>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors touch-manipulation"
            >
              <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors touch-manipulation"
            >
              <ChevronRight size={16} className="sm:w-5 sm:h-5" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Image Description */}
      {currentImage.description && (
        <p className="mt-2 text-sm text-gray-600 text-center">
          {currentImage.room && <span className="font-medium">{currentImage.room}: </span>}
          {currentImage.description}
        </p>
      )}

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => onIndexChange(index)}
              className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-colors touch-manipulation ${
                index === currentIndex ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project?.id]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const hasImages = project.images && project.images.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg sm:rounded-xl shadow-2xl max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-start justify-between">
          <div className="flex-1 min-w-0 pr-4">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900 leading-tight">{project.title}</h2>
            {project.client && (
              <p className="text-sm sm:text-base text-gray-600 mt-1">{project.client}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {/* Project Meta Information */}
          <div className="flex flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6 text-xs sm:text-sm text-gray-600">
            {project.location && (
              <div className="flex items-center gap-1">
                <MapPin size={14} className="sm:w-4 sm:h-4" />
                <span>{project.location}</span>
              </div>
            )}
            {project.segment && (
              <div className="flex items-center gap-1">
                <Building size={14} className="sm:w-4 sm:h-4" />
                <span className="capitalize">{project.segment}</span>
              </div>
            )}
            {project.completedAt && (
              <div className="flex items-center gap-1">
                <Calendar size={14} className="sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Completed {new Date(project.completedAt).toLocaleDateString()}</span>
                <span className="sm:hidden">{new Date(project.completedAt).getFullYear()}</span>
              </div>
            )}
            {project.isFeatured && (
              <div className="flex items-center gap-1 text-yellow-600">
                <Star size={14} className="sm:w-4 sm:h-4 fill-current" />
                <span>Featured</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Left Column - Images */}
            <div>
              {hasImages ? (
                <ImageCarousel
                  images={project.images!}
                  currentIndex={currentImageIndex}
                  onIndexChange={setCurrentImageIndex}
                />
              ) : (
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">No images available</span>
                </div>
              )}
            </div>

            {/* Right Column - Project Details */}
            <div className="space-y-4 sm:space-y-6">
              {/* Description */}
              {project.description && (
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Project Overview</h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{project.description}</p>
                </div>
              )}

              {/* Challenges */}
              {project.challenges && project.challenges.length > 0 && (
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Challenges</h3>
                  <ul className="space-y-2">
                    {project.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-gray-700">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Solutions */}
              {project.solutions && project.solutions.length > 0 && (
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Solutions</h3>
                  <ul className="space-y-2">
                    {project.solutions.map((solution, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-gray-700">{solution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Results */}
              {project.results && project.results.length > 0 && (
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Results</h3>
                  <ul className="space-y-2">
                    {project.results.map((result, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-gray-700">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Testimonial */}
          {project.testimonial && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-4">
                <Quote size={24} className="text-gray-400 flex-shrink-0 mt-1" />
                <div>
                  <blockquote className="text-lg text-gray-900 mb-4 italic">
                    "{project.testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-semibold text-gray-900">{project.testimonial.clientName}</p>
                      {project.testimonial.clientTitle && (
                        <p className="text-sm text-gray-600">
                          {project.testimonial.clientTitle}
                          {project.testimonial.clientCompany && `, ${project.testimonial.clientCompany}`}
                        </p>
                      )}
                    </div>
                    {project.testimonial.rating && (
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={`${
                              i < project.testimonial!.rating!
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseStudyModal;