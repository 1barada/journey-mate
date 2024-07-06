import { TRPCError } from '@trpc/server';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { t } from '../../trpc/init';

// TODO: remove before PR
const tempSecretKey = '1A2daA231aAS2313';

export const isAuthenticated = t.middleware(async ({ ctx, next }) => {
  const { cookies = [] } = ctx.req.cookies;

  const token = cookies['access-token'];

  if (!token) {
    throw new TRPCError({
      message: 'Access token not provided via cookie with access-token name',
      code: 'UNAUTHORIZED',
    });
  }

  try {
    // TODO: remove before PR
    if (!tempSecretKey) {
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
    }

    const tokenPayload = jwt.verify(token, tempSecretKey) as JwtPayload;
    if (!tokenPayload) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
      });
    }

    if (Date.now() >= tokenPayload.exp * 1000) {
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
