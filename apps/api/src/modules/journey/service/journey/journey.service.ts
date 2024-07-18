import type { Journey } from '../../domain/entities/journey.entity';
import type { JourneyRepositoryPort } from '../../domain/repository/journey.repository';
import type { CreateJourneyParams, JourneyUsecase } from '../../domain/usecase/journey.usecase';

export class JourneyService implements JourneyUsecase {
  constructor(private db: JourneyRepositoryPort) {}

  async createJourney(params: CreateJourneyParams): Promise<Journey> {
    return await this.db.createJourney({ journey: params.journey });
  }
}
