import { PrismaClient } from '@prisma/client';

import { GetJourneyByIdParams, JourneyDetails } from '../domain/entities/journey.entity';
import type { JourneyCategory } from '../domain/entities/journey-category.entity';
import type {
  CreateJourneyParams,
  CreateJourneyResult,
  getAllJourneysResult,
  GetJourneysParams,
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
          create: {},
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

  async getJourneys(params: GetJourneysParams): Promise<getAllJourneysResult> {
    const { searchQuery, category, date, page, user_id } = params;
    const whereClause: any = {};
    const pageSize = 12;
    const currentPage = page || 1;
    let totalPages = 1;

    if (searchQuery) {
      whereClause.OR = [
        { title: { contains: searchQuery, mode: 'insensitive' } },
        { description: { contains: searchQuery, mode: 'insensitive' } },
      ];
    }

    if (user_id) {
      whereClause.userId = user_id;
    }

    const journeys = await this.db.journey.findMany({
      where: whereClause,
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

    let result = journeys.map((journey) => ({
      ...journey,
      milestones: databaseMilestonesToMilestones({ milestones: journey.milestones }),
      category: [journey.category[0].category],
      participantsNumber: new Set(journey.journeyUsers.map((user) => user.userId)).size,
    }));

    if (category && category !== 'all') {
      result = result.filter((journey) => journey.category[0].title === category);
    }

    if (date) {
      result = result.filter((journey) => journey.milestones[0].dates[0].getTime() >= Date.parse(date));
    }

    result.sort((a, b) => a.milestones[0].dates[0].getTime() - b.milestones[0].dates[0].getTime());

    totalPages = Math.ceil(result.length / pageSize);
    result = result.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return { journeys: result, totalPages: totalPages };
  }

  async getJourneyById({ id }: GetJourneyByIdParams): Promise<JourneyDetails | null> {
    const journey = await this.db.journey.findUnique({
      where: { id },
      include: {
        milestones: true,
        category: true,
        journeyUsers: true,
      },
    });

    if (!journey) {
      return null;
    }

    const transformedMilestones = journey.milestones.map((milestone) => {
      const startDate = milestone.startDate ? new Date(milestone.startDate) : undefined;
      const endDate = milestone.endDate ? new Date(milestone.endDate) : undefined;

      return {
        id: milestone.id,
        title: milestone.title,
        coords: {
          lat: milestone.lat,
          lng: milestone.lng,
        },
        dates: [startDate, endDate].filter((date) => date !== undefined) as Date[],
      };
    });

    return {
      id: journey.id,
      userId: journey.userId,
      title: journey.title,
      description: journey.description,
      milestones: transformedMilestones,
    };
  }

  async getCategoriesByJourneyId(journeyId: number): Promise<JourneyCategory[]> {
    const journeyToCategories = await this.db.journeyToCategory.findMany({
      where: { journeyId },
    });

    if (journeyToCategories.length === 0) {
      throw new Error('Categories for the journey not found');
    }

    const categoryIds = journeyToCategories.map((relation) => relation.categoryId);

    const categories = await this.db.journeyCategory.findMany({
      where: {
        id: { in: categoryIds },
      },
    });

    return categories.map((cat) => ({
      id: cat.id,
      title: cat.title,
      value: cat.value,
    }));
  }
}
