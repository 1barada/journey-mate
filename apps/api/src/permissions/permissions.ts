export enum permissionActions {
  Read = 'read',
  Create = 'create',
  Join = 'join',
  Update = 'update',
  Delete = 'delete',
  Suspend = 'suspend',
}

export enum permissionEntities {
  Event = 'event',
  User = 'user',
}

export enum roles {
  Admin = 'admin',
  Guest = 'guest',
  Viewer = 'viewer',
  SuspendedViewer = 'suspendedViewer',
}

export type RolePermissionsType = {
  [key in permissionActions]?: permissionEntities[];
};

export const permissionTable: Record<roles, RolePermissionsType> = {
  admin: {
    [permissionActions.Read]: [permissionEntities.User, permissionEntities.Event],
    [permissionActions.Create]: [permissionEntities.Event],
    [permissionActions.Join]: [permissionEntities.Event],
    [permissionActions.Update]: [permissionEntities.User, permissionEntities.Event],
    [permissionActions.Delete]: [permissionEntities.User, permissionEntities.Event],
    [permissionActions.Suspend]: [permissionEntities.User, permissionEntities.Event],
  },
  viewer: {
    [permissionActions.Read]: [permissionEntities.Event, permissionEntities.User],
    [permissionActions.Create]: [permissionEntities.Event],
    [permissionActions.Join]: [permissionEntities.Event],
    [permissionActions.Update]: [permissionEntities.Event, permissionEntities.User],
    [permissionActions.Delete]: [permissionEntities.Event, permissionEntities.User],
  },
  guest: {
    [permissionActions.Read]: [permissionEntities.User, permissionEntities.Event],
    [permissionActions.Create]: [permissionEntities.User],
  },
  suspendedViewer: {
    [permissionActions.Read]: [permissionEntities.User, permissionEntities.Event],
  },
};
