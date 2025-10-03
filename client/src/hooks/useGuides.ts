import { useState, useMemo } from 'react';
import { Guide, GuideCategory, LeadCaptureForm } from '../../../shared/types/guides';
import { 
  mockGuides, 
  mockGuideCategories,
  getGuidesByCategory,
  getGuidesByFileType,
  searchGuides,
  getActiveGuides,
  getFeaturedGuides,
  getPopularGuides,
  getRecentGuides,
  getGuideById,
  getRelatedGuides
} from '../data/mockGuides';

export interface UseGuidesReturn {
  // Data
  guides: Guide[];
  categories: GuideCategory[];
  
  // Filtered data
  filteredGuides: Guide[];
  featuredGuides: Guide[];
  popularGuides: Guide[];
  recentGuides: Guide[];
  
  // Search and filter state
  searchQuery: string;
  selectedCategory: string | null;
  selectedFileType: string | null;
  showLeadCaptureOnly: boolean;
  
  // Actions
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  setSelectedFileType: (fileType: string | null) => void;
  setShowLeadCaptureOnly: (show: boolean) => void;
  clearFilters: () => void;
  
  // Utilities
  getGuideById: (id: string) => Guide | undefined;
  getRelatedGuides: (guide: Guide, limit?: number) => Guide[];
  getTotalResults: () => number;
  downloadGuide: (guideId: string, leadCapture?: LeadCaptureForm) => Promise<string>;
}

export const useGuides = (): UseGuidesReturn => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFileType, setSelectedFileType] = useState<string | null>(null);
  const [showLeadCaptureOnly, setShowLeadCaptureOnly] = useState(false);

  // Base data
  const guides = getActiveGuides();
  const categories = mockGuideCategories;

  // Featured, popular, and recent guides
  const featuredGuides = getFeaturedGuides(3);
  const popularGuides = getPopularGuides(5);
  const recentGuides = getRecentGuides(4);

  // Filtered guides based on current filters
  const filteredGuides = useMemo(() => {
    let result = guides;

    // Apply search query
    if (searchQuery.trim()) {
      result = searchGuides(searchQuery.trim());
    }

    // Apply category filter
    if (selectedCategory) {
      result = result.filter(guide => 
        guide.category?.id === selectedCategory
      );
    }

    // Apply file type filter
    if (selectedFileType) {
      result = result.filter(guide => 
        guide.fileType === selectedFileType
      );
    }

    // Apply lead capture filter
    if (showLeadCaptureOnly) {
      result = result.filter(guide => guide.requiresLeadCapture);
    }

    // Sort by download count (most popular first)
    return result.sort((a, b) => (b.downloadCount || 0) - (a.downloadCount || 0));
  }, [guides, searchQuery, selectedCategory, selectedFileType, showLeadCaptureOnly]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedFileType(null);
    setShowLeadCaptureOnly(false);
  };

  // Get total results count
  const getTotalResults = (): number => {
    return filteredGuides.length;
  };

  // Download guide function (mock implementation)
  const downloadGuide = async (guideId: string, leadCapture?: LeadCaptureForm): Promise<string> => {
    const guide = getGuideById(guideId);
    
    if (!guide) {
      throw new Error('Guide not found');
    }

    // If guide requires lead capture and none provided, throw error
    if (guide.requiresLeadCapture && !leadCapture) {
      throw new Error('Lead capture information required');
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real implementation, this would:
    // 1. Save lead capture data to database
    // 2. Increment download count
    // 3. Generate secure download URL
    // 4. Send confirmation email
    
    // Mock increment download count
    guide.downloadCount = (guide.downloadCount || 0) + 1;

    // Return download URL
    return guide.fileUrl;
  };

  return {
    // Data
    guides,
    categories,
    
    // Filtered data
    filteredGuides,
    featuredGuides,
    popularGuides,
    recentGuides,
    
    // Search and filter state
    searchQuery,
    selectedCategory,
    selectedFileType,
    showLeadCaptureOnly,
    
    // Actions
    setSearchQuery,
    setSelectedCategory,
    setSelectedFileType,
    setShowLeadCaptureOnly,
    clearFilters,
    
    // Utilities
    getGuideById,
    getRelatedGuides,
    getTotalResults,
    downloadGuide
  };
};

// Hook for individual guide with related guides
export const useGuide = (id: string) => {
  const guide = getGuideById(id);
  const relatedGuides = guide ? getRelatedGuides(guide) : [];
  
  return {
    guide,
    relatedGuides,
    isLoading: false,
    error: guide ? null : 'Guide not found'
  };
};

// Hook for guide search with debouncing
export const useGuideSearch = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  
  // Simple debounce implementation
  useState(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    
    return () => clearTimeout(timer);
  });

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    return searchGuides(debouncedQuery.trim());
  }, [debouncedQuery]);

  return {
    query,
    setQuery,
    results,
    isSearching: query !== debouncedQuery,
    hasResults: results.length > 0
  };
};

// Hook for lead capture form management
export const useLeadCapture = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openLeadCapture = (guide: Guide) => {
    setSelectedGuide(guide);
    setIsOpen(true);
    setError(null);
  };

  const closeLeadCapture = () => {
    setIsOpen(false);
    setSelectedGuide(null);
    setError(null);
    setIsSubmitting(false);
  };

  const submitLeadCapture = async (formData: LeadCaptureForm): Promise<string> => {
    if (!selectedGuide) {
      throw new Error('No guide selected');
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const { downloadGuide } = useGuides();
      const downloadUrl = await downloadGuide(selectedGuide.id, formData);
      
      // Close modal on success
      closeLeadCapture();
      
      return downloadUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Download failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isOpen,
    selectedGuide,
    isSubmitting,
    error,
    openLeadCapture,
    closeLeadCapture,
    submitLeadCapture
  };
};