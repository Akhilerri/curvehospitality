import React from 'react';
import { ChevronRight, Grid, Package } from 'lucide-react';
import { ProductCategory } from '@shared/types/products';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface ProductCategoryNavigationProps {
  categories: ProductCategory[];
  selectedCategoryId?: string;
  breadcrumbs: { id: string; name: string }[];
  onCategorySelect: (categoryId: string | null) => void;
  onBreadcrumbClick: (categoryId: string | null) => void;
}

export function ProductCategoryNavigation({
  categories,
  selectedCategoryId,
  breadcrumbs,
  onCategorySelect,
  onBreadcrumbClick,
}: ProductCategoryNavigationProps) {
  const renderCategoryTree = (categories: ProductCategory[], level = 0) => {
    return categories.map((category) => (
      <div key={category.id} className={`${level > 0 ? 'ml-4' : ''}`}>
        <Button
          variant={selectedCategoryId === category.id ? 'default' : 'ghost'}
          className={`w-full justify-start text-left h-auto py-2 px-3 ${
            level > 0 ? 'text-sm' : ''
          }`}
          onClick={() => onCategorySelect(category.id)}
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              {level === 0 && <Package className="h-4 w-4" />}
              <span>{category.name}</span>
            </div>
            <div className="flex items-center gap-2">
              {category.productCount && (
                <Badge variant="secondary" className="text-xs">
                  {category.productCount}
                </Badge>
              )}
              {category.children && category.children.length > 0 && (
                <ChevronRight className="h-3 w-3" />
              )}
            </div>
          </div>
        </Button>
        
        {category.children && category.children.length > 0 && (
          <div className="mt-1">
            {renderCategoryTree(category.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb Navigation */}
      {breadcrumbs.length > 0 && (
        <div className="bg-muted/50 p-3 rounded-lg">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onBreadcrumbClick(null);
                  }}
                  className="flex items-center gap-1"
                >
                  <Grid className="h-3 w-3" />
                  All Products
                </BreadcrumbLink>
              </BreadcrumbItem>
              
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.id}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {index === breadcrumbs.length - 1 ? (
                      <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          onBreadcrumbClick(crumb.id);
                        }}
                      >
                        {crumb.name}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      )}

      {/* Category Navigation */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Product Categories</h3>
          {selectedCategoryId && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onCategorySelect(null)}
            >
              Clear Filter
            </Button>
          )}
        </div>
        
        <Separator />
        
        {/* All Products Option */}
        <Button
          variant={!selectedCategoryId ? 'default' : 'ghost'}
          className="w-full justify-start"
          onClick={() => onCategorySelect(null)}
        >
          <Grid className="h-4 w-4 mr-2" />
          All Products
        </Button>
        
        <Separator />
        
        {/* Category Tree */}
        <div className="space-y-1">
          {renderCategoryTree(categories)}
        </div>
      </div>
    </div>
  );
}