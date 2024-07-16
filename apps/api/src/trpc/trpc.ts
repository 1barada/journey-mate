import { authenticateMiddleware } from '../modules/auth/application/middleware/authenticate/authenticate.middleware';
import { authorizeMiddleware } from '../modules/auth/application/middleware/authorize/authorize.middleware';
import { authorizationMiddlewareProps } from '../modules/auth/application/middleware/authorize/types';

import { t } from './tprcInit';

export const router = t.router;

export const publicProcedure = t.procedure;

export const authenticateProcedure = t.procedure.use(authenticateMiddleware);

export const authorizedProcedure = ({ requiredAction, requiredEntity }: authorizationMiddlewareProps) =>
  authenticateProcedure.use(authorizeMiddleware({ requiredEntity, requiredAction }));
