import React from 'react';
import { ProcessWorkflow, ProcessPhase, ProcessStep } from '@shared/types/process';
import { cn } from '@/lib/utils';
import { processIcons } from '@/data/mockProcess';

interface ProcessWorkflowVisualizationProps {
  workflow: ProcessWorkflow;
  className?: string;
}

interface ProcessPhaseCardProps {
  phase: ProcessPhase;
  phaseIndex: number;
  totalPhases: number;
}

interface ProcessStepCardProps {
  step: ProcessStep;
  stepIndex: number;
  totalSteps: number;
}

function ProcessStepCard({ step, stepIndex, totalSteps }: ProcessStepCardProps) {
  const icon = step.icon ? processIcons[step.icon as keyof typeof processIcons] : '•';
  
  return (
    <div className="relative">
      {/* Step Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
        {/* Step Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-lg">
            {icon}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">{step.title}</h4>
            {step.duration && (
              <span className="text-sm text-primary font-medium">{step.duration}</span>
            )}
          </div>
        </div>

        {/* Step Description */}
        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
          {step.description}
        </p>

        {/* Deliverables */}
        {step.deliverables.length > 0 && (
          <div className="mb-4">
            <h5 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
              Deliverables
            </h5>
            <ul className="space-y-1">
              {step.deliverables.map((deliverable, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{deliverable}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Client Involvement */}
        {step.clientInvolvement.length > 0 && (
          <div>
            <h5 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
              Your Involvement
            </h5>
            <ul className="space-y-1">
              {step.clientInvolvement.map((involvement, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-secondary mt-1">•</span>
                  <span>{involvement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Connector Line */}
      {stepIndex < totalSteps - 1 && (
        <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-0.5 bg-gray-300 transform -translate-y-1/2 z-10">
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
      )}
    </div>
  );
}

function ProcessPhaseCard({ phase, phaseIndex, totalPhases }: ProcessPhaseCardProps) {
  return (
    <div className="relative">
      {/* Phase Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full font-bold text-lg mb-4">
          {phaseIndex + 1}
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{phase.title}</h3>
        <p className="text-gray-600 max-w-md mx-auto mb-2">{phase.description}</p>
        {phase.duration && (
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
            {phase.duration}
          </span>
        )}
      </div>

      {/* Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
        {phase.steps.map((step, stepIndex) => (
          <ProcessStepCard
            key={step.id}
            step={step}
            stepIndex={stepIndex}
            totalSteps={phase.steps.length}
          />
        ))}
      </div>

      {/* Phase Connector */}
      {phaseIndex < totalPhases - 1 && (
        <div className="flex justify-center mt-12 mb-8">
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-8 bg-gray-300"></div>
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-0.5 h-8 bg-gray-300"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export function ProcessWorkflowVisualization({ workflow, className }: ProcessWorkflowVisualizationProps) {
  return (
    <div className={cn("space-y-16", className)}>
      {/* Workflow Header */}
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          {workflow.title}
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
          {workflow.description}
        </p>
        {workflow.overview && (
          <p className="text-gray-600 leading-relaxed mb-6">
            {workflow.overview}
          </p>
        )}
        {workflow.totalDuration && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full font-medium">
            <span>Total Timeline:</span>
            <span className="font-bold">{workflow.totalDuration}</span>
          </div>
        )}
      </div>

      {/* Process Phases */}
      <div className="space-y-16">
        {workflow.phases.map((phase, phaseIndex) => (
          <ProcessPhaseCard
            key={phase.id}
            phase={phase}
            phaseIndex={phaseIndex}
            totalPhases={workflow.phases.length}
          />
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center bg-muted/30 rounded-2xl p-8 md:p-12">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to Begin Your Project?
        </h3>
        <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
          Our structured process ensures your project runs smoothly from start to finish. 
          Let's discuss how we can bring your vision to life.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
            Start Your Project
          </button>

        </div>
      </div>
    </div>
  );
}