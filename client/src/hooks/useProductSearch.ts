import React, { useState, useMemo } from 'react';
import { Product } from '@shared/types/products';
import { ProductFilters } from '@/components/sections/ProductSearchFilter';

interface UseProductSearchProps {
  products: Product[];
}

export function useProductSearch({ products }: UseProductSearchProps) {
  const [filters, setFilters] = useState<ProductFilters>({
    searchQuery: '',
    materials: [],
    priceRange: [0, 10000], // Default range, will be adjusted based on actual products
    availability: [],
    colors: [],
    tags: [],
    isFeatured: undefined,
  });

  // Initialize price range based on actual product data
  const initialPriceRange = useMemo(() => {
    let minPrice = Infinity;
    let maxPrice = 0;

    products.forEach(product => {
      if (product.priceRange) {
        const priceNumbers = product.priceRange.match(/\d+/g);
        if (priceNumbers) {
          const prices = priceNumbers.map(Number);
          minPrice = Math.min(minPrice, Math.min(...prices));
          maxPrice = Math.max(maxPrice, Math.max(...prices));
        }
      }
    });

    return [minPrice === Infinity ? 0 : minPrice, maxPrice] as [number, number];
  }, [products]);

  // Update filters with correct price range on first load
  React.useEffect(() => {
    if (initialPriceRange[1] > 0 && filters.priceRange[1] === 10000) {
      setFilters(prev => ({
        ...prev,
        priceRange: initialPriceRange,
      }));
    }
  }, [initialPriceRange, filters.priceRange]);

  // Filter products based on current filters
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const searchableText = [
          product.name,
          product.description,
          product.sku,
          ...(product.materials || []),
          ...(product.tags || []),
        ].join(' ').toLowerCase();
        
        if (!searchableText.includes(query)) {
          return false;
        }
      }

      // Featured filter
      if (filters.isFeatured && !product.isFeatured) {
        return false;
      }

      // Materials filter
      if (filters.materials.length > 0) {
        const productMaterials = product.materials || [];
        const hasMatchingMaterial = filters.materials.some(material =>
          productMaterials.includes(material)
        );
        if (!hasMatchingMaterial) {
          return false;
        }
      }

      // Colors filter
      if (filters.colors.length > 0) {
        const productColors = (product.colors || []).map(c => c.name);
        const hasMatchingColor = filters.colors.some(color =>
          productColors.includes(color)
        );
        if (!hasMatchingColor) {
          return false;
        }
      }

      // Tags filter
      if (filters.tags.length > 0) {
        const productTags = product.tags || [];
        const hasMatchingTag = filters.tags.some(tag =>
          productTags.includes(tag)
        );
        if (!hasMatchingTag) {
          return false;
        }
      }

      // Availability filter
      if (filters.availability.length > 0) {
        const productStatus = product.availability?.status;
        if (!productStatus || !filters.availability.includes(productStatus)) {
          return false;
        }
      }

      // Price range filter
      if (product.priceRange) {
        const priceNumbers = product.priceRange.match(/\d+/g);
        if (priceNumbers) {
          const prices = priceNumbers.map(Number);
          const minProductPrice = Math.min(...prices);
          const maxProductPrice = Math.max(...prices);
          
          // Check if product price range overlaps with filter range
          const overlaps = maxProductPrice >= filters.priceRange[0] && 
                          minProductPrice <= filters.priceRange[1];
          
          if (!overlaps) {
            return false;
          }
        }
      }

      return true;
    });
  }, [products, filters]);

  const handleFiltersChange = (newFilters: ProductFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      searchQuery: '',
      materials: [],
      priceRange: initialPriceRange,
      availability: [],
      colors: [],
      tags: [],
      isFeatured: undefined,
    });
  };

  // Get search results summary
  const searchSummary = useMemo(() => {
    const totalProducts = products.length;
    const filteredCount = filteredProducts.length;
    const hasActiveFilters = filters.searchQuery || 
                           filters.materials.length > 0 ||
                           filters.colors.length > 0 ||
                           filters.tags.length > 0 ||
                           filters.availability.length > 0 ||
                           filters.isFeatured ||
                           filters.priceRange[0] > initialPriceRange[0] ||
                           filters.priceRange[1] < initialPriceRange[1];

    return {
      totalProducts,
      filteredCount,
      hasActiveFilters,
      isFiltered: hasActiveFilters && filteredCount < totalProducts,
    };
  }, [products.length, filteredProducts.length, filters, initialPriceRange]);

  return {
    filters,
    filteredProducts,
    searchSummary,
    handleFiltersChange,
    handleClearFilters,
  };
}