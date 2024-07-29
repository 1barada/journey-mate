import { z } from 'zod';

export const UserRoleSchema = z.enum(['admin', 'viewer', 'guest', 'suspendedViewer']);
export const AuthProviderSchema = z.enum(['password', 'socials']);
export const SexSchema = z.enum(['male', 'female']);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string().nullable(),
  role: UserRoleSchema,
  avatarUrl: z.string().nullable(),
  sex: SexSchema.nullable(),
  age: z.number().min(0).max(200).nullable(),
  description: z.string().nullable(),
  authProvider: AuthProviderSchema,
  dateOfBirth: z.date().nullable().default(null),
});

export type User = z.infer<typeof UserSchema>;

export const UserWithPasswordSchema = UserSchema.extend({
  active: z.boolean(),
  passwordHash: z.string().nullable(),
  restoreToken: z.string().nullable(),
});

export type UserWithPassword = z.infer<typeof UserWithPasswordSchema>;
