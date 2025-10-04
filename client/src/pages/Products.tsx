import { BusinessLayout } from "@/components/layout/BusinessLayout";
import { ProductCategoryNavigation } from "@/components/sections/ProductCategoryNavigation";
import { ProductGrid } from "@/components/sections/ProductGrid";
import { ProductDetailModal } from "@/components/sections/ProductDetailModal";
import { ProductSearchFilter } from "@/components/sections/ProductSearchFilter";
import { useProductCategories } from "@/hooks/useProductCategories";
import { useProductGrid } from "@/hooks/useProductGrid";
import { useProductSearch } from "@/hooks/useProductSearch";
import { usePageSEO, useProductSEO } from "@/hooks/useSEO";
import { mockProductCategories } from "@/data/mockProductCategories";
import { mockProducts } from "@/data/mockProducts";
import { Product } from "@shared/types/products";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Grid, List, LayoutGrid, Search } from "lucide-react";
import { useMemo, useEffect, useState } from "react";

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const category = mockProductCategories
    .flatMap(c => (c.children ? [c, ...c.children] : [c]))
    .find(c => c.id === selectedProduct?.categoryId);

  // SEO for products page
  usePageSEO(
    selectedProduct ? selectedProduct.name : 'Products',
    selectedProduct 
      ? selectedProduct.description || `High-quality ${selectedProduct.name} for hospitality spaces. Custom manufacturing and design solutions.`
      : 'Explore our extensive catalog of hospitality furniture, fixtures, and equipment including seating, lighting, case goods, and custom solutions.',
    {
      keywords: selectedProduct 
        ? [selectedProduct.name, category?.name, 'hospitality furniture', 'custom furniture'].filter(Boolean) as string[]
        : ['hospitality products', 'hotel furniture', 'restaurant furniture', 'custom furniture', 'FF&E catalog'],
      breadcrumbs: selectedProduct 
        ? [
            { name: 'Home', url: '/' },
            { name: 'Products', url: '/products' },
            { name: category?.name || 'Category', url: `/products?category=${selectedProduct.categoryId}` },
            { name: selectedProduct.name, url: `/products/${selectedProduct.id}` }
          ]
        : [
            { name: 'Home', url: '/' },
            { name: 'Products', url: '/products' }
          ]
    }
  );

  // Use product-specific SEO when a product is selected
  useEffect(() => {
    if (selectedProduct && isModalOpen) {
      // This will be handled by the modal component
    }
  }, [selectedProduct, isModalOpen]);

  const {
    selectedCategoryId,
    selectedCategory,
    breadcrumbs,
    categoryTree,
    handleCategorySelect,
    handleBreadcrumbClick,
    getFilterCategoryIds,
  } = useProductCategories({ categories: mockProductCategories });

  // Filter products based on selected category
  const categoryFilteredProducts = useMemo(() => {
    if (!selectedCategoryId) return mockProducts;
    
    const categoryIds = getFilterCategoryIds(selectedCategoryId);
    return mockProducts.filter(product => 
      categoryIds.includes(product.categoryId)
    );
  }, [selectedCategoryId, getFilterCategoryIds]);

  // Apply search and advanced filters
  const {
    filters,
    filteredProducts,
    searchSummary,
    handleFiltersChange,
    handleClearFilters,
  } = useProductSearch({ products: categoryFilteredProducts });

  const {
    products: paginatedProducts,
    totalPages,
    totalItems,
    currentPage,
    itemsPerPage,
    viewMode,
    loading,
    handlePageChange,
    handleViewModeChange,
    resetPagination,
  } = useProductGrid({ products: filteredProducts });

  // Reset pagination when category or filters change
  useEffect(() => {
    resetPagination();
  }, [selectedCategoryId, filteredProducts.length, resetPagination]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = (open: boolean) => {
    setIsModalOpen(open);
    if (!open) {
      setSelectedProduct(null);
    }
  };

  return (
    <BusinessLayout>
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Our Products</h1>
          <p className="text-xl text-muted-foreground">
            Browse our extensive catalog of interior design and manufacturing products
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Category Navigation & Search/Filter */}
          <div className="lg:col-span-1 space-y-6">
            {/* Category Navigation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProductCategoryNavigation
                  categories={categoryTree}
                  selectedCategoryId={selectedCategoryId || undefined}
                  breadcrumbs={breadcrumbs}
                  onCategorySelect={handleCategorySelect}
                  onBreadcrumbClick={handleBreadcrumbClick}
                />
              </CardContent>
            </Card>

            {/* Search and Filter */}
            <ProductSearchFilter
              products={categoryFilteredProducts}
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <LayoutGrid className="h-5 w-5" />
                    {selectedCategory ? selectedCategory.name : 'All Products'}
                    {searchSummary.hasActiveFilters && (
                      <Badge variant="outline" className="ml-2">
                        <Search className="h-3 w-3 mr-1" />
                        Filtered
                      </Badge>
                    )}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    {totalItems > 0 && (
                      <Badge variant="secondary">
                        {searchSummary.isFiltered 
                          ? `${searchSummary.filteredCount} of ${searchSummary.totalProducts}` 
                          : `${totalItems} products`
                        }
                      </Badge>
                    )}
                    {/* View Mode Toggle */}
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => handleViewModeChange('grid')}
                        className="rounded-r-none"
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => handleViewModeChange('list')}
                        className="rounded-l-none"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                {selectedCategory?.description && (
                  <p className="text-muted-foreground mt-2">
                    {selectedCategory.description}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Category Overview */}
                  {!selectedCategoryId && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {categoryTree.map((category) => (
                          <Card
                            key={category.id}
                            className="cursor-pointer hover:shadow-md transition-shadow"
                            onClick={() => handleCategorySelect(category.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold">{category.name}</h3>
                                <Badge variant="outline">
                                  {category.productCount} items
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {category.description}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      
                      {/* All Products Grid */}
                      <div>
                        <h3 className="text-lg font-semibold mb-4">All Products</h3>
                        <ProductGrid
                          products={paginatedProducts}
                          loading={loading}
                          currentPage={currentPage}
                          totalPages={totalPages}
                          itemsPerPage={itemsPerPage}
                          totalItems={totalItems}
                          onPageChange={handlePageChange}
                          onProductClick={handleProductClick}
                          viewMode={viewMode}
                        />
                      </div>
                    </>
                  )}

                  {/* Selected Category Products */}
                  {selectedCategoryId && (
                    <ProductGrid
                      products={paginatedProducts}
                      loading={loading}
                      currentPage={currentPage}
                      totalPages={totalPages}
                      itemsPerPage={itemsPerPage}
                      totalItems={totalItems}
                      onPageChange={handlePageChange}
                      onProductClick={handleProductClick}
                      viewMode={viewMode}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        open={isModalOpen}
        onOpenChange={handleModalClose}
      />
    </BusinessLayout>
  );
}