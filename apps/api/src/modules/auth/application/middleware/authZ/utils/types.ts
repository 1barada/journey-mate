import {
  permissionAction,
  permissionEntity,
  permissionTable,
  permissionTableType,
  role,
} from '@project/api/permissions/permissions';

import { InvalidPermissionError } from '../../errors/invalid-permission.error';

export interface roleValidatorProps {
  permissions: typeof permissionTable;
  userRole: keyof typeof permissionTable;
  Error: typeof InvalidPermissionError;
}

export interface actionsValidatorProps {
  role: (typeof permissionTable)[role];
  action: keyof permissionTableType;
  Error: typeof InvalidPermissionError;
}

export interface entitiesValidatorProps {
  action: (typeof permissionTable)[role][permissionAction];
  entity: permissionEntity;
  Error: typeof InvalidPermissionError;
}
