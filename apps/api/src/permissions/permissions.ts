export enum permissionAction {
  Read = 'read',
  Create = 'create',
  Join = 'join',
  Update = 'update',
  Delete = 'delete',
  Suspend = 'suspend',
}

export enum permissionEntity {
  Event = 'event',
  User = 'user',
}

export enum role {
  Admin = 'Admin',
  Guest = 'Guest',
  Viewer = 'Viewer',
  SuspendedViewer = 'SuspendedViewer',
}

export type permissionTableType = {
  [key in permissionAction]?: permissionEntity[];
};

export const permissionTable: Record<role, permissionTableType> = {
  Admin: {
    [permissionAction.Read]: [permissionEntity.User, permissionEntity.Event],
    [permissionAction.Create]: [permissionEntity.Event],
    [permissionAction.Join]: [permissionEntity.Event],
    [permissionAction.Update]: [permissionEntity.User, permissionEntity.Event],
    [permissionAction.Delete]: [permissionEntity.User, permissionEntity.Event],
    [permissionAction.Suspend]: [permissionEntity.User, permissionEntity.Event],
  },
  Viewer: {
    [permissionAction.Read]: [permissionEntity.Event, permissionEntity.User],
    [permissionAction.Create]: [permissionEntity.Event],
    [permissionAction.Join]: [permissionEntity.Event],
    [permissionAction.Update]: [permissionEntity.Event, permissionEntity.User],
    [permissionAction.Delete]: [permissionEntity.Event, permissionEntity.User],
  },
  Guest: {
    [permissionAction.Read]: [permissionEntity.User, permissionEntity.Event],
    [permissionAction.Create]: [permissionEntity.User],
  },
  SuspendedViewer: {
    [permissionAction.Read]: [permissionEntity.User, permissionEntity.Event],
  },
};
