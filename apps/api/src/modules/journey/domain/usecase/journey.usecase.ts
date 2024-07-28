import type { CreateJourneyWithUserId, Journey, JourneyParticipantsFromChatId } from '../entities/journey.entity';
import type { JourneyCategory } from '../entities/journey-category.entity';

export interface CreateJourneyParams {
  journey: CreateJourneyWithUserId;
}

export interface JourneyUsecase {
  createJourney(params: CreateJourneyParams): Promise<Journey>;
  getCategories(): Promise<JourneyCategory[]>;
  getJourneyParticipantsFromChatId(chatId: number): Promise<JourneyParticipantsFromChatId>;
}
