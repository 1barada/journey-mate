import type { JourneyCategory } from '../entities/journey-category.entity';

import type {
  CreateJourneyWithUserId,
  GetJourneyByIdParams,
  GetJourneys,
  JoinJourney,
  Journey,
  JourneyDetails,
  JourneyParticipant,
  JourneyParticipants,
  Journeys,
  JourneyIdFromChatId,
} from './../entities/journey.entity';

export type CreateJourneyParams = { journey: CreateJourneyWithUserId };
export type CreateJourneyResult = Journey;
export type getAllJourneysResult = Journeys;
export type GetJourneysParams = GetJourneys;
export type JoinJourneyParams = JoinJourney;
export type JourneyParticipantsResult = JourneyParticipants;
export type JourneyParticipantResult = JourneyParticipant;

export interface GetAllJourneyPartisipantIdsParams {
  journeyId: number;
}

export type GetAllJourneyPartisipantIdsResult = number[];

export interface JourneyRepositoryPort {
  createJourney(params: CreateJourneyParams): Promise<CreateJourneyResult>;
  getCategories(): Promise<JourneyCategory[]>;
  getJourneys(params: GetJourneysParams): Promise<getAllJourneysResult>;
  getJourneyById(params: GetJourneyByIdParams): Promise<JourneyDetails | null>;
  joinJourney(params: JoinJourneyParams): Promise<JourneyParticipantResult>;
  getJourneyParticipants(journeyId: number): Promise<JourneyParticipantsResult>;
  getCategoriesByJourneyId(journeyId: number): Promise<JourneyCategory[]>;
  getJourneyIdFromChatId(chatId: number): Promise<JourneyIdFromChatId>;
  getAllJourneyPartisipantIds(params: GetAllJourneyPartisipantIdsParams): Promise<GetAllJourneyPartisipantIdsResult>;
}
