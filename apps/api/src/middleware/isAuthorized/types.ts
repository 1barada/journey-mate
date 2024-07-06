import { permissionActions, permissionEntities } from '../../permissions/permissions';

export interface isAuthorizedProps {
  requiredEntity: permissionEntities;
  requiredAction: permissionActions;
}
