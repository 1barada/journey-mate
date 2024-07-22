import type { Milestone as MilestoneDatabaseModel } from '@prisma/client';
import type { JourneyCategory as JourneyCategoryDatabaseModel } from '@prisma/client';
import type { JourneyToCategory as JourneyToCategoryDatabaseModel } from '@prisma/client';

import { CreateMilestone, Milestone } from '../domain/entities/milestone.entity';

interface MilestonesToDatabaseModelParams {
  milestones: CreateMilestone[];
  journeyId: number;
}
type CreateMilestoneDatabaseModel = Pick<
  MilestoneDatabaseModel,
  'journeyId' | 'lat' | 'lng' | 'startDate' | 'endDate' | 'title'
>;

export const milestonesToDatabaseModel = ({
  milestones,
  journeyId,
}: MilestonesToDatabaseModelParams): CreateMilestoneDatabaseModel[] => {
  return milestones.map((milestone) => {
    const { coords, dates, ...restMilestone } = milestone;
    const [startDate, endDate] = dates;

    return {
      ...restMilestone,
      lat: coords.lat,
      lng: coords.lng,
      journeyId,
      startDate,
      endDate,
    };
  });
};

interface JourneyToCategoryToDatabaseModelParams {
  categories: JourneyCategoryDatabaseModel[];
  journeyId: number;
}
type CreateJourneyToCategoryDatabaseModel = JourneyToCategoryDatabaseModel;

export const journeyToCategoryToDatabaseModel = ({
  categories,
  journeyId,
}: JourneyToCategoryToDatabaseModelParams): CreateJourneyToCategoryDatabaseModel[] => {
  return categories.map((category) => ({
    journeyId: journeyId,
    categoryId: category.id,
  }));
};

type PartialMilestoneDatabaseModel = Pick<
  MilestoneDatabaseModel,
  'id' | 'lat' | 'lng' | 'title' | 'startDate' | 'endDate'
>;
interface DatabaseMilestonesToDtoParams {
  milestones: PartialMilestoneDatabaseModel[];
}

export const databaseMilestonesToMilestones = ({ milestones }: DatabaseMilestonesToDtoParams): Milestone[] => {
  return milestones.map(({ lat, lng, startDate, endDate, ...milestone }) => {
    const dates = [startDate];

    if (endDate) {
      dates.push(endDate);
    }

    return {
      ...milestone,
      dates,
      coords: { lat, lng },
    };
  });
};
