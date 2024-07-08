import { permissionAction, permissionEntity } from '../../permissions/permissions';

export interface authorValidationProps {
  requiredEntity: permissionEntity;
  requiredAction: permissionAction;
}
