import { PrismaClient } from '@prisma/client';
import { UserPostgresRepository } from '@project/api/modules/user/adapters/user-postgres.repository';
import { NodemailerTransporterType } from '@project/api/transporter';

import { RegisterNodemailerTransporter } from '../../adapters/register-nodemailer.transporter';

import { RegisterService } from './register.service';

export function createRegisterService(prisma: PrismaClient, nodemailer: NodemailerTransporterType) {
  const userRepository = new UserPostgresRepository(prisma);
  const registerTransporter = new RegisterNodemailerTransporter(nodemailer);

  return new RegisterService(userRepository, registerTransporter);
}
