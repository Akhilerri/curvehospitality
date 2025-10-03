import { useState, useEffect } from 'react';
import { ContactInformation, ContactForm, ContactSubmission } from '../../../shared/types/contact';

export const useContactInformation = () => {
  const [contactInfo, setContactInfo] = useState<ContactInformation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/contact/info');
        
        if (!response.ok) {
          throw new Error('Failed to fetch contact information');
        }
        
        const data = await response.json();
        setContactInfo(data.contactInfo);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load contact information');
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  return { contactInfo, loading, error };
};

export const useContactForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitForm = async (formData: ContactForm): Promise<ContactSubmission | null> => {
    try {
      setSubmitting(true);
      setError(null);
      
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit contact form');
      }

      const data = await response.json();
      setSubmitted(true);
      
      // Return a basic submission object
      return {
        id: data.submission.id,
        companyId: 'company-1',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        projectType: formData.projectType,
        message: formData.message,
        submittedAt: new Date(data.submission.submittedAt),
        status: data.submission.status,
        source: 'website_form',
        createdAt: new Date(),
        updatedAt: new Date()
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit contact form. Please try again.';
      setError(errorMessage);
      return null;
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setError(null);
  };

  return {
    submitForm,
    submitting,
    submitted,
    error,
    resetForm
  };
};