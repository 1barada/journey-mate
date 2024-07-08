import { permissionAction, permissionEntity } from '../../permissions/permissions';

export interface authorizationValidatorProps {
  requiredEntity: permissionEntity;
  requiredAction: permissionAction;
}
