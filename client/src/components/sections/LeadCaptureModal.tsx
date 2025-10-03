import React, { useState } from 'react';
import { X, Download, Lock, Mail, User, Building, Phone, Briefcase } from 'lucide-react';
import { Guide, LeadCaptureForm } from '../../../../shared/types/guides';

interface LeadCaptureModalProps {
  isOpen: boolean;
  guide: Guide | null;
  onClose: () => void;
  onSubmit: (formData: LeadCaptureForm) => Promise<string>;
  isSubmitting?: boolean;
  error?: string | null;
}

const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({
  isOpen,
  guide,
  onClose,
  onSubmit,
  isSubmitting = false,
  error = null
}) => {
  const [formData, setFormData] = useState<LeadCaptureForm>({
    name: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    interests: [],
    marketingConsent: false
  });

  const [formErrors, setFormErrors] = useState<Partial<LeadCaptureForm>>({});

  if (!isOpen || !guide) return null;

  const handleInputChange = (field: keyof LeadCaptureForm, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<LeadCaptureForm> = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const downloadUrl = await onSubmit(formData);
      
      // Start download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = guide.title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        jobTitle: '',
        interests: [],
        marketingConsent: false
      });
      
      onClose();
    } catch (err) {
      // Error is handled by parent component
      console.error('Download failed:', err);
    }
  };

  const interestOptions = [
    'Interior Design',
    'Project Management',
    'Material Selection',
    'Sustainable Design',
    'Commercial Spaces',
    'Residential Design',
    'Custom Furniture',
    'Space Planning'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="bg-teal-100 p-2 rounded-lg">
              <Lock className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Get Your Free Download</h3>
              <p className="text-sm text-gray-600">Just a few details to get started</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Guide Info */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-start gap-4">
            {guide.thumbnail && (
              <img
                src={guide.thumbnail.url}
                alt={guide.thumbnail.alt}
                className="w-16 h-20 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-1">{guide.title}</h4>
              <p className="text-sm text-gray-600 line-clamp-2">{guide.description}</p>
              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                {guide.fileSize && <span>{guide.fileSize}</span>}
                {guide.fileType && <span>{guide.fileType.toUpperCase()}</span>}
                {guide.downloadCount && <span>{guide.downloadCount.toLocaleString()} downloads</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-1" />
              Full Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                formErrors.name ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
            />
            {formErrors.name && (
              <p className="text-sm text-red-600 mt-1">{formErrors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="w-4 h-4 inline mr-1" />
              Email Address *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${
                formErrors.email ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your email address"
            />
            {formErrors.email && (
              <p className="text-sm text-red-600 mt-1">{formErrors.email}</p>
            )}
          </div>

          {/* Phone (Optional) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-1" />
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Company (Optional) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Building className="w-4 h-4 inline mr-1" />
              Company
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter your company name"
            />
          </div>

          {/* Job Title (Optional) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Briefcase className="w-4 h-4 inline mr-1" />
              Job Title
            </label>
            <input
              type="text"
              value={formData.jobTitle}
              onChange={(e) => handleInputChange('jobTitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Enter your job title"
            />
          </div>

          {/* Interests (Optional) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Areas of Interest
            </label>
            <div className="grid grid-cols-2 gap-2">
              {interestOptions.map((interest) => (
                <label key={interest} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.interests?.includes(interest) || false}
                    onChange={(e) => {
                      const currentInterests = formData.interests || [];
                      if (e.target.checked) {
                        handleInputChange('interests', [...currentInterests, interest]);
                      } else {
                        handleInputChange('interests', currentInterests.filter(i => i !== interest));
                      }
                    }}
                    className="mr-2 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-700">{interest}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Marketing Consent */}
          <div className="mb-6">
            <label className="flex items-start">
              <input
                type="checkbox"
                checked={formData.marketingConsent}
                onChange={(e) => handleInputChange('marketingConsent', e.target.checked)}
                className="mr-2 mt-0.5 text-teal-600 focus:ring-teal-500"
              />
              <span className="text-sm text-gray-700">
                I'd like to receive updates about new resources, design insights, and industry news.
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Now</span>
              </>
            )}
          </button>

          <p className="text-xs text-gray-500 text-center mt-3">
            By downloading, you agree to our terms of service and privacy policy.
          </p>
        </form>
      </div>
    </div>
  );
};

export default LeadCaptureModal;