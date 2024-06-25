import { lazy } from 'react';
import { useSelector } from 'react-redux';
import { createBrowserRouter, Navigate, RouteObject, RouterProvider } from 'react-router-dom';

import { Layout } from './components/Layout/Layout';
import { PrivateRoute } from './components/PrivateRoute';
import { selectIsAuthenticated } from './store/Auth/AuthSlice';

const HomePage = lazy(() => import('./pages/HomePage/HomePage').then((module) => ({ default: module.HomePage })));
const EventPage = lazy(() => import('./pages/EventPage/EventPage').then((module) => ({ default: module.EventPage })));
const ProfilePage = lazy(() =>
  import('./pages/ProfilePage/ProfilePage').then((module) => ({ default: module.ProfilePage }))
);

export function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/events',
          element: <EventPage />,
        },
        {
          path: '/profile',
          element: <PrivateRoute isAuthenticated={isAuthenticated} />,
          children: [
            {
              path: '',
              element: <ProfilePage />,
            },
          ],
        },
        {
          path: '*',
          element: <Navigate to="/" replace />,
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
}
