import type {
  GetJourneys,
  JoinJourney,
  Journey,
  JourneyDetails,
  JourneyIdFromChatId,
  JourneyParticipant,
  JourneyParticipants,
  Journeys,
} from '../../domain/entities/journey.entity';
import { JourneyCategory } from '../../domain/entities/journey-category.entity';
import type { JourneyRepositoryPort } from '../../domain/repository/journey.repository';
import type { CreateJourneyParams, JourneyUsecase } from '../../domain/usecase/journey.usecase';

export class JourneyService implements JourneyUsecase {
  constructor(private db: JourneyRepositoryPort) {}

  async getCategories(): Promise<JourneyCategory[]> {
    return await this.db.getCategories();
  }

  async createJourney(params: CreateJourneyParams): Promise<Journey> {
    return await this.db.createJourney({ journey: params.journey });
  }

  async getJourneys(params: GetJourneys): Promise<Journeys> {
    return await this.db.getJourneys({ ...params });
  }

  async getJourneyById(id: number): Promise<JourneyDetails | null> {
    return await this.db.getJourneyById({ id });
  }

  async getCategoriesByJourneyId(journeyId: number, categories: JourneyCategory[]): Promise<JourneyCategory[]> {
    const allCategories = await this.db.getCategoriesByJourneyId(journeyId);

    return allCategories.filter((category) => categories.some((cat) => cat.id === category.id));
  }

  async joinJourney(params: JoinJourney): Promise<JourneyParticipant> {
    return await this.db.joinJourney(params);
  }

  async getJourneyParticipants(journeyId: number): Promise<JourneyParticipants> {
    return await this.db.getJourneyParticipants(journeyId);
  }

  async getJourneyIdFromChatId(chatId: number): Promise<JourneyIdFromChatId> {
    return await this.db.getJourneyIdFromChatId(chatId);
  }

  async getAllJourneyPartisipantIds(journeyId: number): Promise<number[]> {
    return await this.db.getAllJourneyPartisipantIds({ journeyId });
  }
}
