import { PrismaClient } from '@prisma/client';

import type {
  CreateJourneyParams,
  CreateJourneyResult,
  JourneyRepositoryPort,
} from '../domain/repository/journey.repository';

export class JourneyPostgresRepository implements JourneyRepositoryPort {
  constructor(private db: PrismaClient) {}

  async createJourney({ journey: dto }: CreateJourneyParams): Promise<CreateJourneyResult> {
    const { milestones: candidateMilestones, category: candidateCategory, ...candidateJourney } = dto;

    const journey = await this.db.journey.create({
      data: candidateJourney,
    });

    const categories = await this.db.journeyCategory.findMany({
      where: {
        value: { in: candidateCategory.map((category) => category.value) },
      },
    });

    const [milestones] = await Promise.all([
      this.db.milestone.createManyAndReturn({
        data: candidateMilestones.map((milestone) => ({
          ...milestone,
          journeyId: journey.id,
        })),
        select: {
          id: true,
          title: true,
          coords: true,
        },
      }),
      this.db.journeyToCategory.createMany({
        data: categories.map((category) => ({
          journeyId: journey.id,
          categoryId: category.id,
        })),
      }),
    ]);

    const result = {
      ...journey,
      milestones,
      category: categories,
    };

    return result;
  }
}
