import type { isRoleExistsProps } from './types';

export const isRoleExists = ({ permissions, userRole, Error }: isRoleExistsProps) => {
  const isRoleExists = permissions[userRole];
  if (!isRoleExists) {
    throw new Error({
      message: 'role does not exists',
      code: 'UNAUTHORIZED',
    });
  }

  return isRoleExists;
};
