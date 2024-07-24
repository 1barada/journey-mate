import { PrismaClient } from '@prisma/client';

import { GoogleAuthService } from './googleAuth.service';

export function createGoogleAuthService(prisma: PrismaClient) {
  return new GoogleAuthService(prisma);
}
