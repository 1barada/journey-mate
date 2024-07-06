import { TRPCError } from '@trpc/server';

import {
  permissionActions,
  permissionEntities,
  permissionTable,
  RolePermissionsType,
  roles,
} from './../../../permissions/permissions';

export interface isRoleExistsProps {
  permissions: typeof permissionTable;
  userRole: keyof typeof permissionTable;
  Error: typeof TRPCError;
}

export interface roleHasActionsProps {
  role: (typeof permissionTable)[roles];
  action: keyof RolePermissionsType;
  Error: typeof TRPCError;
}

export interface roleHasEntitiesProps {
  action: (typeof permissionTable)[roles][permissionActions];
  entity: permissionEntities;
  Error: typeof TRPCError;
}
