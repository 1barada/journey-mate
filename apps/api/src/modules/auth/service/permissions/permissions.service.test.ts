import { PermissionAction, PermissionEntity, Role } from '../../domain/enums/permissions.enums';
import { permissionTable } from '../../domain/repository/permissions.repository';

import { createPermissionsService } from './permissions.factory';
import { PermissionsService } from './permissions.service';

describe('PermissionsService', () => {
  let permissionsService: PermissionsService;

  beforeEach(() => {
    permissionsService = createPermissionsService();
  });

  describe('roleValidation', () => {
    test('returns permissionTable with selected role', () => {
      expect(permissionsService.roleValidation({ permissions: permissionTable, userRole: Role.Admin })).toEqual(
        permissionTable[Role.Admin]
      );

      expect(permissionsService.roleValidation({ permissions: permissionTable, userRole: Role.Guest })).toEqual(
        permissionTable[Role.Guest]
      );

      expect(
        permissionsService.roleValidation({ permissions: permissionTable, userRole: Role.SuspendedViewer })
      ).toEqual(permissionTable[Role.SuspendedViewer]);

      expect(permissionsService.roleValidation({ permissions: permissionTable, userRole: Role.Viewer })).toEqual(
        permissionTable[Role.Viewer]
      );
    });

    test('role does not exist, returns null', () => {
      expect(
        permissionsService.roleValidation({ permissions: permissionTable, userRole: 'MaliciousUser' as Role })
      ).toBeNull();
    });
  });

  describe('actionsValidator', () => {
    test('returns object with selected actions typeof permissionTable', () => {
      expect(
        permissionsService.actionsValidator({ role: permissionTable[Role.Viewer], action: PermissionAction.Update })
      ).toEqual(permissionTable[Role.Viewer][PermissionAction.Update]);

      expect(
        permissionsService.actionsValidator({ role: permissionTable[Role.Guest], action: PermissionAction.Create })
      ).toEqual(permissionTable[Role.Guest][PermissionAction.Create]);

      expect(
        permissionsService.actionsValidator({
          role: permissionTable[Role.SuspendedViewer],
          action: PermissionAction.Read,
        })
      ).toEqual(permissionTable[Role.SuspendedViewer][PermissionAction.Read]);

      expect(
        permissionsService.actionsValidator({ role: permissionTable[Role.Admin], action: PermissionAction.Suspend })
      ).toEqual(permissionTable[Role.Admin][PermissionAction.Suspend]);
    });

    test('role doesnt have action, return null', () => {
      expect(
        permissionsService.actionsValidator({
          role: permissionTable[Role.SuspendedViewer],
          action: PermissionAction.Create,
        })
      ).toBeNull();
    });
  });

  describe('entitiesValidator', () => {
    test('returns entity if curent role with current action permission, typef permissionEntity', () => {
      expect(
        permissionsService.entitiesValidator({
          action: permissionTable[Role.Admin][PermissionAction.Suspend],
          entity: PermissionEntity.User,
        })
      ).toEqual(PermissionEntity.User);

      expect(
        permissionsService.entitiesValidator({
          action: permissionTable[Role.Guest][PermissionAction.Create],
          entity: PermissionEntity.User,
        })
      ).toEqual(PermissionEntity.User);

      expect(
        permissionsService.entitiesValidator({
          action: permissionTable[Role.Viewer][PermissionAction.Join],
          entity: PermissionEntity.Event,
        })
      ).toEqual(PermissionEntity.Event);

      expect(
        permissionsService.entitiesValidator({
          action: permissionTable[Role.SuspendedViewer][PermissionAction.Read],
          entity: PermissionEntity.Event,
        })
      ).toEqual(PermissionEntity.Event);
    });

    test('role doesnt have entity, returns null', () => {
      expect(
        permissionsService.entitiesValidator({
          action: permissionTable[Role.Guest][PermissionAction.Create],
          entity: PermissionEntity.Event,
        })
      ).toBeNull();
    });
  });
});
