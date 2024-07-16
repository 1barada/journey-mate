import { createContext, useMemo } from 'react';

import { selectUserPermissions } from '../../store/Auth/AuthSlice';
import { useAppSelector } from '../../types/reduxTypes';

import type { UserAbilities } from './ability';
import { defineAppAbility } from './ability';

export const AbilityContext = createContext<UserAbilities>({} as UserAbilities);

export const AbilityProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const user = useAppSelector(selectUserPermissions);

  const ability = useMemo(() => defineAppAbility(user), [user]);

  return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>;
};
