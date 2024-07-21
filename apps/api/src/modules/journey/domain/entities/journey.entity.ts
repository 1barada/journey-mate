import { z } from 'zod';

import { CreateJourneyCategorySchema, JourneyCategorySchema } from './journey-category.entity';
import { CreateMilestoneSchema } from './milestone.entity';

export const CreateJourneySchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1).max(500),
  milestones: z.array(CreateMilestoneSchema).min(1),
  category: z.array(CreateJourneyCategorySchema).min(1),
});

export const JourneySchema = CreateJourneySchema.omit({ category: true }).extend({
  category: z.array(JourneyCategorySchema),
  id: z.number(),
});
export const JourneysSchema = z.array(JourneySchema.extend({ participantsNumber: z.number() }));
export const CreateJourneyWithUserIdSchema = CreateJourneySchema.extend({
  userId: z.number(),
});

export type Journey = z.infer<typeof JourneySchema>;
export type Journeys = z.infer<typeof JourneysSchema>;
export type CreateJourney = z.infer<typeof CreateJourneySchema>;
export type CreateJourneyWithUserId = z.infer<typeof CreateJourneyWithUserIdSchema>;
