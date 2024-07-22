import { PermissionAction, PermissionEntity, Role } from '@project/permissions';
import { z } from 'zod';

export const WhoAmIRequestSchema = z.object({
  email: z.string().email().nullable(),
  role: z.nativeEnum(Role),
});

const PermissionActionSchema = z.nativeEnum(PermissionAction);
const PermissionEntitySchema = z.nativeEnum(PermissionEntity);

const UserPermissionSchema = z
  .tuple([PermissionActionSchema, z.array(PermissionEntitySchema)])
  .default([PermissionAction.Read, [PermissionEntity.Event, PermissionEntity.User]]);

export const UserPermissionsSchema = z.array(UserPermissionSchema);

export const WhoAmIResponseSchema = z.object({
  user: z.any(),
  permissions: UserPermissionsSchema,
});

export type WhoAmIResponse = z.infer<typeof WhoAmIResponseSchema>;
export type WhoAmIRequest = z.infer<typeof WhoAmIRequestSchema>;
export type UserPermission = z.infer<typeof UserPermissionSchema>;

export interface WhoAmIUsecase {
  whoami(request: WhoAmIRequest): Promise<WhoAmIResponse>;
}
