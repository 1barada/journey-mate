import { PrismaClient } from '@prisma/client';

import { UserPostgresRepository } from '../../adapters/user-postgres.repository';
import { UpdateUserAvatarUsecase } from '../../domain/usecases/updateAvatar.usecase';

import { UpdateUserAvatarService } from './updateAvatar.service';

export const createUpdateAvatarUseCase = (db: PrismaClient): UpdateUserAvatarUsecase => {
  const userRepository = new UserPostgresRepository(db);

  return new UpdateUserAvatarService(userRepository);
};
