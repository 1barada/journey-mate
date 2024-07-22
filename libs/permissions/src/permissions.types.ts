import { PermissionAction, PermissionEntity, Role } from './permissions.enums';

export type PermissionActionKey = Lowercase<keyof typeof PermissionAction>;
export type PermissionEntityKey = Lowercase<keyof typeof PermissionEntity>;
export type RoleKey = Lowercase<keyof typeof Role>;
