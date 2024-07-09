import { PrismaClient } from '@prisma/client';

import { UserPostgresRepository } from '../../../user/adapters/user-postgres.repository';

import { LoginService } from './login.service';

export function createLoginService(prisma: PrismaClient) {
  const userRepository = new UserPostgresRepository(prisma);

  return new LoginService(userRepository);
}
