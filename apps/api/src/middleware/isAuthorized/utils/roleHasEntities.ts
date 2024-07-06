import type { roleHasEntitiesProps } from './types';

export const roleHasEntities = ({ action, entity, Error }: roleHasEntitiesProps) => {
  const roleHasEntities = action.find((it) => it.includes(entity));
  if (!roleHasEntities) {
    throw new Error({
      message: 'user not authorized to perform this operation',
      code: 'FORBIDDEN',
    });
  }

  return roleHasEntities;
};
