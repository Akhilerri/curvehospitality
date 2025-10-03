import React from 'react';
import { Service } from '@shared/types/services';
import { ServiceOverviewGrid } from './ServiceOverviewGrid';
import { cn } from '@/lib/utils';

interface ServicesSectionProps {
  services: Service[];
  onServiceClick?: (service: Service) => void;
  className?: string;
}

export function ServicesSection({ services, onServiceClick, className }: ServicesSectionProps) {
  return (
    <div className={cn("space-y-12", className)}>
      {/* Section Header */}
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          Our Services
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          From concept to completion, we provide comprehensive solutions for all your interior design and manufacturing needs. 
          Our expert team delivers exceptional results across four core service areas.
        </p>
      </div>

      {/* Services Grid */}
      <ServiceOverviewGrid 
        services={services}
        onServiceClick={onServiceClick}
      />

      {/* Call to Action */}
      <div className="text-center bg-muted/30 rounded-2xl p-8 md:p-12">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to Start Your Project?
        </h3>
        <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
          Let's discuss how our services can bring your vision to life. 
          Contact us today for a consultation and personalized quote.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
            Get a Quote
          </button>

        </div>
      </div>
    </div>
  );
}