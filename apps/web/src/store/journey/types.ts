import { Dayjs } from 'dayjs';

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
export type CreateMilestone = Omit<Milestone, 'id'>;

export interface JourneySlice extends BaseSlice {
  journey: unknown;
  editUnsavedMilestone: Milestone | null;
}
