import { PrismaClient } from '@prisma/client';

import { NotificationPostgresRepository } from './../../adapters/notification-postgres.repository';
import { NotificationService } from './notification.service';

export function createNotificationService(prisma: PrismaClient) {
  const userRepository = new NotificationPostgresRepository(prisma);

  return new NotificationService(userRepository);
}
