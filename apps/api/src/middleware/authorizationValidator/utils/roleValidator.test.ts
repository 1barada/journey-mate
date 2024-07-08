import { TRPCError } from '@trpc/server';

import { permissionTable, role } from '../../../permissions/permissions';

import { roleValidator } from './roleValidator';

describe('isRoleExists test', () => {
  test('returns permissionTable with selected role', () => {
    expect(roleValidator({ permissions: permissionTable, userRole: role.Admin, Error: TRPCError })).toEqual(
      permissionTable.Admin
    );

    expect(roleValidator({ permissions: permissionTable, userRole: role.Guest, Error: TRPCError })).toEqual(
      permissionTable.Guest
    );

    expect(roleValidator({ permissions: permissionTable, userRole: role.SuspendedViewer, Error: TRPCError })).toEqual(
      permissionTable.SuspendedViewer
    );

    expect(roleValidator({ permissions: permissionTable, userRole: role.Viewer, Error: TRPCError })).toEqual(
      permissionTable.Viewer
    );
  });

  test('role does not exist, throw error', () => {
    expect(() =>
      roleValidator({
        permissions: permissionTable,
        userRole: 'Malicious user' as keyof typeof permissionTable,
        Error: TRPCError,
      })
    ).toThrow(TRPCError);
  });
});
