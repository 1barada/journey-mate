import { PermissionAction, PermissionEntity, Role } from '../../domain/enums/permissions.enums';
import {
  PermissionRepositoryPort,
  permissionTable,
  permissionTableType,
} from '../../domain/repository/permissions.repository';

interface roleValidatorProps {
  permissions: typeof permissionTable;
  userRole: keyof typeof permissionTable;
}

interface actionsValidatorProps {
  role: (typeof permissionTable)[Role];
  action: keyof permissionTableType;
}

interface entitiesValidatorProps {
  action: (typeof permissionTable)[Role][PermissionAction];
  entity: PermissionEntity;
}

export class PermissionsService {
  constructor(private PermissionRepository: PermissionRepositoryPort) {}

  roleValidation({ userRole }: roleValidatorProps) {
    const permissionTable = this.PermissionRepository.getPermissionsTable();
    const role = permissionTable[userRole];
    if (!role) {
      return null;
    }
    return role;
  }

  actionsValidator({ role, action }: actionsValidatorProps) {
    const roleActions = role[action];
    if (!roleActions) {
      return null;
    }
    return roleActions;
  }

  entitiesValidator({ action, entity }: entitiesValidatorProps) {
    const roleEntities = action?.find((it) => it.includes(entity));
    if (!roleEntities) {
      return null;
    }
    return roleEntities;
  }
}
