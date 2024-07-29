import type { Category } from '../../components/CategoriesTagList/CategoriesTagList.types';
import type { Milestone } from '../../store/journey/types';

export interface JourneyDetails {
  id: number;
  userId: number;
  description: string;
  title: string;
  categories: Category[];
  milestones: Milestone[];
  chatId?: number;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Organizer {
  id: number;
  name: string | null;
  avatarUrl: string | null;
}

export interface ParticipantMilestones {
  participantId: number;
  milestones: Milestone[];
}
