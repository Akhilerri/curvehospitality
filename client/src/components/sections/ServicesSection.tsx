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
    <div className={cn("section-content", className)}>
      {/* Section Header */}
      <div className="section-header">
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
      <div className="text-center bg-muted/30 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 mt-8 sm:mt-12">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
          Ready to Start Your Project?
        </h3>
        <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 max-w-2xl mx-auto">
          Let's discuss how our services can bring your vision to life. 
          Contact us today for a consultation and personalized quote.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <button className="px-6 sm:px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors touch-manipulation">
            Get a Quote
          </button>
        </div>
      </div>
    </div>
  );
}