import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AbilityProvider } from './components/Ability';
import { AppLoader } from './components/AppLoader';
import { createRoutes } from './components/Routes';
import { whoami } from './store/auth/slice';
import { useAppDispatch } from './types/reduxTypes';

const routes = createRoutes();
const router = createBrowserRouter(routes);

export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(whoami());
  }, [dispatch]);

  return (
    <AbilityProvider>
      <RouterProvider router={router} fallbackElement={<AppLoader />} future={{ v7_startTransition: true }} />
    </AbilityProvider>
  );
}
