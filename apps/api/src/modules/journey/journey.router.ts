import { publicProcedure, router } from '../../trpc/trpc';

import { CreateJourneyWithUserIdSchema, JourneySchema } from './domain/entities/journey.entity';
import { createJourneyService } from './service/journey/journey.factory';

export const journeyRouter = router({
  createJourney: publicProcedure
    .input(CreateJourneyWithUserIdSchema)
    .output(JourneySchema)
    .mutation(async ({ input, ctx }) => {
      const service = createJourneyService(ctx.db);

      return await service.createJourney({ journey: input });
    }),
});
