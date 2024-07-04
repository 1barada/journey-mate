export enum PermissionAction {
  Read = 'read',
  Create = 'create',
  Join = 'join',
  Update = 'update',
  Delete = 'delete',
  Suspend = 'suspend',
}

export enum PermissionEntity {
  Event = 'event',
  User = 'user',
}

export enum Role {
  Admin = 'Admin',
  Guest = 'Guest',
  Viewer = 'Viewer',
  SuspendedViewer = 'SuspendedViewer',
}

export type RolePermissionsType = {
  [key in PermissionAction]?: PermissionEntity[];
};

export const rolePermissions: Record<Role, RolePermissionsType> = {
  Admin: {
    [PermissionAction.Read]: [PermissionEntity.User, PermissionEntity.Event],
    [PermissionAction.Create]: [PermissionEntity.User, PermissionEntity.Event],
    [PermissionAction.Update]: [PermissionEntity.User, PermissionEntity.Event],
    [PermissionAction.Delete]: [PermissionEntity.User, PermissionEntity.Event],
    [PermissionAction.Suspend]: [PermissionEntity.User, PermissionEntity.Event],
    [PermissionAction.Join]: [PermissionEntity.Event],
  },
  Guest: {
    [PermissionAction.Read]: [PermissionEntity.User, PermissionEntity.Event],
  },
  Viewer: {
    [PermissionAction.Read]: [PermissionEntity.Event, PermissionEntity.User],
    [PermissionAction.Create]: [PermissionEntity.Event, PermissionEntity.User],
    [PermissionAction.Update]: [PermissionEntity.Event, PermissionEntity.User],
    [PermissionAction.Join]: [PermissionEntity.Event, PermissionEntity.User],
    [PermissionAction.Delete]: [PermissionEntity.Event, PermissionEntity.User],
  },
  SuspendedViewer: {
    [PermissionAction.Read]: [PermissionEntity.Event, PermissionEntity.User],
  },
};
