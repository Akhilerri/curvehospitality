import { useState, useMemo } from 'react';
import { ProductCategory } from '@shared/types/products';

interface UseCategoryNavigationProps {
  categories: ProductCategory[];
}

export function useProductCategories({ categories }: UseCategoryNavigationProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // Build a flat map of all categories for easy lookup
  const categoryMap = useMemo(() => {
    const map = new Map<string, ProductCategory>();
    
    const addToMap = (cats: ProductCategory[]) => {
      cats.forEach(cat => {
        map.set(cat.id, cat);
        if (cat.children) {
          addToMap(cat.children);
        }
      });
    };
    
    addToMap(categories);
    return map;
  }, [categories]);

  // Build breadcrumb trail for selected category
  const breadcrumbs = useMemo(() => {
    if (!selectedCategoryId) return [];
    
    const trail: { id: string; name: string }[] = [];
    let currentCategory = categoryMap.get(selectedCategoryId);
    
    // Build trail from selected category up to root
    while (currentCategory) {
      trail.unshift({ id: currentCategory.id, name: currentCategory.name });
      
      if (currentCategory.parentId) {
        currentCategory = categoryMap.get(currentCategory.parentId);
      } else {
        break;
      }
    }
    
    return trail;
  }, [selectedCategoryId, categoryMap]);

  // Get the currently selected category object
  const selectedCategory = useMemo(() => {
    return selectedCategoryId ? categoryMap.get(selectedCategoryId) : null;
  }, [selectedCategoryId, categoryMap]);

  // Build hierarchical category tree with product counts
  const categoryTree = useMemo(() => {
    const buildTree = (parentId: string | null = null): ProductCategory[] => {
      return categories
        .filter(cat => cat.parentId === parentId)
        .sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))
        .map(cat => ({
          ...cat,
          children: buildTree(cat.id),
        }));
    };
    
    return buildTree();
  }, [categories]);

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategoryId(categoryId);
  };

  const handleBreadcrumbClick = (categoryId: string | null) => {
    setSelectedCategoryId(categoryId);
  };

  // Get all subcategory IDs for filtering (includes selected category and all children)
  const getFilterCategoryIds = (categoryId: string | null): string[] => {
    if (!categoryId) return [];
    
    const collectIds = (catId: string): string[] => {
      const category = categoryMap.get(catId);
      if (!category) return [catId];
      
      const ids = [catId];
      if (category.children) {
        category.children.forEach((child: ProductCategory) => {
          ids.push(...collectIds(child.id));
        });
      }
      
      return ids;
    };
    
    return collectIds(categoryId);
  };

  return {
    selectedCategoryId,
    selectedCategory,
    breadcrumbs,
    categoryTree,
    categoryMap,
    handleCategorySelect,
    handleBreadcrumbClick,
    getFilterCategoryIds,
  };
}

// Hook for managing the eight main product categories as defined in requirements
export function useMainProductCategories() {
  // The eight main product categories from requirements 3.1
  const mainCategories: Omit<ProductCategory, 'id' | 'companyId' | 'createdAt' | 'updatedAt'>[] = [
    {
      name: 'Case Goods',
      description: 'Furniture pieces including desks, cabinets, and storage solutions',
      orderIndex: 1,
      isActive: true,
    },
    {
      name: 'Seating',
      description: 'Chairs, sofas, benches, and other seating furniture',
      orderIndex: 2,
      isActive: true,
    },
    {
      name: 'Lighting',
      description: 'Ceiling fixtures, lamps, and decorative lighting solutions',
      orderIndex: 3,
      isActive: true,
    },
    {
      name: 'Artwork & Mirrors',
      description: 'Wall art, decorative mirrors, and artistic installations',
      orderIndex: 4,
      isActive: true,
    },
    {
      name: 'Soft Goods',
      description: 'Textiles, curtains, rugs, and fabric-based decorative items',
      orderIndex: 5,
      isActive: true,
    },
    {
      name: 'Stone Countertops',
      description: 'Natural and engineered stone surfaces for kitchens and bathrooms',
      orderIndex: 6,
      isActive: true,
    },
    {
      name: 'Bathroom Fixtures & Vanities',
      description: 'Sinks, faucets, vanities, and bathroom accessories',
      orderIndex: 7,
      isActive: true,
    },
    {
      name: 'Flooring',
      description: 'Hardwood, tile, carpet, and specialty flooring materials',
      orderIndex: 8,
      isActive: true,
    },
  ];

  return mainCategories;
}