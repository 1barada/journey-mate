import { t } from '@project/api/trpc/trpc';

import { permissionTable } from '../../../domain/repository/permissions.repository';
import { createPermissionsService } from '../../../service/permissions/permissions.factory';
import { InvalidPermissionError } from '../errors/invalid-permission.error';

import { authorizationValidatorProps } from './types';
// type myType = Parameters<typeof t.middleware>;

export const authZMiddleware = ({ requiredEntity, requiredAction }: authorizationValidatorProps) =>
  t.middleware(async ({ ctx, next }) => {
    const permissionsService = createPermissionsService();
    const { userRole } = ctx.userTokenData;

    const existedRole = permissionsService.roleValidation({ userRole, permissions: permissionTable });
    if (!existedRole) {
      throw new InvalidPermissionError();
    }

    const roleActions = permissionsService.actionsValidator({ role: existedRole, action: requiredAction });
    if (!roleActions) {
      throw new InvalidPermissionError();
    }

    const roleEntities = permissionsService.entitiesValidator({ action: roleActions, entity: requiredEntity });
    if (!roleEntities) {
      throw new InvalidPermissionError();
    }

    return next();
  });
