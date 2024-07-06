import { TRPCError } from '@trpc/server';

import { permissionEntities, permissionTable } from '../../../permissions/permissions';

import { roleHasEntities } from './roleHasEntities';

describe('isRoleExists test', () => {
  test('returns entity if current role with current action permission, typeof permissionEntities', () => {
    expect(
      roleHasEntities({
        action: permissionTable.admin.suspend,
        entity: permissionEntities.User,
        Error: TRPCError,
      })
    ).toEqual(permissionEntities.User);

    expect(
      roleHasEntities({
        action: permissionTable.guest.create,
        entity: permissionEntities.User,
        Error: TRPCError,
      })
    ).toEqual(permissionEntities.User);

    expect(
      roleHasEntities({
        action: permissionTable.viewer.join,
        entity: permissionEntities.Event,
        Error: TRPCError,
      })
    ).toEqual(permissionEntities.Event);

    expect(
      roleHasEntities({
        action: permissionTable.suspendedViewer.read,
        entity: permissionEntities.Event,
        Error: TRPCError,
      })
    ).toEqual(permissionEntities.Event);
  });

  test('role didnt have entity, throw error', () => {
    expect(() =>
      roleHasEntities({
        action: permissionTable.guest.create,
        entity: permissionEntities.Event,
        Error: TRPCError,
      })
    ).toThrow(TRPCError);
  });
});
