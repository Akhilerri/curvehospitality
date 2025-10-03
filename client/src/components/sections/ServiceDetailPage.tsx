import React from 'react';
import { Service, ProcessStep } from '@shared/types/services';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  ArrowRight, 
  Clock, 
  CheckCircle, 
  Users, 
  Phone, 
  Mail,
  Calendar,
  DollarSign
} from 'lucide-react';

interface ServiceDetailPageProps {
  service: Service;
  onContactClick?: () => void;
  onQuoteClick?: () => void;
  className?: string;
}

export function ServiceDetailPage({ 
  service, 
  onContactClick, 
  onQuoteClick, 
  className 
}: ServiceDetailPageProps) {
  return (
    <div className={cn("space-y-12", className)}>
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          {service.title}
        </h1>
        {service.description && (
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
            {service.description}
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={onQuoteClick}
            className="px-8"
          >
            Get a Quote
            <DollarSign className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={onContactClick}
            className="px-8"
          >
            Contact Us
            <Phone className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Service Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Capabilities */}
          {service.capabilities && service.capabilities.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  Our Capabilities
                </CardTitle>
                <CardDescription>
                  Comprehensive solutions tailored to your specific needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.capabilities.map((capability, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{capability}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Process Steps */}
          {service.processSteps && service.processSteps.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ArrowRight className="mr-2 h-5 w-5 text-primary" />
                  Our Process
                </CardTitle>
                <CardDescription>
                  Step-by-step approach to ensure project success
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {service.processSteps.map((step, index) => (
                    <ProcessStepCard key={index} step={step} stepNumber={index + 1} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Deliverables */}
          {service.deliverables && service.deliverables.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                  What You'll Receive
                </CardTitle>
                <CardDescription>
                  Comprehensive deliverables for your project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.deliverables.map((deliverable, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{deliverable}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Pricing Information */}
          {service.pricing && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5 text-primary" />
                  Pricing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <Badge variant="secondary" className="mb-2">
                    {service.pricing.type.replace('_', ' ').toUpperCase()}
                  </Badge>
                  {service.pricing.startingPrice && (
                    <div className="text-2xl font-bold">
                      ${service.pricing.startingPrice.toLocaleString()}
                      {service.pricing.type === 'hourly' && '/hr'}
                    </div>
                  )}
                  {service.pricing.priceRange && (
                    <div className="text-lg text-muted-foreground">
                      ${service.pricing.priceRange.min.toLocaleString()} - ${service.pricing.priceRange.max.toLocaleString()}
                    </div>
                  )}
                </div>
                {service.pricing.description && (
                  <p className="text-sm text-muted-foreground text-center">
                    {service.pricing.description}
                  </p>
                )}
                <Button className="w-full" onClick={onQuoteClick}>
                  Get Custom Quote
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Duration Information */}
          {service.duration && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-primary" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="text-lg font-semibold">Typical Duration</div>
                  <div className="text-2xl font-bold text-primary">{service.duration.typical}</div>
                </div>
                {(service.duration.minimum || service.duration.maximum) && (
                  <div className="text-sm text-muted-foreground text-center">
                    Range: {service.duration.minimum || 'Varies'} - {service.duration.maximum || 'Varies'}
                  </div>
                )}
                {service.duration.factors && service.duration.factors.length > 0 && (
                  <div>
                    <div className="text-sm font-medium mb-2">Timeline depends on:</div>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {service.duration.factors.map((factor, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-1 h-1 bg-muted-foreground rounded-full mt-1.5 mr-2 flex-shrink-0" />
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Contact Card */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <Users className="mr-2 h-5 w-5" />
                Ready to Get Started?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Contact our team to discuss your project requirements and get a personalized solution.
              </p>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={onContactClick}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Us
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={onContactClick}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={onContactClick}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Meeting
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface ProcessStepCardProps {
  step: ProcessStep;
  stepNumber: number;
}

function ProcessStepCard({ step, stepNumber }: ProcessStepCardProps) {
  return (
    <div className="flex space-x-4">
      <div className="flex-shrink-0">
        <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold text-sm">
          {stepNumber}
        </div>
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">{step.title}</h4>
          {step.duration && (
            <Badge variant="secondary" className="text-xs">
              {step.duration}
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground">{step.description}</p>
        
        {step.deliverables && step.deliverables.length > 0 && (
          <div>
            <div className="text-xs font-medium text-muted-foreground mb-1">Deliverables:</div>
            <ul className="text-xs text-muted-foreground space-y-1">
              {step.deliverables.map((deliverable, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 mr-1 flex-shrink-0" />
                  {deliverable}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {step.clientInvolvement && (
          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="text-xs font-medium mb-1">Your Involvement:</div>
            <p className="text-xs text-muted-foreground">{step.clientInvolvement}</p>
          </div>
        )}
      </div>
    </div>
  );
}