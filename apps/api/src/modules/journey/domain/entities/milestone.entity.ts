import { z } from 'zod';

export const CreateMilestoneSchema = z.object({
  title: z.string().min(1).max(255),
  coords: z.string().min(1),
});

export const MilestoneSchema = CreateMilestoneSchema.extend({
  id: z.number(),
});

export type Milestone = z.infer<typeof MilestoneSchema>;
export type CreateMilestone = z.infer<typeof CreateMilestoneSchema>;
