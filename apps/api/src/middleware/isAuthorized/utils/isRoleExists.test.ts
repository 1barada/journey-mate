import { TRPCError } from '@trpc/server';

import { permissionTable, roles } from '../../../permissions/permissions';

import { isRoleExists } from './isRoleExists';

describe('isRoleExists test', () => {
  test('returns permissionTable with selected role', () => {
    expect(isRoleExists({ permissions: permissionTable, userRole: roles.Admin, Error: TRPCError })).toEqual(
      permissionTable.admin
    );

    expect(isRoleExists({ permissions: permissionTable, userRole: roles.Guest, Error: TRPCError })).toEqual(
      permissionTable.guest
    );

    expect(isRoleExists({ permissions: permissionTable, userRole: roles.SuspendedViewer, Error: TRPCError })).toEqual(
      permissionTable.suspendedViewer
    );

    expect(isRoleExists({ permissions: permissionTable, userRole: roles.Viewer, Error: TRPCError })).toEqual(
      permissionTable.viewer
    );
  });

  test('role does not exist, throw error', () => {
    expect(() =>
      isRoleExists({
        permissions: permissionTable,
        userRole: 'Malicious user' as keyof typeof permissionTable,
        Error: TRPCError,
      })
    ).toThrow(TRPCError);
  });
});
