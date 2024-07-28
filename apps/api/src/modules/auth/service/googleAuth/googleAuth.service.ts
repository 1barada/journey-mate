import { PrismaClient } from '@prisma/client';
import { config } from '@project/api/config';
import jwt from 'jsonwebtoken';

import { verifyGoogleToken } from '../../utils/verifyGoogleToken';

export class GoogleAuthService {
  private jwt = {
    secret: config.get('jwtSecret'),
    expiresIn: '20h',
  };

  constructor(private prisma: PrismaClient) {}

  async googleAuth(token: string) {
    const { email, name } = await verifyGoogleToken(token);

    if (!email) {
      throw new Error('Google token verification failed: email is missing');
    }

    let user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email,
          name: name || '',
          authProvider: 'socials',
          active: true,
        },
      });
    } else if (user.authProvider !== 'socials') {
      throw new Error('User registered with another method');
    }

    const accessToken = this.createAccessToken(user.id, user.email, user.role);

    return { user: { email: user.email, name: user.name || '' }, token: accessToken };
  }

  private createAccessToken(userId: number, email: string, role: string): string {
    return jwt.sign({ userId, userEmail: email, userRole: role }, this.jwt.secret, { expiresIn: this.jwt.expiresIn });
  }
}
