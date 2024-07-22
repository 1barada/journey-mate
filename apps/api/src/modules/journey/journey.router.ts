import { PermissionAction, PermissionEntity } from '@project/permissions';

import { authorizedProcedure, router } from '../../trpc/trpc';

import type { CreateJourneyWithUserId } from './domain/entities/journey.entity';
import { CreateJourneySchema, JourneySchema } from './domain/entities/journey.entity';
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
});
