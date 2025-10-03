import React, { useState } from 'react';
import { ProcessPhase, ProcessStep, ProcessDeliverable, ClientInvolvement } from '@shared/types/process';
import { cn } from '@/lib/utils';
import { processIcons } from '@/data/mockProcess';

interface ProcessTimelineProps {
  phases: ProcessPhase[];
  currentPhase?: string;
  completedPhases?: string[];
  className?: string;
}

interface TimelinePhaseProps {
  phase: ProcessPhase;
  phaseIndex: number;
  isActive?: boolean;
  isCompleted?: boolean;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}

interface DeliverableItemProps {
  deliverable: string;
  type?: 'deliverable' | 'involvement';
}

function DeliverableItem({ deliverable, type = 'deliverable' }: DeliverableItemProps) {
  const iconColor = type === 'deliverable' ? 'text-blue-500' : 'text-green-500';
  const icon = type === 'deliverable' ? '📄' : '👤';
  
  return (
    <div className="flex items-start gap-3 py-2">
      <span className={cn("text-sm mt-0.5", iconColor)}>{icon}</span>
      <span className="text-sm text-gray-600 leading-relaxed">{deliverable}</span>
    </div>
  );
}

function TimelinePhase({ 
  phase, 
  phaseIndex, 
  isActive = false, 
  isCompleted = false, 
  isExpanded = false,
  onToggleExpand 
}: TimelinePhaseProps) {
  const phaseNumber = phaseIndex + 1;
  
  // Get phase status styling
  const getPhaseStatus = () => {
    if (isCompleted) return 'completed';
    if (isActive) return 'active';
    return 'upcoming';
  };
  
  const status = getPhaseStatus();
  
  const statusStyles = {
    completed: {
      circle: 'bg-green-500 text-white border-green-500',
      line: 'bg-green-500',
      card: 'border-green-200 bg-green-50/50',
      title: 'text-green-800',
    },
    active: {
      circle: 'bg-primary text-primary-foreground border-primary',
      line: 'bg-primary',
      card: 'border-primary/30 bg-primary/5',
      title: 'text-primary',
    },
    upcoming: {
      circle: 'bg-gray-100 text-gray-400 border-gray-300',
      line: 'bg-gray-300',
      card: 'border-gray-200 bg-gray-50/30',
      title: 'text-gray-600',
    },
  };
  
  const styles = statusStyles[status];
  
  return (
    <div className="relative">
      {/* Timeline Line */}
      {phaseIndex > 0 && (
        <div className={cn(
          "absolute left-6 -top-8 w-0.5 h-8 transform -translate-x-1/2",
          styles.line
        )} />
      )}
      
      <div className="flex gap-6">
        {/* Phase Number Circle */}
        <div className="flex-shrink-0 relative">
          <div className={cn(
            "w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-lg",
            styles.circle
          )}>
            {isCompleted ? '✓' : phaseNumber}
          </div>
        </div>
        
        {/* Phase Content */}
        <div className="flex-1 pb-8">
          <div className={cn(
            "rounded-lg border p-6 transition-all duration-200",
            styles.card,
            isExpanded && "shadow-md"
          )}>
            {/* Phase Header */}
            <div 
              className="cursor-pointer"
              onClick={onToggleExpand}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className={cn("text-xl font-bold", styles.title)}>
                  {phase.title}
                </h3>
                <div className="flex items-center gap-2">
                  {phase.duration && (
                    <span className="text-sm font-medium px-2 py-1 bg-white/80 rounded-full border">
                      {phase.duration}
                    </span>
                  )}
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <span className={cn(
                      "transform transition-transform duration-200",
                      isExpanded ? "rotate-180" : "rotate-0"
                    )}>
                      ▼
                    </span>
                  </button>
                </div>
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                {phase.description}
              </p>
            </div>
            
            {/* Expanded Content */}
            {isExpanded && (
              <div className="mt-6 space-y-6">
                {/* Steps Overview */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Phase Steps</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {phase.steps.map((step, stepIndex) => {
                      const icon = step.icon ? processIcons[step.icon as keyof typeof processIcons] : '•';
                      return (
                        <div key={step.id} className="bg-white rounded-lg border p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">{icon}</span>
                            <h5 className="font-medium text-gray-800 text-sm">{step.title}</h5>
                          </div>
                          {step.duration && (
                            <span className="text-xs text-primary font-medium">{step.duration}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Deliverables and Client Involvement */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Deliverables */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <span>📋</span>
                      What You'll Receive
                    </h4>
                    <div className="bg-white rounded-lg border p-4 space-y-1">
                      {phase.steps.flatMap(step => step.deliverables).map((deliverable, index) => (
                        <DeliverableItem 
                          key={index} 
                          deliverable={deliverable} 
                          type="deliverable" 
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Client Involvement */}
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <span>🤝</span>
                      Your Involvement
                    </h4>
                    <div className="bg-white rounded-lg border p-4 space-y-1">
                      {phase.steps.flatMap(step => step.clientInvolvement).map((involvement, index) => (
                        <DeliverableItem 
                          key={index} 
                          deliverable={involvement} 
                          type="involvement" 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProcessTimeline({ 
  phases, 
  currentPhase, 
  completedPhases = [], 
  className 
}: ProcessTimelineProps) {
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set());
  
  const togglePhaseExpansion = (phaseId: string) => {
    const newExpanded = new Set(expandedPhases);
    if (newExpanded.has(phaseId)) {
      newExpanded.delete(phaseId);
    } else {
      newExpanded.add(phaseId);
    }
    setExpandedPhases(newExpanded);
  };
  
  return (
    <div className={cn("space-y-8", className)}>
      {/* Timeline Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Project Timeline & Deliverables
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Track your project's progress through each phase and understand exactly what to expect at every step. 
          Click on any phase to see detailed deliverables and your involvement.
        </p>
      </div>
      
      {/* Timeline */}
      <div className="max-w-4xl mx-auto">
        {phases.map((phase, phaseIndex) => {
          const isCompleted = completedPhases.includes(phase.id);
          const isActive = currentPhase === phase.id;
          const isExpanded = expandedPhases.has(phase.id);
          
          return (
            <TimelinePhase
              key={phase.id}
              phase={phase}
              phaseIndex={phaseIndex}
              isActive={isActive}
              isCompleted={isCompleted}
              isExpanded={isExpanded}
              onToggleExpand={() => togglePhaseExpansion(phase.id)}
            />
          );
        })}
      </div>
      
      {/* Timeline Legend */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Timeline Legend</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-gray-600">Completed Phase</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-primary"></div>
              <span className="text-gray-600">Current Phase</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-gray-300"></div>
              <span className="text-gray-600">Upcoming Phase</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}