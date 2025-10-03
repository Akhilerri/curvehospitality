import React, { useState } from 'react';
import { Product } from '@shared/types/products';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Eye, Package, Star } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onProductClick: (product: Product) => void;
  viewMode?: 'grid' | 'list';
}

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  viewMode?: 'grid' | 'list';
}

function ProductCard({ product, onClick, viewMode = 'grid' }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const primaryImage = product.images?.[0];
  
  if (viewMode === 'list') {
    return (
      <Card className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
        <CardContent className="p-4">
          <div className="flex gap-4">
            {/* Image */}
            <div className="flex-shrink-0 w-24 h-24">
              <AspectRatio ratio={1}>
                {primaryImage && !imageError ? (
                  <div className="relative w-full h-full">
                    {!imageLoaded && (
                      <Skeleton className="absolute inset-0 rounded-md" />
                    )}
                    <img
                      src={primaryImage.url}
                      alt={primaryImage.alt || product.name}
                      className={`w-full h-full object-cover rounded-md transition-opacity duration-200 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      onLoad={() => setImageLoaded(true)}
                      onError={() => setImageError(true)}
                    />
                  </div>
                ) : (
                  <div className="w-full h-full bg-muted rounded-md flex items-center justify-center">
                    <Package className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
              </AspectRatio>
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg truncate">{product.name}</h3>
                  {product.sku && (
                    <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                  )}
                  {product.description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                </div>
                
                <div className="flex flex-col items-end gap-2 ml-4">
                  {product.isFeatured && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      Featured
                    </Badge>
                  )}
                  {product.priceRange && (
                    <Badge variant="outline">{product.priceRange}</Badge>
                  )}
                </div>
              </div>
              
              {/* Materials */}
              {product.materials && product.materials.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {product.materials.slice(0, 3).map((material, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {material}
                    </Badge>
                  ))}
                  {product.materials.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{product.materials.length - 3} more
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0 px-4 pb-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={() => onClick(product)}
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
      <CardContent className="p-4">
        {/* Image */}
        <div className="mb-4">
          <AspectRatio ratio={4/3}>
            {primaryImage && !imageError ? (
              <div className="relative w-full h-full">
                {!imageLoaded && (
                  <Skeleton className="absolute inset-0 rounded-md" />
                )}
                <img
                  src={primaryImage.url}
                  alt={primaryImage.alt || product.name}
                  className={`w-full h-full object-cover rounded-md transition-opacity duration-200 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              </div>
            ) : (
              <div className="w-full h-full bg-muted rounded-md flex items-center justify-center">
                <Package className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
          </AspectRatio>
        </div>
        
        {/* Content */}
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-lg line-clamp-2 flex-1">{product.name}</h3>
            {product.isFeatured && (
              <Badge variant="secondary" className="flex items-center gap-1 ml-2">
                <Star className="h-3 w-3" />
                Featured
              </Badge>
            )}
          </div>
          
          {product.sku && (
            <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
          )}
          
          {product.description && (
            <p className="text-sm text-muted-foreground line-clamp-3">
              {product.description}
            </p>
          )}
          
          {product.priceRange && (
            <Badge variant="outline">{product.priceRange}</Badge>
          )}
          
          {/* Materials */}
          {product.materials && product.materials.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {product.materials.slice(0, 2).map((material, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {material}
                </Badge>
              ))}
              {product.materials.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{product.materials.length - 2}
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0 px-4 pb-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={() => onClick(product)}
        >
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}

function ProductGridSkeleton({ count = 12, viewMode = 'grid' }: { count?: number; viewMode?: 'grid' | 'list' }) {
  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <Skeleton className="w-24 h-24 rounded-md" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <Skeleton className="w-full aspect-[4/3] rounded-md mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function ProductGrid({
  products,
  loading = false,
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  onProductClick,
  viewMode = 'grid',
}: ProductGridProps) {
  if (loading) {
    return <ProductGridSkeleton viewMode={viewMode} />;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold mb-2">No products found</h3>
        <p className="text-muted-foreground">
          Try adjusting your filters or browse different categories.
        </p>
      </div>
    );
  }

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="space-y-6">
      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {startItem}-{endItem} of {totalItems} products
        </p>
      </div>

      {/* Product Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={onProductClick}
              viewMode={viewMode}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={onProductClick}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) onPageChange(currentPage - 1);
                  }}
                  className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              
              {/* Page Numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        onPageChange(pageNum);
                      }}
                      isActive={currentPage === pageNum}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              
              <PaginationItem>
                <PaginationNext 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) onPageChange(currentPage + 1);
                  }}
                  className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}