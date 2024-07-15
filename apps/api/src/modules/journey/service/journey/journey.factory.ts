import { PrismaClient } from '@prisma/client';

import { JourneyPostgresRepository } from '../../adapters/journey-postgres.repository';

import { JourneyService } from './journey.service';

export function createJourneyService(prisma: PrismaClient) {
  const userRepository = new JourneyPostgresRepository(prisma);

  return new JourneyService(userRepository);
}
