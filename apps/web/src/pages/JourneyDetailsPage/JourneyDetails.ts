import { Milestone } from '../../store/journey/types';

interface Category {
  id: number;
  title: string;
  value: string;
}

export interface JourneyDetails {
  id: number;
  userId: number;
  description: string;
  title: string;
  categories: Category[];
  milestones: Milestone[];
}

export interface Coordinates {
  lat: number;
  lng: number;
}
