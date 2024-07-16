import { PrismaClient } from '@prisma/client';

import {
  ConfirmUserAccountParams,
  CreateUserWithEmailParams,
  CreateUserWithEmailResult,
  FindUserByEmailParams,
  FindUserByEmailResult,
  UserRepositoryPort,
} from '../domain/repository/user.repository';

export class UserPostgresRepository implements UserRepositoryPort {
  constructor(private prisma: PrismaClient) {}

  async findUserByEmail(params: FindUserByEmailParams): Promise<FindUserByEmailResult> {
    const user = await this.prisma.user.findUnique({ where: { email: params.email } });
    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      authProvider: user.authProvider,
      passwordHash: user.passwordHash,
      active: user.active,
    };
  }

  async confirmUserAccount(params: ConfirmUserAccountParams): Promise<void> {
    await this.prisma.user.update({
      where: { id: params.id },
      data: {
        active: true,
      },
    });

    return;
  }

  async createUserWithEmail(params: CreateUserWithEmailParams): Promise<CreateUserWithEmailResult> {
    const user = await this.prisma.user.create({
      data: {
        email: params.email,
        passwordHash: params.passwordHash,
        authProvider: 'password',
        active: false,
      },
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      authProvider: user.authProvider,
    };
  }
}
