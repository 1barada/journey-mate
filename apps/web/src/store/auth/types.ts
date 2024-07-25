import { PureAbility } from '@casl/ability';
import { PermissionActionKey, PermissionEntityKey } from '@project/permissions';
import { z } from 'zod';
export interface User {
  id: number;
  name: string | null;
  email: string;
  sex: Sex | null;
  description: string | null;
  age: number | null;
  dateOfBirth: string | null;
  avatarUrl: string | null;
}

export type UserPermission = [PermissionActionKey, PermissionEntityKey[]];
export type UserAbility = PureAbility<[PermissionActionKey, PermissionEntityKey]>;
export interface AuthSlice {
  user: User | null;
  isLoading: boolean;
  error: null | string;
  isAuthenticated: boolean;
  permissions: UserPermission[];
  statusCode: number | null;
}

export interface ProfileDataPayload {
  email: string;
  name: string;
  sex: 'female' | 'male';
  dateOfBirth: Date;
}

export enum Sex {
  Female = 'female',
  Male = 'male',
}

export const EditProfileSchema = z.object({
  email: z.string().email({ message: 'Email is required' }).trim(),
  name: z.string().nullable(),
  sex: z.enum(['female', 'male']).nullable(),
  dateOfBirth: z.date().nullable(),
});

export type DataTypes = z.infer<typeof EditProfileSchema>;
