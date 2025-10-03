import { z } from 'zod';
import { 
  emailSchema, 
  phoneSchema, 
  shortTextSchema, 
  longTextSchema 
} from './common';
import {
  projectTypeSchema,
  budgetRangeSchema,
  timelineRangeSchema,
  preferredContactMethodSchema 
} from './contact';

// Contact form validation
export const contactFormValidation = z.object({
  name: shortTextSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  company: shortTextSchema.optional(),
  projectType: projectTypeSchema.optional(),
  budget: budgetRangeSchema.optional(),
  timeline: timelineRangeSchema.optional(),
  message: longTextSchema,
  preferredContact: preferredContactMethodSchema.optional(),
  marketingConsent: z.boolean().default(false),
});

// Newsletter signup validation
export const newsletterSignupValidation = z.object({
  email: emailSchema,
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  interests: z.array(z.string()).optional(),
  marketingConsent: z.boolean().default(false),
});

// Search form validation
export const searchFormValidation = z.object({
  query: z.string().min(1, 'Search query is required').max(200),
  category: z.string().optional(),
  filters: z.record(z.any()).optional(),
});

// File upload validation
export const fileUploadValidation = z.object({
  file: z.any().refine((file) => file instanceof File, 'Must be a valid file'),
  maxSize: z.number().default(10 * 1024 * 1024), // 10MB default
  allowedTypes: z.array(z.string()).default(['image/jpeg', 'image/png', 'image/webp', 'application/pdf']),
});

// Lead capture form validation (for guide downloads)
export const leadCaptureValidation = z.object({
  name: shortTextSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  company: shortTextSchema.optional(),
  jobTitle: z.string().max(100).optional(),
  interests: z.array(z.string()).optional(),
  marketingConsent: z.boolean().default(false),
});

// Quote request form validation
export const quoteRequestValidation = z.object({
  name: shortTextSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  company: shortTextSchema.optional(),
  projectType: projectTypeSchema,
  budget: budgetRangeSchema,
  timeline: timelineRangeSchema,
  description: longTextSchema,
  location: z.string().max(200).optional(),
  services: z.array(z.string()).min(1, 'Please select at least one service'),
  attachments: z.array(z.any()).optional(),
  preferredContact: preferredContactMethodSchema.optional(),
});

// Consultation booking form validation
export const consultationBookingValidation = z.object({
  name: shortTextSchema,
  email: emailSchema,
  phone: phoneSchema,
  projectType: projectTypeSchema,
  budget: budgetRangeSchema,
  timeline: timelineRangeSchema,
  description: longTextSchema,
  preferredDate: z.string().datetime().optional(),
  preferredTime: z.string().optional(),
  location: z.string().max(200).optional(),
  consultationType: z.enum(['in_person', 'virtual', 'phone']).default('virtual'),
});

// Feedback form validation
export const feedbackFormValidation = z.object({
  name: shortTextSchema.optional(),
  email: emailSchema.optional(),
  rating: z.number().min(1).max(5),
  category: z.enum(['general', 'website', 'service', 'product', 'support']),
  message: longTextSchema,
  anonymous: z.boolean().default(false),
});

// Export all form validation schemas
export const formValidations = {
  contactForm: contactFormValidation,
  newsletterSignup: newsletterSignupValidation,
  searchForm: searchFormValidation,
  fileUpload: fileUploadValidation,
  leadCapture: leadCaptureValidation,
  quoteRequest: quoteRequestValidation,
  consultationBooking: consultationBookingValidation,
  feedbackForm: feedbackFormValidation,
};

// Type exports for form data
export type ContactFormData = z.infer<typeof contactFormValidation>;
export type NewsletterSignupData = z.infer<typeof newsletterSignupValidation>;
export type SearchFormData = z.infer<typeof searchFormValidation>;
export type FileUploadData = z.infer<typeof fileUploadValidation>;
export type LeadCaptureData = z.infer<typeof leadCaptureValidation>;
export type QuoteRequestData = z.infer<typeof quoteRequestValidation>;
export type ConsultationBookingData = z.infer<typeof consultationBookingValidation>;
export type FeedbackFormData = z.infer<typeof feedbackFormValidation>;