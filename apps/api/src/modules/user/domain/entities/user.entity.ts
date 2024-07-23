import { z } from 'zod';

export const UserRoleSchema = z.enum(['admin', 'viewer']);
export const AuthProviderSchema = z.enum(['password', 'socials']);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string().nullable(),
  role: UserRoleSchema,
  description: z.string().nullable().default(null),
  authProvider: AuthProviderSchema,
  dateOfBirth: z.date().nullable().default(null),
  sex: z.enum(['female', 'male']).nullable().default(null),
  avatar: z.string().nullable().default(null),
});
export type User = z.infer<typeof UserSchema>;

export const UserWithPasswordSchema = UserSchema.extend({
  active: z.boolean(),
  passwordHash: z.string().nullable(),
});

export type UserWithPassword = z.infer<typeof UserWithPasswordSchema>;
