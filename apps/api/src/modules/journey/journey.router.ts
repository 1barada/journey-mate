import { authorizedProcedure, router } from '../../trpc/trpc';
import { PermissionAction, PermissionEntity } from '../auth/domain/enums/permissions.enums';

import { CreateJourneyWithUserIdSchema, JourneySchema } from './domain/entities/journey.entity';
import { createJourneyService } from './service/journey/journey.factory';

export const journeyRouter = router({
  createJourney: authorizedProcedure({
    requiredAction: PermissionAction.Create,
    requiredEntity: PermissionEntity.Event,
  })
    .input(CreateJourneyWithUserIdSchema)
    .output(JourneySchema)
    .mutation(async ({ input, ctx }) => {
      const service = createJourneyService(ctx.db);

      return await service.createJourney({ journey: input });
    }),
});
