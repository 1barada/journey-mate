import { JourneyStatus, NotificationType, PrismaClient } from '@prisma/client';
import pkg from 'lodash';

import { GetJourneyByIdParams, JourneyDetails, JourneyParticipantsFromChatId } from '../domain/entities/journey.entity';
import type { JourneyCategory } from '../domain/entities/journey-category.entity';
import type {
  CreateJourneyParams,
  CreateJourneyResult,
  getAllJourneysResult,
  GetJourneysParams,
  JoinJourneyParams,
  JourneyParticipantResult,
  JourneyParticipantsResult,
  JourneyRepositoryPort,
} from '../domain/repository/journey.repository';
const { groupBy } = pkg;

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
      },
    });

    if (journey) {
      await this.db.chat.create({
        data: {
          journeyId: journey.id,
        },
      });
    }

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

    const journeyUsersMilestones = milestones.map((milestone) => ({
      journeyId,
      userId: candidateJourney.userId,
      milestoneId: milestone.id,
      status: JourneyStatus.mainJourneyMilestone,
    }));
    await this.db.journeyUsersMilestone.createMany({
      data: journeyUsersMilestones,
    });

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

    const journeyUsersMilestones = await this.db.journeyUsersMilestone.findMany({
      where: {
        userId: user_id,
      },
    });

    if (journeyUsersMilestones) {
      whereClause.id = {
        in: journeyUsersMilestones.map((journeyUser) => journeyUser.journeyId),
      };
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
      participantsNumber: new Set(
        journey.journeyUsers
          .filter(
            (user) =>
              user.status == JourneyStatus.mainJourneyMilestone || user.status == JourneyStatus.approvedJoinMilestone
          )
          .map((user) => user.userId)
      ).size,
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
        chat: true,
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
      chatId: journey.chat ? journey.chat.id : undefined,
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

  async joinJourney(params: JoinJourneyParams): Promise<JourneyParticipantResult> {
    const { userId, milestoneIds } = params;

    const milestones = await this.db.milestone.findMany({
      where: {
        id: {
          in: milestoneIds,
        },
      },
      include: {
        journey: true,
      },
    });

    if (!milestones) {
      throw new Error(`Milestone with id ${milestoneIds[0]} not found`);
    }

    // find or  create notification
    const existingNotification = await this.db.notification.findFirst({
      where: {
        userId: milestones[0].journey.userId,
        journeyId: milestones[0].journeyId,
      },
    });

    const notification =
      existingNotification ||
      (await this.db.notification.create({
        data: {
          userId: milestones[0].journey.userId,
          journeyId: milestones[0].journeyId,
        },
      }));

    // create notification event
    await this.db.notificationEvent.create({
      data: {
        notificationId: notification.id,
        userId,
        type: NotificationType.joinRequest,
      },
    });

    const journeyUsersMilestones = milestoneIds.map((milestoneId) => ({
      journeyId: milestones[0].journeyId,
      userId,
      milestoneId,
      status: JourneyStatus.requestedToJoinMilestone,
    }));
    await this.db.journeyUsersMilestone.createMany({
      data: journeyUsersMilestones,
    });

    const resultMilestones = milestones.map((milestone) => ({
      id: milestone.id,
      title: milestone.title,
      coords: { lat: milestone.lat, lng: milestone.lng },
      dates: [milestone.startDate, milestone.endDate].filter((date) => date !== null) as Date[],
      status: JourneyStatus.requestedToJoinMilestone as string,
    }));

    return { participantId: userId, milestones: resultMilestones };
  }

  async getJourneyParticipants(journeyId: number): Promise<JourneyParticipantsResult> {
    const journey = await this.db.journey.findUnique({
      where: { id: journeyId },
      include: {
        journeyUsers: {
          include: {
            milestone: true,
            user: true,
          },
        },
      },
    });

    if (!journey) {
      return null;
    }

    const journeyUsers = journey.journeyUsers.filter(
      (journeyUser) => journeyUser.status != JourneyStatus.mainJourneyMilestone && journey.userId != journeyUser.user.id
    );

    const participantMilestones = journeyUsers.map((journeyUser) => {
      const startDate = journeyUser.milestone.startDate ? new Date(journeyUser.milestone.startDate) : undefined;
      const endDate = journeyUser.milestone.endDate ? new Date(journeyUser.milestone.endDate) : undefined;

      const transformedMilestone = {
        status: journeyUser.status as string,
        id: journeyUser.milestone.id,
        title: journeyUser.milestone.title,
        coords: {
          lat: journeyUser.milestone.lat,
          lng: journeyUser.milestone.lng,
        },
        dates: [startDate, endDate].filter((date) => date !== undefined) as Date[],
      };

      return {
        participantId: journeyUser.user.id,
        milestone: transformedMilestone,
      };
    });

    const groupedResult = groupBy(participantMilestones, 'participantId');
    const result = Object.entries(groupedResult).map(([key, value]) => {
      return {
        milestones: value.map((val) => val.milestone),
        participantId: Number(key),
      };
    });

    return result;
  }

  async getJourneyParticipantsFromChatId(chatId: number): Promise<JourneyParticipantsFromChatId> {
    const journey = await this.db.chat.findUniqueOrThrow({
      where: {
        id: chatId,
      },
      include: {
        journey: {
          select: {
            id: true,
            journeyUsers: {
              select: {
                userId: true,
              },
            },
          },
        },
      },
    });

    return {
      journeyId: journey.journeyId,
      participantIds: journey.journey.journeyUsers.map((user) => user.userId),
    };
  }
}
