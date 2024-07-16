import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AbilityProvider } from './components/Ability';
import { AppLoader } from './components/AppLoader';
import { createRoutes } from './components/Routes';

const routes = createRoutes();
const router = createBrowserRouter(routes);

export function App() {
  return (
    <AbilityProvider>
      <RouterProvider router={router} fallbackElement={<AppLoader />} future={{ v7_startTransition: true }} />
    </AbilityProvider>
  );
}
