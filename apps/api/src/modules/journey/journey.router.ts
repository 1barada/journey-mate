import { PermissionAction, PermissionEntity } from '@project/permissions';

import { authorizedProcedure, publicProcedure, router } from '../../trpc/trpc';

import type { CreateJourneyWithUserId } from './domain/entities/journey.entity';
import {
  CreateJourneySchema,
  GetCategoriesByJourneyIdResponseSchema,
  GetCategoriesByJourneyIdSchema,
  GetJourneyByIdResponseSchema,
  GetJourneyByIdSchema,
  GetJourneysSchema,
  JourneyParticipantSchema,
  JourneyParticipantsSchema,
  JourneySchema,
  JourneysSchema,
  MilestoneIdsSchema,
} from './domain/entities/journey.entity';
import { JourneyCategoryListSchema } from './domain/entities/journey-category.entity';
import { createJourneyService } from './service/journey/journey.factory';

export const journeyRouter = router({
  getCategories: authorizedProcedure({
    requiredAction: PermissionAction.Read,
    requiredEntity: PermissionEntity.Event,
  })
    .output(JourneyCategoryListSchema)
    .query(async ({ ctx }) => {
      const service = createJourneyService(ctx.db);

      return await service.getCategories();
    }),
  createJourney: authorizedProcedure({
    requiredAction: PermissionAction.Create,
    requiredEntity: PermissionEntity.Event,
  })
    .input(CreateJourneySchema)
    .output(JourneySchema)
    .mutation(async ({ input, ctx }) => {
      const service = createJourneyService(ctx.db);
      const userId = Number(ctx.userTokenData.userId);

      const journey: CreateJourneyWithUserId = { ...input, userId };

      return await service.createJourney({ journey });
    }),
  getJourneys: publicProcedure
    .input(GetJourneysSchema)
    .output(JourneysSchema)
    .query(async ({ input, ctx }) => {
      const service = createJourneyService(ctx.db);

      return await service.getJourneys(input);
    }),
  getJourneyById: publicProcedure
    .input(GetJourneyByIdSchema)
    .output(GetJourneyByIdResponseSchema)
    .query(async ({ input, ctx }) => {
      const service = createJourneyService(ctx.db);
      const journey = await service.getJourneyById(input.id);
      if (!journey) {
        throw new Error('Journey not found');
      }
      return journey;
    }),
  getCategoriesByJourneyId: publicProcedure
    .input(GetCategoriesByJourneyIdSchema)
    .output(GetCategoriesByJourneyIdResponseSchema)
    .query(async ({ input, ctx }) => {
      const service = createJourneyService(ctx.db);
      const categories = await service.getCategoriesByJourneyId(input.id, input.categories);
      return { categories };
    }),
  joinJourney: authorizedProcedure({
    requiredAction: PermissionAction.Create,
    requiredEntity: PermissionEntity.Event,
  })
    .input(MilestoneIdsSchema)
    .output(JourneyParticipantSchema)
    .mutation(async ({ input, ctx }) => {
      const service = createJourneyService(ctx.db);
      const userId = Number(ctx.userTokenData.userId);
      const params = { milestoneIds: input, userId: userId };

      return await service.joinJourney(params);
    }),
  getJourneyParticipants: authorizedProcedure({
    requiredAction: PermissionAction.Read,
    requiredEntity: PermissionEntity.Event,
  })
    .input(GetJourneyByIdSchema)
    .output(JourneyParticipantsSchema)
    .query(async ({ input, ctx }) => {
      const service = createJourneyService(ctx.db);

      return await service.getJourneyParticipants(input.id);
    }),
});
