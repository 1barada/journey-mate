import type { Journey, Journeys } from '../../domain/entities/journey.entity';
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

  async getJourneys(): Promise<Journeys> {
    return await this.db.getJourneys();
  }
}
