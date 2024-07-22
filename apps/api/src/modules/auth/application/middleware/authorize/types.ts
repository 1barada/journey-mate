import { PermissionAction, PermissionEntity } from '@project/permissions';

export interface authorizationMiddlewareProps {
  requiredEntity: PermissionEntity;
  requiredAction: PermissionAction;
}
