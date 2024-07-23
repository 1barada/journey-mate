import type { JourneyCategory } from '../entities/journey-category.entity';

import type { CreateJourneyWithUserId, GetJourneys, Journey, Journeys } from './../entities/journey.entity';

export type CreateJourneyParams = { journey: CreateJourneyWithUserId };
export type CreateJourneyResult = Journey;
export type getAllJourneysResult = Journeys;
export type GetJourneysParams = GetJourneys;

export interface JourneyRepositoryPort {
  createJourney(params: CreateJourneyParams): Promise<CreateJourneyResult>;
  getCategories(): Promise<JourneyCategory[]>;
  getJourneys(params: GetJourneysParams): Promise<getAllJourneysResult>;
}
