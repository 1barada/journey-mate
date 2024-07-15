import { z } from 'zod';

export const CreateJourneyCategorySchema = z.object({
  value: z.string().min(1),
});
export const JourneyCategorySchema = CreateJourneyCategorySchema.extend({
  title: z.string().min(1),
  id: z.number(),
});

export type CreateJourneyCategory = z.infer<typeof CreateJourneyCategorySchema>;
export type JourneyCategory = z.infer<typeof JourneyCategorySchema>;
