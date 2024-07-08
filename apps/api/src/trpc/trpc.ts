import { initTRPC } from '@trpc/server';
import { ZodError } from 'zod';

import { authorizationValidator } from '../middleware/authorizationValidator/authorizationValidator';
import { authValidator } from '../middleware/authValidator/authValidator';
import { permissionAction, permissionEntity } from '../permissions/permissions';

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
export const authProcedure = t.procedure.use(authValidator);
export const roleProcedure = (requiredAction: permissionAction, requiredEntity: permissionEntity) =>
  authProcedure.use(authorizationValidator({ requiredEntity, requiredAction }));
