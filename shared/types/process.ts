import { BaseEntity, ImageMetadata, CallToAction } from './common';

export interface ProcessStep extends BaseEntity {
  title: string;
  description: string;
  duration?: string;
  deliverables: string[];
  clientInvolvement: string[];
  icon?: string;
  orderIndex: number;
}

export interface ProcessPhase extends BaseEntity {
  title: string;
  description: string;
  steps: ProcessStep[];
  duration?: string;
  orderIndex: number;
}

export interface ProcessWorkflow extends BaseEntity {
  title: string;
  description: string;
  phases: ProcessPhase[];
  totalDuration?: string;
  overview?: string;
}

export interface ProcessTimeline {
  phases: ProcessPhase[];
  currentPhase?: string;
  completedPhases?: string[];
}

export interface ProcessDeliverable {
  id: string;
  title: string;
  description: string;
  phaseId: string;
  type: 'document' | 'presentation' | 'prototype' | 'approval' | 'other';
  isRequired: boolean;
}

export interface ClientInvolvement {
  id: string;
  title: string;
  description: string;
  phaseId: string;
  type: 'meeting' | 'review' | 'approval' | 'feedback' | 'decision';
  estimatedTime?: string;
}