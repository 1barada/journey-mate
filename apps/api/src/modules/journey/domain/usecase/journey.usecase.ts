import { CreateJourneyWithUserId, Journey } from '../entities/journey.entity';

export interface CreateJourneyParams {
  journey: CreateJourneyWithUserId;
}

export interface JourneyUsecase {
  createJourney(params: CreateJourneyParams): Promise<Journey>;
}
