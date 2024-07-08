import type { roleValidatorProps } from './types';

export const roleValidator = ({ permissions, userRole, Error }: roleValidatorProps) => {
  const isRoleExists = permissions[userRole];
  if (!isRoleExists) {
    throw new Error({
      message: 'Role does not exists',
      code: 'UNAUTHORIZED',
    });
  }

  return isRoleExists;
};
