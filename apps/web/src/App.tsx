import { useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { createRoutes } from './components/Routes';
import { selectIsAuthenticated } from './store/Auth/AuthSlice';

export function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const routes = createRoutes(isAuthenticated);
  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}
