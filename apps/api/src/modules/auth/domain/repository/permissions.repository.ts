import { PermissionAction, PermissionEntity, Role } from '@project/permissions';

export type permissionTableType = {
  [key in PermissionAction]?: PermissionEntity[];
};

export const permissionTable: Record<Role, permissionTableType> = {
  Admin: {
    [PermissionAction.Read]: [PermissionEntity.User, PermissionEntity.Event],
    [PermissionAction.Create]: [PermissionEntity.Event],
    [PermissionAction.Join]: [PermissionEntity.Event],
    [PermissionAction.Update]: [PermissionEntity.User, PermissionEntity.Event],
    [PermissionAction.Delete]: [PermissionEntity.User, PermissionEntity.Event],
    [PermissionAction.Suspend]: [PermissionEntity.User, PermissionEntity.Event],
  },
  Viewer: {
    [PermissionAction.Read]: [PermissionEntity.Event, PermissionEntity.User],
    [PermissionAction.Create]: [PermissionEntity.Event],
    [PermissionAction.Join]: [PermissionEntity.Event],
    [PermissionAction.Update]: [PermissionEntity.Event, PermissionEntity.User],
    [PermissionAction.Delete]: [PermissionEntity.Event, PermissionEntity.User],
  },
  Guest: {
    [PermissionAction.Read]: [PermissionEntity.User, PermissionEntity.Event],
    [PermissionAction.Create]: [PermissionEntity.User],
  },
  SuspendedViewer: {
    [PermissionAction.Read]: [PermissionEntity.User, PermissionEntity.Event],
  },
};

export class PermissionRepository {
  getPermissionsTable(): typeof permissionTable {
    return permissionTable;
  }
  getPermissionsByRole(role: Role): permissionTableType {
    return permissionTable[role] || permissionTable[Role.Guest];
  }
}

export interface PermissionRepositoryPort {
  getPermissionsByRole(role: Role): permissionTableType;
  getPermissionsTable(): typeof permissionTable;
}
