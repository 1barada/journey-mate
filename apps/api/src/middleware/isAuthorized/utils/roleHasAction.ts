import type { roleHasActionsProps } from './types';

export const roleHasActions = ({ role, action, Error }: roleHasActionsProps) => {
  const roleHasActions = role[action];
  if (!roleHasActions) {
    throw new Error({
      message: 'user not authorized to perform this operation',
      code: 'FORBIDDEN',
    });
  }

  return roleHasActions;
};
