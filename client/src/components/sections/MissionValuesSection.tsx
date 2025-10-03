import React from 'react';
import { CompanyInfo } from '@shared/types/common';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Target, Heart, Star, Award, Users, Lightbulb } from 'lucide-react';

interface MissionValuesSectionProps {
  company: Pick<CompanyInfo, 'mission' | 'values'>;
  className?: string;
}

// Icon mapping for common values
const getValueIcon = (value: string) => {
  const lowerValue = value.toLowerCase();
  
  if (lowerValue.includes('quality') || lowerValue.includes('excellence')) {
    return Star;
  }
  if (lowerValue.includes('integrity') || lowerValue.includes('trust')) {
    return Award;
  }
  if (lowerValue.includes('innovation') || lowerValue.includes('creative')) {
    return Lightbulb;
  }
  if (lowerValue.includes('customer') || lowerValue.includes('client')) {
    return Heart;
  }
  if (lowerValue.includes('team') || lowerValue.includes('collaboration')) {
    return Users;
  }
  
  return Target; // Default icon
};

export function MissionValuesSection({ company, className }: MissionValuesSectionProps) {
  return (
    <div className={cn("space-y-12", className)}>
      {/* Mission Statement */}
      {company.mission && (
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission</h2>
          </div>
          
          <Card className="shadow-lg">
            <CardContent className="p-8 md:p-12">
              <blockquote className="text-lg md:text-xl leading-relaxed text-muted-foreground italic">
                "{company.mission}"
              </blockquote>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Core Values */}
      {company.values && company.values.length > 0 && (
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do and shape our company culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {company.values.map((value: string, index: number) => {
              // Split value into title and description if it contains a colon or dash
              const parts = value.split(/[:-](.+)/);
              const title = parts[0].trim();
              const description = parts[1]?.trim();
              
              const IconComponent = getValueIcon(value);

              return (
                <Card 
                  key={index} 
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <CardHeader className="text-center pb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3 mx-auto group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg font-semibold">
                      {title}
                    </CardTitle>
                  </CardHeader>
                  
                  {description && (
                    <CardContent className="pt-0 text-center">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {description}
                      </p>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Visual Elements */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-3xl" />
        <div className="relative bg-card/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Building Excellence Together</h3>
            <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Our mission and values aren't just words on a wall—they're the foundation of every project we undertake, 
              every relationship we build, and every solution we deliver. They guide our decisions, inspire our creativity, 
              and ensure that we consistently exceed expectations while staying true to our core principles.
            </p>
          </div>
          
          {/* Decorative elements */}
          <div className="flex justify-center mt-8 space-x-8 opacity-20">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>
    </div>
  );
}