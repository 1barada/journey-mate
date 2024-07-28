import { PrismaClient } from '@prisma/client';

import { UserPostgresRepository } from '../../adapters/user-postgres.repository';
import { GetUserUsecase } from '../../domain/usecases/getUser.usecase';

import { GetUserService } from './getUser.service';

export const createGetUserUsecase = (db: PrismaClient): GetUserUsecase => {
  const userRepository = new UserPostgresRepository(db);
  return new GetUserService(userRepository);
};
