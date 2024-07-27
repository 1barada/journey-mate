import { PrismaClient } from '@prisma/client';

import { UserWithPassword } from '../domain/entities/user.entity';
import {
  ConfirmUserAccountParams,
  CreateUserWithEmailParams,
  CreateUserWithEmailResult,
  FindUserByEmailParams,
  FindUserByEmailResult,
  FindUserByIdParams,
  FindUserByIdResult,
  SetRestoreTokenParams,
  SetRestoreTokenResult,
  UpdateUserPasswordParams,
  UpdateUserPasswordResult,
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
      avatarUrl: user.avatarUrl,
      description: user.description,
      authProvider: user.authProvider,
      passwordHash: user.passwordHash,
      active: user.active,
      sex: user.sex,
      age: user.dateOfBirth && this.calculateAge(user.dateOfBirth),
      dateOfBirth: user.dateOfBirth,
      restoreToken: user.restoreToken,
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
      avatarUrl: user.avatarUrl,
      authProvider: user.authProvider,
      age: user.dateOfBirth && this.calculateAge(user.dateOfBirth),
      description: user.description,
      sex: user.sex,
      dateOfBirth: user.dateOfBirth,
      restoreToken: user.restoreToken,
    };
  }

  async findUserById(params: FindUserByIdParams): Promise<FindUserByIdResult> {
    const user = await this.prisma.user.findUnique({ where: { id: params.id } });
    if (!user) return null;
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      avatarUrl: user.avatarUrl,
      description: user.description,
      authProvider: user.authProvider,
      passwordHash: user.passwordHash,
      active: user.active,
      sex: user.sex,
      age: user.dateOfBirth && this.calculateAge(user.dateOfBirth),
      dateOfBirth: user.dateOfBirth,
      restoreToken: user.restoreToken,
    };
  }

  async updateUser(user: UserWithPassword): Promise<void> {
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        description: user.description,
      },
    });
  }

  async updateUserData(user: UserWithPassword): Promise<void> {
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        sex: user.sex,
        dateOfBirth: user.dateOfBirth,
        email: user.email,
      },
    });
  }

  async updateUserAvatar(user: UserWithPassword): Promise<void> {
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        avatarUrl: user.avatarUrl,
      },
    });
  }

  async setRestoreToken(params: SetRestoreTokenParams): Promise<SetRestoreTokenResult> {
    await this.prisma.user.update({
      where: { id: Number(params.id) },
      data: {
        restoreToken: params.restoreToken,
      },
    });
  }

  async updateUserPassword(params: UpdateUserPasswordParams): Promise<UpdateUserPasswordResult> {
    const user = await this.prisma.user.update({
      where: { id: Number(params.id) },
      data: {
        passwordHash: params.passwordHash,
      },
    });

    return {
      email: user.email,
      name: user.name,
    };
  }

  // https://www.w3resource.com/javascript-exercises/javascript-date-exercise-18.php
  private calculateAge(dateOfBirth: Date) {
    const diff_ms = Date.now() - dateOfBirth.getTime();
    const age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  }
}
