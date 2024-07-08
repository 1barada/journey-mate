import { TRPCError } from '@trpc/server';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { config } from '../../config';
import { t } from '../../trpc/init';

export const authValidator = t.middleware(async ({ ctx, next }) => {
  const accessTokenCookie = ctx.req.cookies['access-token'];
  if (!accessTokenCookie) {
    throw new TRPCError({
      message: 'Access token not provided via cookie with access-token name',
      code: 'UNAUTHORIZED',
    });
  }

  const ts = config.get('tokenSecret');
  if (!ts) {
    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
  }

  try {
    const tokenPayload = jwt.verify(accessTokenCookie, ts) as JwtPayload;
    if (!tokenPayload || !tokenPayload.userId || !tokenPayload.userRole) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
      });
    }

    if (tokenPayload.exp && Date.now() >= tokenPayload.exp * 1000) {
      throw new TRPCError({
        message: 'token expired',
        code: 'UNAUTHORIZED',
      });
    }

    const { userId, userRole } = tokenPayload;
    ctx.userTokenData = { userId, userRole };
  } catch {
    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
  }
  return next();
});
