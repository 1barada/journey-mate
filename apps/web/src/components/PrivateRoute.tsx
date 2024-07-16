import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { selectIsAuthenticated } from '../store/Auth/AuthSlice';
import { useAppSelector } from '../types/reduxTypes';

interface PrivateRouteProps {
  className?: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
