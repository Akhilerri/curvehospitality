import React, { useState } from 'react';
import { Product } from '@shared/types/products';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  ZoomIn,
  ZoomOut,
  Star,
  Package,
  Ruler,
  Palette,
  Tag,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Mail,
  Phone,
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ImageCarouselProps {
  images: Product['images'];
  productName: string;
}

function ImageCarousel({ images, productName }: ImageCarouselProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
        <Package className="h-16 w-16 text-muted-foreground" />
      </div>
    );
  }

  const selectedImage = images[selectedImageIndex];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative">
        <AspectRatio ratio={4/3}>
          <div className="relative w-full h-full group">
            <img
              src={selectedImage.url}
              alt={selectedImage.alt || productName}
              className={`w-full h-full object-cover rounded-lg transition-transform duration-200 ${
                isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
              }`}
              onClick={() => setIsZoomed(!isZoomed)}
            />
            
            {/* Zoom Controls */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZoomed(!isZoomed);
                }}
              >
                {isZoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </AspectRatio>
      </div>

      {/* Thumbnail Carousel */}
      {images.length > 1 && (
        <Carousel className="w-full">
          <CarouselContent className="-ml-2">
            {images.map((image, index) => (
              <CarouselItem key={index} className="pl-2 basis-1/4">
                <div
                  className={`cursor-pointer rounded-md overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index
                      ? 'border-primary'
                      : 'border-transparent hover:border-muted-foreground'
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <AspectRatio ratio={1}>
                    <img
                      src={image.url}
                      alt={image.alt || `${productName} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </div>
  );
}

function AvailabilityStatus({ availability }: { availability?: Product['availability'] }) {
  if (!availability) return null;

  const getStatusIcon = () => {
    switch (availability.status) {
      case 'in_stock':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'out_of_stock':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pre_order':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'discontinued':
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (availability.status) {
      case 'in_stock':
        return 'In Stock';
      case 'out_of_stock':
        return 'Out of Stock';
      case 'pre_order':
        return 'Pre-Order';
      case 'discontinued':
        return 'Discontinued';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = () => {
    switch (availability.status) {
      case 'in_stock':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'out_of_stock':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'pre_order':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'discontinued':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-md border ${getStatusColor()}`}>
      {getStatusIcon()}
      <span className="font-medium">{getStatusText()}</span>
      {availability.quantity && availability.quantity > 0 && (
        <span className="text-sm">({availability.quantity} available)</span>
      )}
    </div>
  );
}

export function ProductDetailModal({ product, open, onOpenChange }: ProductDetailModalProps) {
  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <Package className="h-5 w-5" />
            Product Details
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Column - Images */}
          <div>
            <ImageCarousel images={product.images} productName={product.name} />
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <h1 className="text-xl sm:text-2xl font-bold leading-tight">{product.name}</h1>
                {product.isFeatured && (
                  <Badge variant="secondary" className="flex items-center gap-1 self-start">
                    <Star className="h-3 w-3" />
                    Featured
                  </Badge>
                )}
              </div>
              
              {product.sku && (
                <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
              )}
              
              {product.priceRange && (
                <div className="text-xl font-semibold text-primary">
                  {product.priceRange}
                </div>
              )}
            </div>

            {/* Availability */}
            {product.availability && (
              <AvailabilityStatus availability={product.availability} />
            )}

            {/* Description */}
            {product.description && (
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Quick Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Materials */}
              {product.materials && product.materials.length > 0 && (
                <Card>
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Tag className="h-4 w-4" />
                      <span className="font-medium text-sm sm:text-base">Materials</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {product.materials.map((material, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {material}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <Card>
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Palette className="h-4 w-4" />
                      <span className="font-medium text-sm sm:text-base">Colors</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color, index) => (
                        <div key={index} className="flex items-center gap-1">
                          {color.hex && (
                            <div
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: color.hex }}
                            />
                          )}
                          <span className="text-xs">{color.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Detailed Information Tabs */}
            <Tabs defaultValue="specifications" className="w-full">
              <TabsList className="grid w-full grid-cols-3 h-auto">
                <TabsTrigger value="specifications" className="text-xs sm:text-sm px-2 py-2">
                  <span className="hidden sm:inline">Specifications</span>
                  <span className="sm:hidden">Specs</span>
                </TabsTrigger>
                <TabsTrigger value="dimensions" className="text-xs sm:text-sm px-2 py-2">
                  <span className="hidden sm:inline">Dimensions</span>
                  <span className="sm:hidden">Size</span>
                </TabsTrigger>
                <TabsTrigger value="details" className="text-xs sm:text-sm px-2 py-2">Details</TabsTrigger>
              </TabsList>
              
              <TabsContent value="specifications" className="space-y-4">
                {product.specifications && Object.keys(product.specifications).length > 0 ? (
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center">
                            <span className="font-medium">{key}:</span>
                            <span className="text-muted-foreground">{value}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <p className="text-muted-foreground text-center py-4">
                    No specifications available
                  </p>
                )}
              </TabsContent>
              
              <TabsContent value="dimensions" className="space-y-4">
                {product.dimensions ? (
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Ruler className="h-4 w-4" />
                        <span className="font-medium">Dimensions</span>
                      </div>
                      <div className="space-y-2">
                        {product.dimensions.length && (
                          <div className="flex justify-between">
                            <span>Length:</span>
                            <span>{product.dimensions.length} {product.dimensions.unit}</span>
                          </div>
                        )}
                        {product.dimensions.width && (
                          <div className="flex justify-between">
                            <span>Width:</span>
                            <span>{product.dimensions.width} {product.dimensions.unit}</span>
                          </div>
                        )}
                        {product.dimensions.height && (
                          <div className="flex justify-between">
                            <span>Height:</span>
                            <span>{product.dimensions.height} {product.dimensions.unit}</span>
                          </div>
                        )}
                        {product.weight && (
                          <div className="flex justify-between">
                            <span>Weight:</span>
                            <span>{product.weight} lbs</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <p className="text-muted-foreground text-center py-4">
                    No dimension information available
                  </p>
                )}
              </TabsContent>
              
              <TabsContent value="details" className="space-y-4">
                <div className="space-y-4">
                  {/* Tags */}
                  {product.tags && product.tags.length > 0 && (
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">Tags</h4>
                        <div className="flex flex-wrap gap-1">
                          {product.tags.map((tag, index) => (
                            <Badge key={index} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  {/* Lead Time */}
                  {product.availability?.leadTime && (
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium">Lead Time:</span>
                          <span>{product.availability.leadTime}</span>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            <Separator />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="flex-1 w-full">
                <Mail className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Request Quote</span>
                <span className="sm:hidden">Quote</span>
              </Button>
              <Button variant="outline" className="flex-1 w-full">
                <Phone className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Contact Us</span>
                <span className="sm:hidden">Contact</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}