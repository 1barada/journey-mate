import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from './components/Layout/Layout';
import { PrivateRoute } from './components/PrivateRoute';
import { useAuth } from './store/useAuth';

const HomePage = lazy(() => import('./pages/HomePage/HomePage').then((module) => ({ default: module.HomePage })));
const EventPage = lazy(() => import('./pages/EventPage/EventPage').then((module) => ({ default: module.EventPage })));
const ProfilePage = lazy(() =>
  import('./pages/ProfilePage/ProfilePage').then((module) => ({ default: module.ProfilePage }))
);

export function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="events" element={<EventPage />} />

        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
