import React, { useState } from 'react';
import { ProcessWorkflow } from '@shared/types/process';
import { ProcessWorkflowVisualization } from './ProcessWorkflowVisualization';
import { ProcessTimeline } from './ProcessTimeline';
import { cn } from '@/lib/utils';

interface ProcessSectionProps {
  workflow: ProcessWorkflow;
  currentPhase?: string;
  completedPhases?: string[];
  className?: string;
}

type ViewMode = 'workflow' | 'timeline';

export function ProcessSection({ 
  workflow, 
  currentPhase, 
  completedPhases = [], 
  className 
}: ProcessSectionProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('workflow');
  
  return (
    <div className={cn("space-y-12", className)}>
      {/* Section Header with View Toggle */}
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          How We Work
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
          Our proven process ensures exceptional results through clear communication, 
          quality control, and collaborative partnership at every step.
        </p>
        
        {/* View Mode Toggle */}
        <div className="inline-flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('workflow')}
            className={cn(
              "px-6 py-2 rounded-md font-medium transition-all duration-200",
              viewMode === 'workflow'
                ? "bg-white text-primary shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            )}
          >
            Process Overview
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            className={cn(
              "px-6 py-2 rounded-md font-medium transition-all duration-200",
              viewMode === 'timeline'
                ? "bg-white text-primary shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            )}
          >
            Project Timeline
          </button>
        </div>
      </div>
      
      {/* Content Based on View Mode */}
      <div className="transition-all duration-300">
        {viewMode === 'workflow' ? (
          <ProcessWorkflowVisualization workflow={workflow} />
        ) : (
          <ProcessTimeline 
            phases={workflow.phases}
            currentPhase={currentPhase}
            completedPhases={completedPhases}
          />
        )}
      </div>
      
      {/* Process Benefits */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 md:p-12">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Why Our Process Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Clear Expectations</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Every phase has defined deliverables and timelines, so you always know what to expect next.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Collaborative Partnership</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your input and feedback are integrated at key decision points throughout the project.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Quality Assurance</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Multiple checkpoints ensure the highest quality standards are maintained from start to finish.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}