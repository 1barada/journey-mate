import { Dayjs } from 'dayjs';

interface BaseSlice {
  loading: boolean;
  error: null | string;
}

export interface Milestone {
  title: string;
  dates: number[] | Dayjs[];
  coords: {
    lat: number;
    lng: number;
  };
}

export interface JourneySlice extends BaseSlice {
  journey: unknown;
  editUnsavedMilestone: Milestone | null;
}
