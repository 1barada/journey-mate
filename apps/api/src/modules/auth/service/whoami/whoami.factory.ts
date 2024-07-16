import { PrismaClient } from '@prisma/client';
import { UserPostgresRepository } from '@project/api/modules/user/adapters/user-postgres.repository';

import { PermissionRepository } from '../../domain/repository/permissions.repository';

import { WhoamiService } from './whoami.service';

export function createWhoamiService(db: PrismaClient) {
  const userRepository = new UserPostgresRepository(db);
  const permissionRepository = new PermissionRepository();

  return new WhoamiService(userRepository, permissionRepository);
}
