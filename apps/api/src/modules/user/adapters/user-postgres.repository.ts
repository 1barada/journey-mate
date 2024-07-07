import { PrismaClient } from '@prisma/client';

import { FindUserByEmailParams, FindUserByEmailResult, UserRepositoryPort } from '../domain/repository/user.repository';

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
      password: user.password,
    };
  }
}
