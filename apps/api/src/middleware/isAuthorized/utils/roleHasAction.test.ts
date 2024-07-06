import { TRPCError } from '@trpc/server';

import { permissionActions, permissionTable } from '../../../permissions/permissions';

import { roleHasActions } from './roleHasAction';

describe('isRoleExists test', () => {
  test('returns object with selected actions typeof permissionTable', () => {
    expect(
      roleHasActions({ role: permissionTable.viewer, action: permissionActions.Update, Error: TRPCError })
    ).toEqual(permissionTable.viewer.update);

    expect(roleHasActions({ role: permissionTable.guest, action: permissionActions.Create, Error: TRPCError })).toEqual(
      permissionTable.guest.create
    );

    expect(
      roleHasActions({ role: permissionTable.suspendedViewer, action: permissionActions.Read, Error: TRPCError })
    ).toEqual(permissionTable.suspendedViewer.read);

    expect(
      roleHasActions({ role: permissionTable.admin, action: permissionActions.Suspend, Error: TRPCError })
    ).toEqual(permissionTable.admin.suspend);
  });

  test('role didnt have action, throw error', () => {
    expect(() =>
      roleHasActions({ role: permissionTable.suspendedViewer, action: permissionActions.Create, Error: TRPCError })
    ).toThrow(TRPCError);
  });
});
