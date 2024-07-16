import { z } from 'zod';

import { PermissionAction, PermissionEntity, Role } from '../enums/permissions.enums';

export const WhoAmIRequestSchema = z.object({
  email: z.string().email().nullable(),
  role: z.enum([Role.Admin, Role.Guest, Role.SuspendedViewer, Role.Viewer]),
});

const PermissionActionSchema = z.enum([
  PermissionAction.Create,
  PermissionAction.Read,
  PermissionAction.Join,
  PermissionAction.Delete,
  PermissionAction.Suspend,
  PermissionAction.Update,
]);
const PermissionEntitySchema = z.enum([PermissionEntity.Event, PermissionEntity.User]);

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
