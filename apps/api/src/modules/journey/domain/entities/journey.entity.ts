import { z } from 'zod';

import { CreateJourneyCategorySchema, JourneyCategorySchema } from './journey-category.entity';
import { CreateMilestoneSchema, MilestoneSchema } from './milestone.entity';

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

export const MilestoneIdsSchema = z.array(z.number().int().positive());

export const JoinJourneySchema = z.object({
  milestoneIds: z.array(z.number().int().positive()),
  userId: z.number(),
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

export const JourneyParticipantSchema = z.object({
  participantId: z.number().int().positive(),
  milestones: z.array(MilestoneSchema),
});

export const JourneyParticipantsSchema = z.array(JourneyParticipantSchema).nullable();

export const GetJourneyByIdResponseSchema = z.object({
  id: z.number().int().positive(),
  userId: z.number().int().positive(),
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(500),
  milestones: z.array(MilestoneSchema).min(1),
});

export const GetCategoriesByJourneyIdSchema = z.object({
  id: z.number().int().positive(),
  categories: z.array(JourneyCategorySchema),
});

export const GetCategoriesByJourneyIdResponseSchema = z.object({
  categories: z.array(JourneyCategorySchema),
});

export const journeyParticipantsFromChatIdSchema = z.object({
  journeyId: z.number(),
  participantIds: z.array(z.number()),
});

export type Journey = z.infer<typeof JourneySchema>;
export type Journeys = z.infer<typeof JourneysSchema>;
export type CreateJourney = z.infer<typeof CreateJourneySchema>;
export type CreateJourneyWithUserId = z.infer<typeof CreateJourneyWithUserIdSchema>;
export type GetJourneys = z.infer<typeof GetJourneysSchema>;
export type GetJourneyByIdParams = z.infer<typeof GetJourneyByIdSchema>;
export type JourneyDetails = z.infer<typeof GetJourneyByIdResponseSchema>;
export type GetCategoriesByJourneyId = z.infer<typeof GetCategoriesByJourneyIdSchema>;
export type JourneyCategories = z.infer<typeof GetCategoriesByJourneyIdResponseSchema>;
export type JoinJourney = z.infer<typeof JoinJourneySchema>;
export type JourneyParticipants = z.infer<typeof JourneyParticipantsSchema>;
export type JourneyParticipant = z.infer<typeof JourneyParticipantSchema>;
export type JourneyParticipantsFromChatId = z.infer<typeof journeyParticipantsFromChatIdSchema>;
