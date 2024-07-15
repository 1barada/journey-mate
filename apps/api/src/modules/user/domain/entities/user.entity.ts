import { z } from 'zod';

export const UserRoleSchema = z.enum(['admin', 'viewer']);
export type UserRole = z.infer<typeof UserRoleSchema>;

export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string().nullable(),
  role: UserRoleSchema,
  description: z.string().nullable().default(null),
});
export type User = z.infer<typeof UserSchema>;

export const UserWithPasswordSchema = UserSchema.extend({
  password: z.string(),
});
export type UserWithPassword = z.infer<typeof UserWithPasswordSchema>;
