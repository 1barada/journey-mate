import { initTRPC } from '@trpc/server';
import { ZodError } from 'zod';

import { authNMiddleware } from '../modules/auth/application/middleware/authN/authN.middleware';
import { authZMiddleware } from '../modules/auth/application/middleware/authZ/authZ.middleware';
import { authorizationValidatorProps } from '../modules/auth/application/middleware/authZ/types';

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
export const authProcedure = t.procedure.use(authNMiddleware);
export const roleProcedure = ({ requiredAction, requiredEntity }: authorizationValidatorProps) =>
  authProcedure.use(authZMiddleware({ requiredEntity, requiredAction }));
