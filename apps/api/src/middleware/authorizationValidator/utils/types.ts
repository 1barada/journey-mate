import { TRPCError } from '@trpc/server';

import {
  permissionAction,
  permissionEntity,
  permissionTable,
  permissionTableType,
  role,
} from './../../../permissions/permissions';

export interface roleValidatorProps {
  permissions: typeof permissionTable;
  userRole: keyof typeof permissionTable;
  Error: typeof TRPCError;
}

export interface actionsValidatorProps {
  role: (typeof permissionTable)[role];
  action: keyof permissionTableType;
  Error: typeof TRPCError;
}

export interface entitiesValidatorProps {
  action: (typeof permissionTable)[role][permissionAction];
  entity: permissionEntity;
  Error: typeof TRPCError;
}
