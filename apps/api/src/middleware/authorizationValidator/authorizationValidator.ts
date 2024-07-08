import { TRPCError } from '@trpc/server';

import { permissionTable } from '../../permissions/permissions';
import { t } from '../../trpc/init';

import { actionsValidator } from './utils/actionsValidator';
import { entitiesValidator } from './utils/entitiesValidator';
import { roleValidator } from './utils/roleValidator';
import { authorizationValidatorProps } from './types';

export const authorizationValidator = ({ requiredEntity, requiredAction }: authorizationValidatorProps) =>
  t.middleware(async ({ ctx, next }) => {
    const { userRole } = ctx.userTokenData;
    if (!userRole) {
      throw new TRPCError({
        message: 'user not authorized to perform this operation',
        code: 'FORBIDDEN',
      });
    }

    const existedRole = roleValidator({ permissions: permissionTable, userRole, Error: TRPCError });

    const roleActions = actionsValidator({ role: existedRole, action: requiredAction, Error: TRPCError });

    entitiesValidator({ action: roleActions, entity: requiredEntity, Error: TRPCError });

    return next();
  });
