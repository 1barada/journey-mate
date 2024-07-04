import { TRPCError } from '@trpc/server';

import { t } from '../init';
import { Role, rolePermissions } from '../permissions/permissions';

export const isAuthorized = (permEntity, permAction) =>
  t.middleware(async ({ ctx, next }) => {
    const { role = Role.Guest } = ctx.userTokenData;

    if (role) {
      throw new TRPCError({
        message: 'user not authorized to perform this operation',
        code: 'FORBIDDEN',
      });
    }

    console.log(rolePermissions.Admin.create);

    return next();
  });
