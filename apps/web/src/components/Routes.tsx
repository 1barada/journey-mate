import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { routes } from '../routes';

import { Layout } from './Layout';
import { PrivateRoute } from './PrivateRoute';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const JourneysPage = lazy(() => import('../pages/JourneysPage/JourneysPage'));
const Notifications = lazy(() => import('../pages/Notifications/Notifications'));

const ProfilePage = lazy(() => import('../pages/ProfilePage/ProfilePage'));

export const createRoutes = (isAuthenticated: boolean): RouteObject[] => [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },

      {
        path: routes.PROFILE,
        element: <PrivateRoute isAuthenticated={isAuthenticated} />,
        children: [
          {
            path: '',
            element: <ProfilePage />,
          },
        ],
      },
      {
        path: routes.NOTIFICATIONS,
        element: <PrivateRoute isAuthenticated={isAuthenticated} />,
        children: [
          {
            path: '',
            element: <Notifications />,
          },
        ],
      },
      {
        path: routes.JOURNEYS,
        element: <PrivateRoute isAuthenticated={isAuthenticated} />,
        children: [
          {
            path: '',
            element: <JourneysPage />,
          },
        ],
      },
    ],
  },
];
