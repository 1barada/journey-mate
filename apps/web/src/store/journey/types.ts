import { Dayjs } from 'dayjs';
import { z } from 'zod';

import { MilestoneSchema } from '../../components/MilestoneSelectZone/SearchLocationModal/useSearchLocationModal';

interface BaseSlice {
  loading: boolean;
  error: null | string;
}

export interface Milestone {
  id: number;
  title: string;
  dates: number[] | Dayjs[];
  coords: {
    lat: number;
    lng: number;
  };
}
export type CreateMilestone = Omit<Milestone, 'id' | 'dates'> & { dates: [number, number] };

export interface JourneySlice extends BaseSlice {
  journey: unknown;
  editUnsavedMilestone: Milestone | null;
}

export const CategorySchema = z.object({
  value: z.string().min(1, 'Journey category is required'),
  title: z.string().min(1, 'Journey category is required'),
  id: z.number().optional(),
});

export const NewJourneySchema = z.object({
  title: z.string().min(3, 'Must be at least 3 chars long'),
  category: z.array(CategorySchema).min(1, 'Journey category is required'),
  description: z.string().min(10, 'Must be at least 10 chars long'),
  milestones: z.array(MilestoneSchema).min(1, 'Journey must contain at least one location'),
});

export type NewJourneyValues = z.infer<typeof NewJourneySchema>;
export type NewJourneyFieldName = keyof NewJourneyValues;
export type JourneyCategory = z.infer<typeof CategorySchema>;
export type CreateCategory = Pick<JourneyCategory, 'value'>;
export type CreateJourney = Omit<NewJourneyValues, 'milestones' | 'category'> & {
  category: CreateCategory[];
  milestones: CreateMilestone[];
};
