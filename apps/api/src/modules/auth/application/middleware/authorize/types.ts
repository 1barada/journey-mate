import { PermissionAction, PermissionEntity } from '../../../domain/enums/permissions.enums';

export interface authorizationMiddlewareProps {
  requiredEntity: PermissionEntity;
  requiredAction: PermissionAction;
}
