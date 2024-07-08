import { TRPCError } from '@trpc/server';

import { permissionAction, permissionTable } from '../../../permissions/permissions';

import { actionsValidator } from './actionsValidator';

describe('isRoleExists test', () => {
  test('returns object with selected actions typeof permissionTable', () => {
    expect(
      actionsValidator({ role: permissionTable.Viewer, action: permissionAction.Update, Error: TRPCError })
    ).toEqual(permissionTable.Viewer.update);

    expect(
      actionsValidator({ role: permissionTable.Guest, action: permissionAction.Create, Error: TRPCError })
    ).toEqual(permissionTable.Guest.create);

    expect(
      actionsValidator({ role: permissionTable.SuspendedViewer, action: permissionAction.Read, Error: TRPCError })
    ).toEqual(permissionTable.SuspendedViewer.read);

    expect(
      actionsValidator({ role: permissionTable.Admin, action: permissionAction.Suspend, Error: TRPCError })
    ).toEqual(permissionTable.Admin.suspend);
  });

  test('role didnt have action, throw error', () => {
    expect(() =>
      actionsValidator({ role: permissionTable.SuspendedViewer, action: permissionAction.Create, Error: TRPCError })
    ).toThrow(TRPCError);
  });
});
