import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { UserPostgresRepository } from '../../adapters/user-postgres.repository';
import { UserNotFoundError } from '../errors/user-not-found.error';
import { UserRepositoryPort } from '../repository/user.repository';

export const ChangeDescriptionRequestSchema = z.object({
  id: z.number(),
  description: z.string().max(1000),
});

export type ChangeDescriptionRequest = z.infer<typeof ChangeDescriptionRequestSchema>;

export const ChangeDescriptionResponseSchema = z.object({
  id: z.number(),
  description: z.string(),
});

export type ChangeDescriptionResponse = z.infer<typeof ChangeDescriptionResponseSchema>;

export interface ChangeDescriptionUsecase {
  changeDescription(request: ChangeDescriptionRequest): Promise<ChangeDescriptionResponse>;
}

export class ChangeDescriptionService implements ChangeDescriptionUsecase {
  constructor(private userRepository: UserRepositoryPort) {}

  async changeDescription(request: ChangeDescriptionRequest): Promise<ChangeDescriptionResponse> {
    const user = await this.userRepository.findUserById({ id: request.id });
    if (!user) {
      throw new UserNotFoundError();
    }
    user.description = request.description;
    await this.userRepository.updateUser(user);
    return { id: user.id, description: user.description };
  }
}

export const createChangeDescriptionUsecase = (db: PrismaClient): ChangeDescriptionUsecase => {
  const userRepository = new UserPostgresRepository(db);
  return new ChangeDescriptionService(userRepository);
};
