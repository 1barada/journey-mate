import { PermissionAction, PermissionEntity, Role } from '@project/permissions';

export type permissionTableType = {
  [key in PermissionAction]?: PermissionEntity[];
};

export const permissionTable: Record<Role, permissionTableType> = {
  admin: {
    [PermissionAction.Read]: [
      PermissionEntity.User,
      PermissionEntity.Event,
      PermissionEntity.Chat,
      PermissionEntity.Notification,
    ],
    [PermissionAction.Create]: [PermissionEntity.Event, PermissionEntity.Chat, PermissionEntity.Notification],
    [PermissionAction.Join]: [PermissionEntity.Event],
    [PermissionAction.Update]: [PermissionEntity.User, PermissionEntity.Event],
    [PermissionAction.Delete]: [PermissionEntity.User, PermissionEntity.Event, PermissionEntity.Notification],
    [PermissionAction.Suspend]: [PermissionEntity.User, PermissionEntity.Event],
  },
  viewer: {
    [PermissionAction.Read]: [
      PermissionEntity.Event,
      PermissionEntity.User,
      PermissionEntity.Chat,
      PermissionEntity.Notification,
    ],
    [PermissionAction.Create]: [PermissionEntity.Event, PermissionEntity.Chat, PermissionEntity.Notification],
    [PermissionAction.Join]: [PermissionEntity.Event],
    [PermissionAction.Update]: [PermissionEntity.Event, PermissionEntity.User],
    [PermissionAction.Delete]: [PermissionEntity.Event, PermissionEntity.User, PermissionEntity.Notification],
  },
  guest: {
    [PermissionAction.Read]: [PermissionEntity.User, PermissionEntity.Event, PermissionEntity.Chat],
    [PermissionAction.Create]: [PermissionEntity.User],
  },
  suspendedViewer: {
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
