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
  Chat = 'chat',
  Notification = 'notification',
}

export enum Role {
  Admin = 'admin',
  Guest = 'guest',
  Viewer = 'viewer',
  SuspendedViewer = 'suspendedViewer',
}
