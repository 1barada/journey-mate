import { z } from 'zod';

const PreprocessDateSchema = z.preprocess((value) => (typeof value === 'number' ? new Date(value) : value), z.date());
export const CreateMilestoneSchema = z.object({
  title: z.string().min(1).max(255),
  coords: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  dates: z.tuple([PreprocessDateSchema, PreprocessDateSchema.nullable()]),
});

export const MilestoneSchema = CreateMilestoneSchema.extend({
  id: z.number(),
});

export type Milestone = z.infer<typeof MilestoneSchema>;
export type CreateMilestone = z.infer<typeof CreateMilestoneSchema>;
