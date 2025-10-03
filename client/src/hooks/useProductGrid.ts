import { useState, useMemo } from 'react';
import { Product } from '@shared/types/products';

interface UseProductGridProps {
  products: Product[];
  itemsPerPage?: number;
}

export function useProductGrid({ products, itemsPerPage = 12 }: UseProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(false);

  // Calculate pagination
  const paginationData = useMemo(() => {
    const totalItems = products.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = products.slice(startIndex, endIndex);

    return {
      products: paginatedProducts,
      totalPages,
      totalItems,
      currentPage,
      itemsPerPage,
    };
  }, [products, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of product grid
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
  };

  // Reset to first page when products change (e.g., when filtering)
  const resetPagination = () => {
    setCurrentPage(1);
  };

  return {
    ...paginationData,
    viewMode,
    loading,
    handlePageChange,
    handleViewModeChange,
    resetPagination,
    setLoading,
  };
}