import React from 'react';
import { CompanyHistory } from '@shared/types/company';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CompanyHistoryTimelineProps {
  history: CompanyHistory[];
  className?: string;
}

export function CompanyHistoryTimeline({ history, className }: CompanyHistoryTimelineProps) {
  const sortedHistory = [...history].sort((a, b) => a.year - b.year);

  return (
    <div className={cn("relative", className)}>
      {/* Timeline line */}
      <div className="absolute left-4 md:left-1/2 md:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-border" />
      
      <div className="space-y-8 md:space-y-12">
        {sortedHistory.map((item, index) => (
          <div
            key={`${item.year}-${index}`}
            className={cn(
              "relative flex flex-col md:flex-row md:items-center",
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            )}
          >
            {/* Year marker */}
            <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-8 h-8 bg-primary rounded-full border-4 border-background flex items-center justify-center z-10">
              <div className="w-2 h-2 bg-primary-foreground rounded-full" />
            </div>
            
            {/* Content */}
            <div className={cn(
              "ml-12 md:ml-0 md:w-1/2",
              index % 2 === 0 ? "md:pr-8" : "md:pl-8"
            )}>
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl font-bold text-primary">{item.year}</span>
                    <div className="h-px bg-border flex-1" />
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2 text-foreground">
                    {item.milestone}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                  
                  {item.image && (
                    <div className="mt-4">
                      <img
                        src={item.image.url}
                        alt={item.image.alt}
                        className="w-full h-32 object-cover rounded-md"
                        loading="lazy"
                      />
                      {item.image.caption && (
                        <p className="text-xs text-muted-foreground mt-1 italic">
                          {item.image.caption}
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}