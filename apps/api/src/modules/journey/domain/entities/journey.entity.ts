import { z } from 'zod';

import { CreateJourneyCategorySchema, JourneyCategorySchema } from './journey-category.entity';
import { CreateMilestoneSchema } from './milestone.entity';

export const CreateJourneySchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(500),
  milestones: z.array(CreateMilestoneSchema).min(1),
  category: z.array(CreateJourneyCategorySchema).min(1),
});

export const GetJourneysSchema = z.object({
  searchQuery: z.string().optional(),
  category: z.string().optional(),
  date: z.string().optional(),
  user_id: z.number().optional(),
  page: z.number().optional(),
});

export const JourneySchema = CreateJourneySchema.omit({ category: true }).extend({
  category: z.array(JourneyCategorySchema),
  id: z.number(),
});

export const JourneysSchema = z.object({
  journeys: z.array(JourneySchema.extend({ participantsNumber: z.number() })),
  totalPages: z.number().optional(),
});

export const CreateJourneyWithUserIdSchema = CreateJourneySchema.extend({
  userId: z.number(),
});

export const GetJourneyByIdSchema = z.object({
  id: z.number().int().positive(),
});

export const GetJourneyByIdResponseSchema = z.object({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(500),
  milestones: z.array(CreateMilestoneSchema).min(1),
});

export type Journey = z.infer<typeof JourneySchema>;
export type Journeys = z.infer<typeof JourneysSchema>;
export type CreateJourney = z.infer<typeof CreateJourneySchema>;
export type CreateJourneyWithUserId = z.infer<typeof CreateJourneyWithUserIdSchema>;
export type GetJourneys = z.infer<typeof GetJourneysSchema>;
export type GetJourneyByIdParams = z.infer<typeof GetJourneyByIdSchema>;
export type JourneyDetails = z.infer<typeof GetJourneyByIdResponseSchema>;
