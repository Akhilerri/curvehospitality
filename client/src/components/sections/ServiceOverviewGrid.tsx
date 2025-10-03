import React from 'react';
import { Service } from '@shared/types/services';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight, Wrench, Palette, ShoppingCart, ClipboardList } from 'lucide-react';

interface ServiceOverviewGridProps {
  services: Service[];
  onServiceClick?: (service: Service) => void;
  className?: string;
}

const serviceIcons = {
  manufacturing: Wrench,
  interior_design: Palette,
  procurement: ShoppingCart,
  project_management: ClipboardList,
};

const serviceDescriptions = {
  manufacturing: "Custom manufacturing solutions with precision craftsmanship and quality materials.",
  interior_design: "Complete interior design services from concept to completion with expert guidance.",
  procurement: "Strategic sourcing and procurement of materials, furniture, and fixtures.",
  project_management: "End-to-end project coordination ensuring timely delivery and quality results.",
};

export function ServiceOverviewGrid({ services, onServiceClick, className }: ServiceOverviewGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
      {services.map((service) => {
        const IconComponent = serviceIcons[service.type];
        const defaultDescription = serviceDescriptions[service.type];
        
        return (
          <Card 
            key={service.id}
            className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-2 hover:border-primary/20"
            onClick={() => onServiceClick?.(service)}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <IconComponent className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                {service.title}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="pt-0">
              <CardDescription className="text-center mb-6 min-h-[3rem] flex items-center">
                {service.description || defaultDescription}
              </CardDescription>
              
              {service.capabilities && service.capabilities.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-semibold text-sm mb-2 text-foreground">Key Capabilities:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {service.capabilities.slice(0, 3).map((capability, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 mr-2 flex-shrink-0" />
                        {capability}
                      </li>
                    ))}
                    {service.capabilities.length > 3 && (
                      <li className="text-xs text-muted-foreground/70 italic">
                        +{service.capabilities.length - 3} more capabilities
                      </li>
                    )}
                  </ul>
                </div>
              )}
              
              <Button 
                variant="outline" 
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}