import type { actionsValidatorProps } from './types';

export const actionsValidator = ({ role, action, Error }: actionsValidatorProps) => {
  const roleHasActions = role[action];
  if (!roleHasActions) {
    throw new Error({
      message: 'user not authorized to perform this operation',
      code: 'FORBIDDEN',
    });
  }

  return roleHasActions;
};
