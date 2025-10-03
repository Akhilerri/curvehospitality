import React, { useState } from 'react';
import { Product } from '@shared/types/products';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Search, Filter, X, ChevronDown, ChevronUp } from 'lucide-react';

export interface ProductFilters {
  searchQuery: string;
  materials: string[];
  priceRange: [number, number];
  availability: string[];
  colors: string[];
  tags: string[];
  isFeatured?: boolean;
}

interface ProductSearchFilterProps {
  products: Product[];
  filters: ProductFilters;
  onFiltersChange: (filters: ProductFilters) => void;
  onClearFilters: () => void;
}

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterSection({ title, children, defaultOpen = false }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="w-full justify-between p-0 h-auto">
          <span className="font-medium">{title}</span>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-3 mt-3">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

export function ProductSearchFilter({
  products,
  filters,
  onFiltersChange,
  onClearFilters,
}: ProductSearchFilterProps) {
  // Extract unique values from products for filter options
  const filterOptions = React.useMemo(() => {
    const materials = new Set<string>();
    const colors = new Set<string>();
    const tags = new Set<string>();
    const availabilityStatuses = new Set<string>();
    let minPrice = Infinity;
    let maxPrice = 0;

    products.forEach(product => {
      // Materials
      product.materials?.forEach(material => materials.add(material));
      
      // Colors
      product.colors?.forEach(color => colors.add(color.name));
      
      // Tags
      product.tags?.forEach(tag => tags.add(tag));
      
      // Availability
      if (product.availability?.status) {
        availabilityStatuses.add(product.availability.status);
      }
      
      // Price range (extract numbers from price range strings)
      if (product.priceRange) {
        const priceNumbers = product.priceRange.match(/\d+/g);
        if (priceNumbers) {
          const prices = priceNumbers.map(Number);
          minPrice = Math.min(minPrice, Math.min(...prices));
          maxPrice = Math.max(maxPrice, Math.max(...prices));
        }
      }
    });

    return {
      materials: Array.from(materials).sort(),
      colors: Array.from(colors).sort(),
      tags: Array.from(tags).sort(),
      availabilityStatuses: Array.from(availabilityStatuses).sort(),
      priceRange: [minPrice === Infinity ? 0 : minPrice, maxPrice] as [number, number],
    };
  }, [products]);

  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, searchQuery: value });
  };

  const handleMaterialToggle = (material: string, checked: boolean) => {
    const newMaterials = checked
      ? [...filters.materials, material]
      : filters.materials.filter(m => m !== material);
    onFiltersChange({ ...filters, materials: newMaterials });
  };

  const handleColorToggle = (color: string, checked: boolean) => {
    const newColors = checked
      ? [...filters.colors, color]
      : filters.colors.filter(c => c !== color);
    onFiltersChange({ ...filters, colors: newColors });
  };

  const handleTagToggle = (tag: string, checked: boolean) => {
    const newTags = checked
      ? [...filters.tags, tag]
      : filters.tags.filter(t => t !== tag);
    onFiltersChange({ ...filters, tags: newTags });
  };

  const handleAvailabilityToggle = (status: string, checked: boolean) => {
    const newAvailability = checked
      ? [...filters.availability, status]
      : filters.availability.filter(a => a !== status);
    onFiltersChange({ ...filters, availability: newAvailability });
  };

  const handlePriceRangeChange = (value: number[]) => {
    onFiltersChange({ ...filters, priceRange: [value[0], value[1]] });
  };

  const handleFeaturedToggle = (checked: boolean) => {
    onFiltersChange({ ...filters, isFeatured: checked ? true : undefined });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.searchQuery) count++;
    if (filters.materials.length > 0) count++;
    if (filters.colors.length > 0) count++;
    if (filters.tags.length > 0) count++;
    if (filters.availability.length > 0) count++;
    if (filters.isFeatured) count++;
    if (filters.priceRange[0] > filterOptions.priceRange[0] || 
        filters.priceRange[1] < filterOptions.priceRange[1]) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter
            {activeFilterCount > 0 && (
              <Badge variant="secondary">{activeFilterCount}</Badge>
            )}
          </div>
          {activeFilterCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              className="flex items-center gap-1"
            >
              <X className="h-3 w-3" />
              Clear All
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search Input */}
        <div className="space-y-2">
          <Label htmlFor="search">Search Products</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by name, SKU, or description..."
              value={filters.searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Separator />

        {/* Featured Products */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={filters.isFeatured || false}
              onCheckedChange={handleFeaturedToggle}
            />
            <Label htmlFor="featured">Featured Products Only</Label>
          </div>
        </div>

        <Separator />

        {/* Price Range */}
        {filterOptions.priceRange[1] > 0 && (
          <>
            <FilterSection title="Price Range" defaultOpen>
              <div className="space-y-4">
                <div className="px-2">
                  <Slider
                    value={filters.priceRange}
                    onValueChange={handlePriceRangeChange}
                    max={filterOptions.priceRange[1]}
                    min={filterOptions.priceRange[0]}
                    step={50}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${filters.priceRange[0].toLocaleString()}</span>
                  <span>${filters.priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </FilterSection>
            <Separator />
          </>
        )}

        {/* Materials */}
        {filterOptions.materials.length > 0 && (
          <>
            <FilterSection title="Materials">
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {filterOptions.materials.map((material) => (
                  <div key={material} className="flex items-center space-x-2">
                    <Checkbox
                      id={`material-${material}`}
                      checked={filters.materials.includes(material)}
                      onCheckedChange={(checked) => 
                        handleMaterialToggle(material, checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor={`material-${material}`}
                      className="text-sm font-normal"
                    >
                      {material}
                    </Label>
                  </div>
                ))}
              </div>
            </FilterSection>
            <Separator />
          </>
        )}

        {/* Colors */}
        {filterOptions.colors.length > 0 && (
          <>
            <FilterSection title="Colors">
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {filterOptions.colors.map((color) => (
                  <div key={color} className="flex items-center space-x-2">
                    <Checkbox
                      id={`color-${color}`}
                      checked={filters.colors.includes(color)}
                      onCheckedChange={(checked) => 
                        handleColorToggle(color, checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor={`color-${color}`}
                      className="text-sm font-normal"
                    >
                      {color}
                    </Label>
                  </div>
                ))}
              </div>
            </FilterSection>
            <Separator />
          </>
        )}

        {/* Availability */}
        {filterOptions.availabilityStatuses.length > 0 && (
          <>
            <FilterSection title="Availability">
              <div className="space-y-2">
                {filterOptions.availabilityStatuses.map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox
                      id={`availability-${status}`}
                      checked={filters.availability.includes(status)}
                      onCheckedChange={(checked) => 
                        handleAvailabilityToggle(status, checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor={`availability-${status}`}
                      className="text-sm font-normal capitalize"
                    >
                      {status.replace('_', ' ')}
                    </Label>
                  </div>
                ))}
              </div>
            </FilterSection>
            <Separator />
          </>
        )}

        {/* Tags */}
        {filterOptions.tags.length > 0 && (
          <FilterSection title="Tags">
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {filterOptions.tags.map((tag) => (
                <div key={tag} className="flex items-center space-x-2">
                  <Checkbox
                    id={`tag-${tag}`}
                    checked={filters.tags.includes(tag)}
                    onCheckedChange={(checked) => 
                      handleTagToggle(tag, checked as boolean)
                    }
                  />
                  <Label 
                    htmlFor={`tag-${tag}`}
                    className="text-sm font-normal capitalize"
                  >
                    {tag}
                  </Label>
                </div>
              ))}
            </div>
          </FilterSection>
        )}
      </CardContent>
    </Card>
  );
}