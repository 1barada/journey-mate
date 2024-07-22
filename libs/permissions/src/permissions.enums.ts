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
