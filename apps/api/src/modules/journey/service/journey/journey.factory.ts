import { PrismaClient } from '@prisma/client';

import { JourneyPostgresRepository } from '../../adapters/journey-postgres.repository';

import { JourneyService } from './journey.service';

export function createJourneyService(prisma: PrismaClient) {
  const journeyRepository = new JourneyPostgresRepository(prisma);

  return new JourneyService(journeyRepository);
}
