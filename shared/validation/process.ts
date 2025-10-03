import { z } from 'zod';

export const processStepSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Step title is required'),
  description: z.string().min(1, 'Step description is required'),
  duration: z.string().optional(),
  deliverables: z.array(z.string()),
  clientInvolvement: z.array(z.string()),
  icon: z.string().optional(),
  orderIndex: z.number().min(0),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const processPhaseSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Phase title is required'),
  description: z.string().min(1, 'Phase description is required'),
  steps: z.array(processStepSchema),
  duration: z.string().optional(),
  orderIndex: z.number().min(0),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const processWorkflowSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Workflow title is required'),
  description: z.string().min(1, 'Workflow description is required'),
  phases: z.array(processPhaseSchema),
  totalDuration: z.string().optional(),
  overview: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const processTimelineSchema = z.object({
  phases: z.array(processPhaseSchema),
  currentPhase: z.string().optional(),
  completedPhases: z.array(z.string()).optional(),
});

export const processDeliverableSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Deliverable title is required'),
  description: z.string().min(1, 'Deliverable description is required'),
  phaseId: z.string(),
  type: z.enum(['document', 'presentation', 'prototype', 'approval', 'other']),
  isRequired: z.boolean(),
});

export const clientInvolvementSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Involvement title is required'),
  description: z.string().min(1, 'Involvement description is required'),
  phaseId: z.string(),
  type: z.enum(['meeting', 'review', 'approval', 'feedback', 'decision']),
  estimatedTime: z.string().optional(),
});

export type ProcessStep = z.infer<typeof processStepSchema>;
export type ProcessPhase = z.infer<typeof processPhaseSchema>;
export type ProcessWorkflow = z.infer<typeof processWorkflowSchema>;
export type ProcessTimeline = z.infer<typeof processTimelineSchema>;
export type ProcessDeliverable = z.infer<typeof processDeliverableSchema>;
export type ClientInvolvement = z.infer<typeof clientInvolvementSchema>;