import React from 'react';
import { ContactInformation } from './ContactInformation';
import { ContactForm } from './ContactForm';
import { useContactInformation } from '../../hooks/useContact';
import { Skeleton } from '../ui/skeleton';
import { Alert, AlertDescription } from '../ui/alert';
import { AlertCircle } from 'lucide-react';

interface ContactSectionProps {
  className?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ className = "" }) => {
  const { contactInfo, loading, error } = useContactInformation();

  if (loading) {
    return (
      <div className={`space-y-8 ${className}`}>
        <div className="text-center space-y-4">
          <Skeleton className="h-8 w-48 mx-auto" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-96 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !contactInfo) {
    return (
      <div className={className}>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error || 'Failed to load contact information. Please try again later.'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className={`space-y-12 ${className}`}>
      {/* Section Header */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Get in Touch</h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
          Ready to transform your space? We'd love to hear about your project and discuss how we can bring your vision to life.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
        {/* Contact Information */}
        <div className="space-y-6 order-2 lg:order-1">
          <ContactInformation contactInfo={contactInfo} />
        </div>

        {/* Contact Form */}
        <div className="lg:sticky lg:top-8 order-1 lg:order-2">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};