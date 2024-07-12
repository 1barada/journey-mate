import { t } from '@project/api/trpc/tprcInit';
import { AuthenticateService } from '../../../service/authentication/authentication.service';
import { InvalidTokenError } from '../errors/invalid-token.error';
import { TokenNotProvidedError } from '../errors/token-not-provided.error';

export const authenticateMiddleware = t.middleware(async ({ ctx, next }) => {
  const authenticationService = new AuthenticateService();
  const accessToken = ctx.req.cookies['access-token'];
  if (!accessToken) {
    throw new TokenNotProvidedError();
  }

  const tokenPayload = authenticationService.verifyToken(accessToken);
  if (tokenPayload.exp && Date.now() >= tokenPayload.exp * 1000) {
    throw new InvalidTokenError('Token expired');
  }

  if (!tokenPayload.userId || !tokenPayload.userRole || !tokenPayload.userEmail) {
    return next();
  }
  const { userId, userRole, userEmail } = tokenPayload;
  ctx.userTokenData = { userId, userRole, userEmail };
  return next();
});
