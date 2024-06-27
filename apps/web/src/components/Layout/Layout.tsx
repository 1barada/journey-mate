import React from 'react';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Navigation } from '../Navigation/Navigation';

export const Layout = () => {
  return (
    <>
      <Navigation />
      <Suspense>
        <Outlet />
      </Suspense>
    </>
  );
};
