import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ContactForm as ContactFormType, ProjectType, BudgetRange, TimelineRange, PreferredContactMethod } from '../../../../shared/types/contact';
import { contactFormSchema } from '../../../../shared/validation/contact';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Alert, AlertDescription } from '../ui/alert';
import { Loader2, CheckCircle, Send, AlertCircle } from 'lucide-react';
import { useContactForm } from '../../hooks/useContact';

interface ContactFormProps {
  onSuccess?: () => void;
  className?: string;
}

const projectTypeOptions: { value: ProjectType; label: string }[] = [
  { value: 'residential_design', label: 'Residential Interior Design' },
  { value: 'commercial_design', label: 'Commercial Interior Design' },
  { value: 'manufacturing', label: 'Custom Manufacturing' },
  { value: 'procurement', label: 'Procurement Services' },
  { value: 'project_management', label: 'Project Management' },
  { value: 'consultation', label: 'Design Consultation' },
  { value: 'other', label: 'Other' },
];

const budgetOptions: { value: BudgetRange; label: string }[] = [
  { value: 'under_10k', label: 'Under $10,000' },
  { value: '10k_25k', label: '$10,000 - $25,000' },
  { value: '25k_50k', label: '$25,000 - $50,000' },
  { value: '50k_100k', label: '$50,000 - $100,000' },
  { value: '100k_250k', label: '$100,000 - $250,000' },
  { value: 'over_250k', label: 'Over $250,000' },
  { value: 'not_sure', label: 'Not sure yet' },
];

const timelineOptions: { value: TimelineRange; label: string }[] = [
  { value: 'asap', label: 'As soon as possible' },
  { value: '1_3_months', label: '1-3 months' },
  { value: '3_6_months', label: '3-6 months' },
  { value: '6_12_months', label: '6-12 months' },
  { value: 'over_1_year', label: 'Over 1 year' },
  { value: 'flexible', label: 'Flexible timeline' },
];

const contactMethodOptions: { value: PreferredContactMethod; label: string }[] = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone call' },
  { value: 'text', label: 'Text message' },
  { value: 'no_preference', label: 'No preference' },
];

export const ContactForm: React.FC<ContactFormProps> = ({ onSuccess, className = "" }) => {
  const { submitForm, submitting, submitted, error, resetForm } = useContactForm();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields },
    setValue,
    watch,
    reset,
    trigger
  } = useForm<ContactFormType>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
    defaultValues: {
      marketingConsent: false
    }
  });

  const onSubmit = async (data: ContactFormType) => {
    const result = await submitForm(data);
    if (result && onSuccess) {
      onSuccess();
    }
  };

  const handleReset = () => {
    reset();
    resetForm();
  };

  if (submitted) {
    return (
      <Card className={className}>
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Thank you for your message!</h3>
          <p className="text-muted-foreground mb-6">
            We've received your inquiry and will get back to you within 24 hours during business days.
          </p>
          <Button onClick={handleReset} variant="outline">
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <Send className="h-4 w-4 sm:h-5 sm:w-5" />
          Get in Touch
        </CardTitle>
        <p className="text-muted-foreground text-sm sm:text-base">
          Ready to start your project? Fill out the form below and we'll get back to you soon.
        </p>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Your full name"
                className={`h-11 ${errors.name ? 'border-red-500 focus:border-red-500' : touchedFields.name && !errors.name ? 'border-green-500' : ''}`}
                onBlur={() => trigger('name')}
              />
              {errors.name && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="your.email@example.com"
                className={`h-11 ${errors.email ? 'border-red-500 focus:border-red-500' : touchedFields.email && !errors.email ? 'border-green-500' : ''}`}
                onBlur={() => trigger('email')}
              />
              {errors.email && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                {...register('phone')}
                placeholder="(555) 123-4567"
                className={`h-11 ${errors.phone ? 'border-red-500 focus:border-red-500' : touchedFields.phone && !errors.phone ? 'border-green-500' : ''}`}
                onBlur={() => trigger('phone')}
              />
              {errors.phone && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm font-medium">Company (Optional)</Label>
              <Input
                id="company"
                {...register('company')}
                placeholder="Your company name"
                className="h-11"
              />
            </div>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="projectType" className="text-sm font-medium">Project Type</Label>
              <Select onValueChange={(value) => setValue('projectType', value as ProjectType)}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  {projectTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget" className="text-sm font-medium">Budget Range</Label>
              <Select onValueChange={(value) => setValue('budget', value as BudgetRange)}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  {budgetOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timeline" className="text-sm font-medium">Project Timeline</Label>
              <Select onValueChange={(value) => setValue('timeline', value as TimelineRange)}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  {timelineOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredContact" className="text-sm font-medium">Preferred Contact Method</Label>
              <Select onValueChange={(value) => setValue('preferredContact', value as PreferredContactMethod)}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="How should we contact you?" />
                </SelectTrigger>
                <SelectContent>
                  {contactMethodOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium">Project Details *</Label>
            <Textarea
              id="message"
              {...register('message')}
              placeholder="Tell us about your project, requirements, and any specific questions you have..."
              rows={4}
              className={`min-h-[100px] resize-y ${errors.message ? 'border-red-500 focus:border-red-500' : touchedFields.message && !errors.message ? 'border-green-500' : ''}`}
              onBlur={() => trigger('message')}
            />
            {errors.message && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.message.message}
              </p>
            )}
            <p className="text-xs text-muted-foreground">
              {watch('message')?.length || 0} characters (minimum 10 required)
            </p>
          </div>

          {/* Marketing Consent */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="marketingConsent"
              checked={watch('marketingConsent')}
              onCheckedChange={(checked) => setValue('marketingConsent', !!checked)}
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="marketingConsent"
                className="text-sm font-normal cursor-pointer"
              >
                I'd like to receive updates about new products, services, and design insights
              </Label>
              <p className="text-xs text-muted-foreground">
                You can unsubscribe at any time. We respect your privacy.
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={submitting}
            className="w-full"
            size="lg"
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending Message...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By submitting this form, you agree to our privacy policy and terms of service.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};