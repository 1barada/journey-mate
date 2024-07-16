// FIXME: change IAuthSlice to AuthSlice

import { PureAbility } from '@casl/ability';
import {
  PermissionAction as PermissionActionEnum,
  PermissionEntity as PermissionEntityEnum,
} from '@project/api/modules/auth/domain/enums/permissions.enums';

export interface User {
  name: string;
  email: string;
  sex: 'femail' | 'male' | null;
  description: string;
  age: number | null;
  avatar: string | null;
}

export type PermissionActionName = Lowercase<keyof typeof PermissionActionEnum>;
export type PermissionEntityName = Lowercase<keyof typeof PermissionEntityEnum>;

export type UserPermission = [PermissionActionName, PermissionEntityName[]];
export type UserAbility = PureAbility<[PermissionActionName, PermissionEntityName]>;
export interface IAuthSlice {
  user: User;
  loading: boolean;
  error: null | string;
  token: string;
  isAuthenticated: boolean;
  permissions: UserPermission[];
  statusCode: number | null;
}
