import { TRPCError } from '@trpc/server';

import { permissionTable } from '../../permissions/permissions';
import { t } from '../../trpc/init';

import { isRoleExists } from './utils/isRoleExists';
import { roleHasActions } from './utils/roleHasAction';
import { roleHasEntities } from './utils/roleHasEntities';
import { isAuthorizedProps } from './types';

export const isAuthorized = ({ requiredEntity, requiredAction }: isAuthorizedProps) =>
  t.middleware(async ({ ctx, next }) => {
    const { userRole } = ctx.userTokenData;
    if (!userRole) {
      throw new TRPCError({
        message: 'user not authorized to perform this operation',
        code: 'FORBIDDEN',
      });
    }

    const existedRole = isRoleExists({ permissions: permissionTable, userRole, Error: TRPCError });

    const roleActions = roleHasActions({ role: existedRole, action: requiredAction, Error: TRPCError });

    roleHasEntities({ action: roleActions, entity: requiredEntity, Error: TRPCError });

    return next();
  });
