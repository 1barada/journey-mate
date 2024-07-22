import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AbilityProvider } from './components/Ability';
import { AppLoader } from './components/AppLoader';
import { createRoutes } from './components/Routes';
import { selectUser, whoami } from './store/auth/slice';
import { useAppDispatch, useAppSelector } from './types/reduxTypes';

const routes = createRoutes();
const router = createBrowserRouter(routes);

export function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(whoami());
  }, [dispatch, user]);

  return (
    <AbilityProvider>
      <RouterProvider router={router} fallbackElement={<AppLoader />} future={{ v7_startTransition: true }} />
    </AbilityProvider>
  );
}
