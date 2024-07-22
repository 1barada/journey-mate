import { PureAbility } from '@casl/ability';
import { PermissionActionKey, PermissionEntityKey } from '@project/permissions';
export interface User {
  name: string;
  email: string;
  sex: 'femail' | 'male' | null;
  description: string;
  age: number | null;
  avatar: string | null;
}

export type UserPermission = [PermissionActionKey, PermissionEntityKey[]];
export type UserAbility = PureAbility<[PermissionActionKey, PermissionEntityKey]>;
export interface AuthSlice {
  user: User | null;
  loading: boolean;
  error: null | string;
  token: string;
  isAuthenticated: boolean;
  permissions: UserPermission[];
  statusCode: number | null;
}
