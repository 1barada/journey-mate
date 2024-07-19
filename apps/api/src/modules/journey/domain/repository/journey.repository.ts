import type { CreateJourneyWithUserId, Journey } from './../entities/journey.entity';

export type CreateJourneyParams = { journey: CreateJourneyWithUserId };
export type CreateJourneyResult = Journey;

export interface JourneyRepositoryPort {
  createJourney(params: CreateJourneyParams): Promise<CreateJourneyResult>;
}
