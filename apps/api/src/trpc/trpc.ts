import { initTRPC } from '@trpc/server';
import { ZodError } from 'zod';

import { isAuthenticated } from './middleware/isAuthenticated';
import { isAuthorized } from './middleware/isAuthorized';
import { PermissionAction, PermissionEntity } from './permissions/permissions';
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
export const authProcedure = t.procedure.use(isAuthenticated);
export const roleProcedure = (permAction: PermissionAction, permEntity: PermissionEntity) =>
  authProcedure.use(isAuthorized(permEntity, permAction));
