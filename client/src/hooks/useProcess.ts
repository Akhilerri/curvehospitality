import { useState, useEffect } from 'react';
import { ProcessWorkflow, ProcessPhase } from '@shared/types/process';
import { mockProcessWorkflow } from '@/data/mockProcess';

interface UseProcessOptions {
  workflowId?: string;
}

interface UseProcessReturn {
  workflow: ProcessWorkflow | null;
  phases: ProcessPhase[];
  currentPhase?: string;
  completedPhases: string[];
  isLoading: boolean;
  error: string | null;
  setCurrentPhase: (phaseId: string) => void;
  markPhaseComplete: (phaseId: string) => void;
  markPhaseIncomplete: (phaseId: string) => void;
}

export function useProcess(options: UseProcessOptions = {}): UseProcessReturn {
  const [workflow, setWorkflow] = useState<ProcessWorkflow | null>(null);
  const [currentPhase, setCurrentPhase] = useState<string | undefined>();
  const [completedPhases, setCompletedPhases] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call to fetch process workflow
    const fetchWorkflow = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setWorkflow(mockProcessWorkflow);
        
        // Set default current phase to first phase if not specified
        if (!currentPhase && mockProcessWorkflow.phases.length > 0) {
          setCurrentPhase(mockProcessWorkflow.phases[0].id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load process workflow');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkflow();
  }, [options.workflowId]);

  const markPhaseComplete = (phaseId: string) => {
    setCompletedPhases(prev => {
      if (!prev.includes(phaseId)) {
        return [...prev, phaseId];
      }
      return prev;
    });
  };

  const markPhaseIncomplete = (phaseId: string) => {
    setCompletedPhases(prev => prev.filter(id => id !== phaseId));
  };

  const handleSetCurrentPhase = (phaseId: string) => {
    setCurrentPhase(phaseId);
  };

  return {
    workflow,
    phases: workflow?.phases || [],
    currentPhase,
    completedPhases,
    isLoading,
    error,
    setCurrentPhase: handleSetCurrentPhase,
    markPhaseComplete,
    markPhaseIncomplete,
  };
}

// Hook for getting process statistics
export function useProcessStats(workflow: ProcessWorkflow | null) {
  if (!workflow) {
    return {
      totalPhases: 0,
      totalSteps: 0,
      totalDeliverables: 0,
      estimatedDuration: null,
    };
  }

  const totalPhases = workflow.phases.length;
  const totalSteps = workflow.phases.reduce((sum, phase) => sum + phase.steps.length, 0);
  const totalDeliverables = workflow.phases.reduce(
    (sum, phase) => sum + phase.steps.reduce(
      (stepSum, step) => stepSum + step.deliverables.length, 0
    ), 0
  );

  return {
    totalPhases,
    totalSteps,
    totalDeliverables,
    estimatedDuration: workflow.totalDuration,
  };
}