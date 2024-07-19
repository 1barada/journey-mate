import { t } from '../../../../../trpc/tprcInit';
import { createAuthenticationService } from '../../../service/authentication/authentication.factory';
import { InvalidTokenError } from '../errors/invalid-token.error';

export const authenticateMiddleware = t.middleware(async ({ ctx, next }) => {
  const authenticationService = createAuthenticationService();
  const accessToken = ctx.req.cookies['access-token'];
  if (!accessToken) {
    return next();
  }

  const tokenPayload = authenticationService.verifyToken(accessToken);
  if (tokenPayload.exp && Date.now() >= tokenPayload.exp * 1000) {
    throw new InvalidTokenError('Token expired');
  }

  if (!tokenPayload.userId || !tokenPayload.userRole || !tokenPayload.userEmail) {
    throw new InvalidTokenError('Invalid  token');
  }

  const { userId, userRole, userEmail } = tokenPayload;
  ctx.userTokenData = { userId, userRole, userEmail };
  return next();
});
