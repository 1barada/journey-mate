import { PrismaClient } from '@prisma/client';

import { UserPostgresRepository } from '../../adapters/user-postgres.repository';
import { ChangeProfileDataUsecase } from '../../domain/usecases/changeUserProfile.usecase';

import { ChangeProfileDataServece } from './changeUserProfile.service';

export const createChangeUserProfileUsecase = (db: PrismaClient): ChangeProfileDataUsecase => {
  const userRepository = new UserPostgresRepository(db);
  return new ChangeProfileDataServece(userRepository);
};
