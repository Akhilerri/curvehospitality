import React from 'react';
import { Download, FileText, Lock, Eye, Calendar, Tag } from 'lucide-react';
import { Guide } from '../../../../shared/types/guides';
import { formatDate, formatDateShort } from '../../lib/utils';

interface GuideLibraryProps {
  guides: Guide[];
  loading?: boolean;
  emptyMessage?: string;
  onDownload: (guide: Guide) => void;
  onPreview?: (guide: Guide) => void;
}

const GuideLibrary: React.FC<GuideLibraryProps> = ({ 
  guides, 
  loading = false, 
  emptyMessage = "No guides found.",
  onDownload,
  onPreview
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <GuideCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (guides.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <div className="text-gray-500 text-lg">{emptyMessage}</div>
        <p className="text-gray-400 mt-2">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {guides.map((guide) => (
        <GuideCard 
          key={guide.id} 
          guide={guide} 
          onDownload={onDownload}
          onPreview={onPreview}
        />
      ))}
    </div>
  );
};

interface GuideCardProps {
  guide: Guide;
  onDownload: (guide: Guide) => void;
  onPreview?: (guide: Guide) => void;
}

const GuideCard: React.FC<GuideCardProps> = ({ guide, onDownload, onPreview }) => {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDownload(guide);
  };

  const handlePreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPreview) {
      onPreview(guide);
    }
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

  const getFileTypeColor = (fileType?: string) => {
    switch (fileType) {
      case 'pdf':
        return 'text-red-600 bg-red-100';
      case 'doc':
      case 'docx':
        return 'text-blue-600 bg-blue-100';
      case 'zip':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
      {/* Thumbnail */}
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
        
        {/* File Type Badge */}
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getFileTypeColor(guide.fileType)}`}>
            {guide.fileType?.toUpperCase() || 'FILE'}
          </span>
        </div>

        {/* Lead Capture Badge */}
        {guide.requiresLeadCapture && (
          <div className="absolute top-3 right-3">
            <div className="bg-orange-100 text-orange-700 p-1 rounded-full">
              <Lock className="w-3 h-3" />
            </div>
          </div>
        )}

        {/* Preview Button */}
        {onPreview && guide.previewImages && guide.previewImages.length > 0 && (
          <button
            onClick={handlePreview}
            className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
              <Eye className="w-5 h-5 text-gray-700" />
            </div>
          </button>
        )}
      </div>

      <div className="p-6">
        {/* Category */}
        {guide.category && (
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">{guide.category.icon}</span>
            <span className="text-sm font-medium text-teal-600">
              {guide.category.name}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {guide.title}
        </h3>

        {/* Description */}
        {guide.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {guide.description}
          </p>
        )}

        {/* Tags */}
        {guide.tags && guide.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {guide.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
            {guide.tags.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{guide.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* File Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-4">
            {guide.fileSize && (
              <span>{guide.fileSize}</span>
            )}
            {guide.downloadCount && (
              <div className="flex items-center gap-1">
                <Download className="w-3 h-3" />
                <span>{guide.downloadCount.toLocaleString()}</span>
              </div>
            )}
          </div>
          {guide.lastUpdated && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDateShort(guide.lastUpdated)}</span>
            </div>
          )}
        </div>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors duration-200"
        >
          <Download className="w-4 h-4" />
          <span>
            {guide.requiresLeadCapture ? 'Get Free Download' : 'Download Now'}
          </span>
        </button>

        {/* Lead Capture Notice */}
        {guide.requiresLeadCapture && (
          <p className="text-xs text-gray-500 text-center mt-2">
            Email required for download
          </p>
        )}
      </div>
    </div>
  );
};

const GuideCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Thumbnail skeleton */}
      <div className="aspect-[4/3] bg-gray-200"></div>
      
      <div className="p-6">
        {/* Category skeleton */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 bg-gray-200 rounded"></div>
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
        </div>

        {/* Title skeleton */}
        <div className="h-6 bg-gray-200 rounded mb-2"></div>
        <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>

        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>

        {/* Tags skeleton */}
        <div className="flex gap-1 mb-4">
          <div className="h-6 w-16 bg-gray-200 rounded"></div>
          <div className="h-6 w-20 bg-gray-200 rounded"></div>
          <div className="h-6 w-14 bg-gray-200 rounded"></div>
        </div>

        {/* File info skeleton */}
        <div className="flex justify-between mb-4">
          <div className="flex gap-4">
            <div className="h-4 w-12 bg-gray-200 rounded"></div>
            <div className="h-4 w-16 bg-gray-200 rounded"></div>
          </div>
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
        </div>

        {/* Button skeleton */}
        <div className="h-10 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
};

export default GuideLibrary;