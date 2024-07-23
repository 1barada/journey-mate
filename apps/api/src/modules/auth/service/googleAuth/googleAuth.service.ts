import { PrismaClient } from '@prisma/client';
import { config } from '@project/api/config';

import jwt from 'jsonwebtoken';
import { verifyGoogleToken } from '../../utils/verifyGoogleToken';

export class GoogleAuthService {
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

    const userResponse = {
      email: user.email,
      name: user.name || '',
    };

    const accessToken = this.createAccessToken(user.id, user.email);
    return { user: userResponse, token: accessToken };
  }

  private createAccessToken(userId: number, email: string): string {
    const token = jwt.sign({ userId: userId.toString(), email }, config.get('cookieSecret') as string, {
      expiresIn: '6h',
    });
    return token;
  }
}
