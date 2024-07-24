import { PrismaClient } from '@prisma/client';

import type { JourneyCategory } from '../domain/entities/journey-category.entity';
import type {
  CreateJourneyParams,
  CreateJourneyResult,
  getAllJourneysResult,
  JourneyRepositoryPort,
} from '../domain/repository/journey.repository';

import {
  databaseMilestonesToMilestones,
  journeyToCategoryToDatabaseModel,
  milestonesToDatabaseModel,
} from './journey-postgres-repository.transform';

export class JourneyPostgresRepository implements JourneyRepositoryPort {
  constructor(private db: PrismaClient) {}

  async getCategories(): Promise<JourneyCategory[]> {
    return await this.db.journeyCategory.findMany({ select: { id: true, title: true, value: true } });
  }

  async createJourney({ journey: dto }: CreateJourneyParams): Promise<CreateJourneyResult> {
    const { milestones: candidateMilestones, category: candidateCategory, ...candidateJourney } = dto;

    const journey = await this.db.journey.create({
      data: {
        title: candidateJourney.title,
        description: candidateJourney.description,
        user: {
          connect: {
            id: candidateJourney.userId,
          },
        },
        chat: {
          create: true,
        },
      },
    });

    const categories = await this.db.journeyCategory.findMany({
      where: {
        value: { in: candidateCategory.map((category) => category.value) },
      },
    });

    const journeyId = journey.id;

    const [milestones] = await Promise.all([
      this.db.milestone.createManyAndReturn({
        data: milestonesToDatabaseModel({ milestones: candidateMilestones, journeyId }),
        select: {
          id: true,
          title: true,
          lat: true,
          lng: true,
          startDate: true,
          endDate: true,
        },
      }),
      this.db.journeyToCategory.createMany({
        data: journeyToCategoryToDatabaseModel({ categories, journeyId }),
      }),
    ]);

    const result = {
      ...journey,
      milestones: databaseMilestonesToMilestones({ milestones }),
      category: categories,
    } satisfies CreateJourneyResult;

    return result;
  }

  async getJourneys(): Promise<getAllJourneysResult> {
    const journeys = await this.db.journey.findMany({
      include: {
        journeyUsers: true,
        milestones: true,
        category: {
          include: {
            category: true,
          },
        },
      },
    });

    const result = journeys.map((journey) => ({
      ...journey,
      milestones: databaseMilestonesToMilestones({ milestones: journey.milestones }),
      category: [journey.category[0].category],
      participantsNumber: new Set(journey.journeyUsers.map((user) => user.userId)).size,
    }));

    return result;
  }
}
