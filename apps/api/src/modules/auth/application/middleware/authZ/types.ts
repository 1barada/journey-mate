import { PermissionAction, PermissionEntity } from '../../../domain/enums/permissions.enums';

export interface authorizationValidatorProps {
  requiredEntity: PermissionEntity;
  requiredAction: PermissionAction;
}
