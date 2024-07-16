import { AbilityBuilder, PureAbility } from '@casl/ability';

import { UserAbility, UserPermission } from '../../store/Auth/types';

export const defineAppAbility = (permission: UserPermission[]): UserAbility => {
  const { can, build } = new AbilityBuilder<UserAbility>(PureAbility);

  permission.forEach(([action, entities]) => {
    can(action, entities);
  });

  return build();
};

export type UserAbilities = ReturnType<typeof defineAppAbility>;
