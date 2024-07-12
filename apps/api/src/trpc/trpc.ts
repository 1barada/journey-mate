import { initTRPC } from '@trpc/server';
import { ZodError } from 'zod';

import { authenticateMiddleware } from '../modules/auth/application/middleware/authenticate/authenticate.middleware';
import { authorizeMiddleware } from '../modules/auth/application/middleware/authorize/authorize.middleware';
import { authorizationMiddlewareProps } from '../modules/auth/application/middleware/authorize/types';

import { Context } from './context';

export const t = initTRPC.context<Context>().create({
  errorFormatter(opts) {
    const { shape, error } = opts;

    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.code === 'BAD_REQUEST' && error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const router = t.router;

export const publicProcedure = t.procedure;

export const publicRoleProcedure = ({ requiredAction, requiredEntity }: authorizationMiddlewareProps) =>
  t.procedure.use(authorizeMiddleware({ requiredEntity, requiredAction }));

export const authenticateProcedure = t.procedure.use(authenticateMiddleware);

export const authorizedProcedure = ({ requiredAction, requiredEntity }: authorizationMiddlewareProps) =>
  authenticateProcedure.use(authorizeMiddleware({ requiredEntity, requiredAction }));
