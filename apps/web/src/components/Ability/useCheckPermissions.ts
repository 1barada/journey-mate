import { useAbility } from '@casl/react';

import { AbilityContext } from './AbilityProvider';

export const useCheckPermissions = () => useAbility(AbilityContext);
