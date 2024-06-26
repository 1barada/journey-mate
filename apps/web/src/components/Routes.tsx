import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

import { Layout } from './Layout/Layout';
import { PrivateRoute } from './PrivateRoute';

const HomePage = lazy(() => import('../pages/HomePage/HomePage').then((module) => ({ default: module.HomePage })));
const EventPage = lazy(() => import('../pages/EventPage/EventPage').then((module) => ({ default: module.EventPage })));
const ProfilePage = lazy(() =>
  import('../pages/ProfilePage/ProfilePage').then((module) => ({ default: module.ProfilePage }))
);

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
    ],
  },
];
