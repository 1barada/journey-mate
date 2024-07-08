import { TRPCError } from '@trpc/server';

import { permissionEntity, permissionTable } from '../../../permissions/permissions';

import { entitiesValidator } from './entitiesValidator';

describe('isRoleExists test', () => {
  test('returns entity if current role with current action permission, typeof permissionEntity', () => {
    expect(
      entitiesValidator({
        action: permissionTable.Admin.suspend,
        entity: permissionEntity.User,
        Error: TRPCError,
      })
    ).toEqual(permissionEntity.User);

    expect(
      entitiesValidator({
        action: permissionTable.Guest.create,
        entity: permissionEntity.User,
        Error: TRPCError,
      })
    ).toEqual(permissionEntity.User);

    expect(
      entitiesValidator({
        action: permissionTable.Viewer.join,
        entity: permissionEntity.Event,
        Error: TRPCError,
      })
    ).toEqual(permissionEntity.Event);

    expect(
      entitiesValidator({
        action: permissionTable.SuspendedViewer.read,
        entity: permissionEntity.Event,
        Error: TRPCError,
      })
    ).toEqual(permissionEntity.Event);
  });

  test('role didnt have entity, throw error', () => {
    expect(() =>
      entitiesValidator({
        action: permissionTable.Guest.create,
        entity: permissionEntity.Event,
        Error: TRPCError,
      })
    ).toThrow(TRPCError);
  });
});
