import React from 'react';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { useProcess } from '@/hooks/useProcess';

export default function Process() {
  const { 
    workflow, 
    currentPhase, 
    completedPhases, 
    isLoading, 
    error 
  } = useProcess();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading process information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Process</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!workflow) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📋</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Process Found</h2>
          <p className="text-gray-600">Process workflow information is not available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background section-spacing">
        <div className="section-container">
          <div className="section-header">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our Process
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Discover how we transform your vision into reality through our proven, 
              collaborative approach to design and manufacturing.
            </p>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-spacing">
        <div className="section-container">
          <ProcessSection 
            workflow={workflow}
            currentPhase={currentPhase}
            completedPhases={completedPhases}
          />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted/30 section-spacing">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">
                  How long does the typical project take?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Most projects take between 14-27 weeks from initial consultation to completion, 
                  depending on scope and complexity. We'll provide a detailed timeline during the planning phase.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">
                  What happens if there are changes during the project?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  We build flexibility into our process to accommodate changes. Any modifications are 
                  discussed with you first, including timeline and budget implications, before implementation.
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">
                  How involved will I be in the process?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Your involvement is crucial to success. We schedule regular check-ins, reviews, and 
                  approval points to ensure the project stays aligned with your vision and expectations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}