import React, { useState } from 'react';
import { useGuides, useLeadCapture } from '../../hooks/useGuides';
import GuideSearchAndFilter from './GuideSearchAndFilter';
import GuideLibrary from './GuideLibrary';
import LeadCaptureModal from './LeadCaptureModal';
import { Guide } from '../../../../shared/types/guides';

interface GuidesSectionProps {
  title?: string;
  subtitle?: string;
  showFeatured?: boolean;
  featuredTitle?: string;
  guidesPerPage?: number;
}

const GuidesSection: React.FC<GuidesSectionProps> = ({
  title = "Resource Library",
  subtitle = "Download our comprehensive guides, templates, and resources to enhance your design projects.",
  showFeatured = true,
  featuredTitle = "Popular Downloads",
  guidesPerPage = 9
}) => {
  const {
    filteredGuides,
    popularGuides,
    categories,
    searchQuery,
    selectedCategory,
    selectedFileType,
    showLeadCaptureOnly,
    setSearchQuery,
    setSelectedCategory,
    setSelectedFileType,
    setShowLeadCaptureOnly,
    clearFilters,
    getTotalResults,
    downloadGuide
  } = useGuides();

  const {
    isOpen,
    selectedGuide,
    isSubmitting,
    error,
    openLeadCapture,
    closeLeadCapture,
    submitLeadCapture
  } = useLeadCapture();

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Pagination
  const totalPages = Math.ceil(filteredGuides.length / guidesPerPage);
  const startIndex = (currentPage - 1) * guidesPerPage;
  const endIndex = startIndex + guidesPerPage;
  const currentGuides = filteredGuides.slice(startIndex, endIndex);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedFileType, showLeadCaptureOnly]);

  const handleDownload = async (guide: Guide) => {
    if (guide.requiresLeadCapture) {
      openLeadCapture(guide);
    } else {
      try {
        setLoading(true);
        const downloadUrl = await downloadGuide(guide.id);
        
        // Start download
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = guide.title;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Download failed:', error);
        // You could show a toast notification here
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePreview = (guide: Guide) => {
    // In a real implementation, this would open a preview modal
    console.log('Preview guide:', guide.title);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of guides section
    document.getElementById('guides-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="guides-section" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Featured Guides */}
        {showFeatured && popularGuides.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">{featuredTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularGuides.map((guide) => (
                <FeaturedGuideCard 
                  key={guide.id} 
                  guide={guide} 
                  onDownload={handleDownload}
                />
              ))}
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <GuideSearchAndFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categories={categories}
          selectedCategory={selectedCategory}
          selectedFileType={selectedFileType}
          showLeadCaptureOnly={showLeadCaptureOnly}
          onCategoryChange={setSelectedCategory}
          onFileTypeChange={setSelectedFileType}
          onLeadCaptureToggle={setShowLeadCaptureOnly}
          onClearFilters={clearFilters}
          totalResults={getTotalResults()}
        />

        {/* Guide Library */}
        <div className="mt-8">
          <GuideLibrary 
            guides={currentGuides} 
            loading={loading}
            emptyMessage="No guides match your current filters."
            onDownload={handleDownload}
            onPreview={handlePreview}
          />
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        {/* Lead Capture Modal */}
        <LeadCaptureModal
          isOpen={isOpen}
          guide={selectedGuide}
          onClose={closeLeadCapture}
          onSubmit={submitLeadCapture}
          isSubmitting={isSubmitting}
          error={error}
        />
      </div>
    </section>
  );
};

interface FeaturedGuideCardProps {
  guide: Guide;
  onDownload: (guide: Guide) => void;
}

const FeaturedGuideCard: React.FC<FeaturedGuideCardProps> = ({ guide, onDownload }) => {
  const handleClick = () => {
    onDownload(guide);
  };

  const getFileTypeIcon = (fileType?: string) => {
    switch (fileType) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'zip':
        return '📦';
      default:
        return '📁';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
      <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
        {guide.thumbnail ? (
          <img
            src={guide.thumbnail.url}
            alt={guide.thumbnail.alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-50 to-teal-100">
            <div className="text-6xl">{getFileTypeIcon(guide.fileType)}</div>
          </div>
        )}
        
        <div className="absolute top-3 left-3">
          <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-teal-600 rounded-full">
            Featured
          </span>
        </div>
      </div>

      <div className="p-6">
        {guide.category && (
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{guide.category.icon}</span>
            <span className="text-sm font-medium text-teal-600">
              {guide.category.name}
            </span>
          </div>
        )}

        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors duration-200">
          {guide.title}
        </h3>

        {guide.description && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {guide.description}
          </p>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-3">
            {guide.fileSize && <span>{guide.fileSize}</span>}
            {guide.downloadCount && <span>{guide.downloadCount.toLocaleString()} downloads</span>}
          </div>
        </div>

        <button
          onClick={handleClick}
          className="w-full px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors duration-200"
        >
          {guide.requiresLeadCapture ? 'Get Free Download' : 'Download Now'}
        </button>
      </div>
    </div>
  );
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      {/* Page Numbers */}
      {visiblePages.map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className="px-3 py-2 text-sm font-medium text-gray-500">...</span>
          ) : (
            <button
              onClick={() => onPageChange(page as number)}
              className={`px-3 py-2 text-sm font-medium rounded-md ${
                currentPage === page
                  ? 'text-white bg-teal-600 border border-teal-600'
                  : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default GuidesSection;