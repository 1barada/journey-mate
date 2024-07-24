import { PrismaClient } from '@prisma/client';

import { UserPostgresRepository } from '../../adapters/user-postgres.repository';
import { ChangeDescriptionUsecase } from '../../domain/usecases/changeDescription.usecase';

import { ChangeDescriptionService } from './changeDescription.service';

export const createChangeDescriptionUsecase = (db: PrismaClient): ChangeDescriptionUsecase => {
  const userRepository = new UserPostgresRepository(db);
  return new ChangeDescriptionService(userRepository);
};
