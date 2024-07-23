import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

import { UserPostgresRepository } from '../../adapters/user-postgres.repository';
import { UserNotFoundError } from '../errors/user-not-found.error';
import { UserRepositoryPort } from '../repository/user.repository';

const dateOfBirthSchema = z.preprocess((arg) => {
  if (typeof arg === 'string' || arg instanceof Date) {
    return new Date(arg);
  }
  return arg;
}, z.date().nullable());

export const ChangeProfileRequestSchema = z.object({
  name: z.string(),
  dateOfBirth: dateOfBirthSchema,
  email: z.string().email(),
  sex: z.enum(['female', 'male']).nullable(),
  id: z.number(),
});

export type ChangeProfileRequest = z.infer<typeof ChangeProfileRequestSchema>;

export const ChangeProfileResponseSchema = z.object({
  name: z.string(),
  dateOfBirth: z.date().nullable(),
  email: z.string().email(),
  sex: z.enum(['female', 'male']).nullable(),
});

export const ChangeProfileRequestInput = z.object({
  name: z.string(),
  dateOfBirth: dateOfBirthSchema,
  email: z.string().email(),
  sex: z.enum(['female', 'male']).nullable(),
});

export type ChangeProfileResponse = z.infer<typeof ChangeProfileResponseSchema>;

export interface ChangeProfileDataUsecase {
  changeProfileData(request: ChangeProfileRequest): Promise<ChangeProfileResponse>;
}

export class ChangeProfileDataServece implements ChangeProfileDataUsecase {
  constructor(private userRepository: UserRepositoryPort) {}

  async changeProfileData(request: ChangeProfileRequest): Promise<ChangeProfileResponse> {
    const user = await this.userRepository.findUserById({ id: request.id });

    if (!user) {
      throw new UserNotFoundError();
    }
    console.log('user:', user);
    user.email = request.email;
    user.name = request.name;
    user.dateOfBirth = request.dateOfBirth ?? user.dateOfBirth;
    user.sex = request.sex ?? user.sex;
    await this.userRepository.updateUserData(user);

    return { email: user.email, name: user.name, sex: user.sex, dateOfBirth: user.dateOfBirth };
  }
}

export const createChangeUserProfileUsecase = (db: PrismaClient): ChangeProfileDataUsecase => {
  const userRepository = new UserPostgresRepository(db);
  return new ChangeProfileDataServece(userRepository);
};
