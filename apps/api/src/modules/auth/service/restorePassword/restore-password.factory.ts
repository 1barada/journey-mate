import { PrismaClient } from '@prisma/client';
import { NodemailerTransporterType } from '@project/api/transporter';

import { UserPostgresRepository } from '../../../user/adapters/user-postgres.repository';
import { LoginNodemailerTransporter } from '../../adapters/restorePassword-nodemailer.transporter';

import { RestorePasswordService } from './restore-password.service';

export function createRestorePasswordService(prisma: PrismaClient, nodemailer: NodemailerTransporterType) {
  const userRepository = new UserPostgresRepository(prisma);
  const loginTransporter = new LoginNodemailerTransporter(nodemailer);

  return new RestorePasswordService(userRepository, loginTransporter);
}
