import { PermissionRepository } from './../../domain/repository/permissions.repository';
import { PermissionsService } from './permissions.service';

export function createPermissionsService() {
  const permissionTable = new PermissionRepository();

  return new PermissionsService(permissionTable);
}
