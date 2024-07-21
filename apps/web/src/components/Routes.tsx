import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { routes } from '../routes';

import { Layout } from './Layout';
import { PrivateRoute } from './PrivateRoute';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const JourneysPage = lazy(() => import('../pages/JourneysPage/JourneysPage'));
const Notifications = lazy(() => import('../pages/Notifications/Notifications'));
const AccountConfirmedPage = lazy(() => import('../pages/AccountConfirmedPage/AccountConfirmedPage'));
const CreateJourneyPage = lazy(() => import('../pages/CreateJourneyPage/CreateJourneyPage'));

const ProfilePage = lazy(() => import('../pages/ProfilePage/ProfilePage'));

export const createRoutes = (): RouteObject[] => [
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
        element: <PrivateRoute />,
        children: [
          {
            path: '',
            element: <ProfilePage />,
          },
        ],
      },
      {
        path: routes.NOTIFICATIONS,
        element: <PrivateRoute />,
        children: [
          {
            path: '',
            element: <Notifications />,
          },
        ],
      },
      {
        path: routes.JOURNEYS,
        element: <PrivateRoute />,
        children: [
          {
            path: '',
            element: <JourneysPage />,
          },
        ],
      },
      {
        path: routes.AUTH,
        children: [
          {
            path: routes.AUTH_CONFIRM,
            element: <AccountConfirmedPage />,
          },
        ],
      },
      {
        path: '/journey/new',
        element: <PrivateRoute />,
        children: [
          {
            path: '',
            element: <CreateJourneyPage />,
          },
        ],
      },
    ],
  },
];
