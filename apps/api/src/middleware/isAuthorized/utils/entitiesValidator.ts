import type { entitiesValidatorProps } from './types';

export const entitiesValidator = ({ action, entity, Error }: entitiesValidatorProps) => {
  const roleHasEntities = action?.find((it) => it.includes(entity));
  if (!roleHasEntities) {
    throw new Error({
      message: 'user not authorized to perform this operation',
      code: 'FORBIDDEN',
    });
  }

  return roleHasEntities;
};
