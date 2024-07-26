import type { Category } from '../../components/CategoriesTagList/CategoriesTagList.types';
import type { Milestone } from '../../store/journey/types';

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
