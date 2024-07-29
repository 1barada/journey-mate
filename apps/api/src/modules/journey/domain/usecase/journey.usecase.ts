import type { CreateJourneyWithUserId, Journey, JourneyIdFromChatId } from '../entities/journey.entity';
import type { JourneyCategory } from '../entities/journey-category.entity';

export interface CreateJourneyParams {
  journey: CreateJourneyWithUserId;
}

export interface JourneyUsecase {
  createJourney(params: CreateJourneyParams): Promise<Journey>;
  getCategories(): Promise<JourneyCategory[]>;
  getJourneyIdFromChatId(chatId: number): Promise<JourneyIdFromChatId>;
  getAllJourneyPartisipantIds(journeyId: number): Promise<number[]>;
}
