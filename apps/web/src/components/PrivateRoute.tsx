import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { selectIsAuthenticated } from '../store/auth/slice';
import { useAppSelector } from '../types/reduxTypes';

export const PrivateRoute: React.FC = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
