import React, { useState } from 'react';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { ProcessWorkflowVisualization } from '@/components/sections/ProcessWorkflowVisualization';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { useProcess, useProcessStats } from '@/hooks/useProcess';

export function ProcessDemo() {
  const { 
    workflow, 
    phases,
    currentPhase, 
    completedPhases, 
    isLoading, 
    error,
    setCurrentPhase,
    markPhaseComplete,
    markPhaseIncomplete
  } = useProcess();

  const stats = useProcessStats(workflow);
  const [demoMode, setDemoMode] = useState<'full' | 'workflow' | 'timeline'>('full');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading process components...</p>
        </div>
      </div>
    );
  }

  if (error || !workflow) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Demo Error</h2>
          <p className="text-gray-600">{error || 'Process workflow not available'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Demo Header */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Process Section Demo
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Interactive demonstration of the process workflow and timeline components
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">{stats.totalPhases}</div>
                <div className="text-sm text-gray-600">Phases</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">{stats.totalSteps}</div>
                <div className="text-sm text-gray-600">Steps</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">{stats.totalDeliverables}</div>
                <div className="text-sm text-gray-600">Deliverables</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-2xl font-bold text-primary">{stats.estimatedDuration}</div>
                <div className="text-sm text-gray-600">Duration</div>
              </div>
            </div>
            
            {/* Demo Mode Toggle */}
            <div className="inline-flex bg-white rounded-lg p-1 shadow-sm">
              <button
                onClick={() => setDemoMode('full')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  demoMode === 'full' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Full Section
              </button>
              <button
                onClick={() => setDemoMode('workflow')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  demoMode === 'workflow' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Workflow Only
              </button>
              <button
                onClick={() => setDemoMode('timeline')}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  demoMode === 'timeline' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Timeline Only
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Controls */}
      {demoMode === 'timeline' && (
        <div className="bg-muted/30 py-6">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h3 className="font-semibold mb-4">Timeline Demo Controls</h3>
              <div className="flex flex-wrap gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Current Phase:</label>
                  <select 
                    value={currentPhase || ''} 
                    onChange={(e) => setCurrentPhase(e.target.value)}
                    className="px-3 py-2 border rounded-md"
                  >
                    <option value="">None</option>
                    {phases.map(phase => (
                      <option key={phase.id} value={phase.id}>{phase.title}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Completed Phases:</label>
                <div className="flex flex-wrap gap-2">
                  {phases.map(phase => (
                    <button
                      key={phase.id}
                      onClick={() => 
                        completedPhases.includes(phase.id) 
                          ? markPhaseIncomplete(phase.id)
                          : markPhaseComplete(phase.id)
                      }
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        completedPhases.includes(phase.id)
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {phase.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Demo Content */}
      <div className="container mx-auto px-4 py-16">
        {demoMode === 'full' && (
          <ProcessSection 
            workflow={workflow}
            currentPhase={currentPhase}
            completedPhases={completedPhases}
          />
        )}
        
        {demoMode === 'workflow' && (
          <ProcessWorkflowVisualization workflow={workflow} />
        )}
        
        {demoMode === 'timeline' && (
          <ProcessTimeline 
            phases={phases}
            currentPhase={currentPhase}
            completedPhases={completedPhases}
          />
        )}
      </div>
    </div>
  );
}