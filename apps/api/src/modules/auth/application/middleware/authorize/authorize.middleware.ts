import { t } from '@project/api/trpc/trpc';

import { permissionTable } from '../../../domain/repository/permissions.repository';
import { PermissionsService } from '../../../service/permissions/permissions.service';
import { InvalidPermissionError } from '../errors/invalid-permission.error';

import { authorizationMiddlewareProps } from './types';

export const authorizeMiddleware = ({ requiredEntity, requiredAction }: authorizationMiddlewareProps) =>
  t.middleware(async ({ ctx, next }) => {
    const permissionsService = new PermissionsService();
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
