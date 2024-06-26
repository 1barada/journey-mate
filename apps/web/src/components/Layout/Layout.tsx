import React from 'react';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <header></header>
      <Suspense>
        <Outlet />
      </Suspense>
    </>
  );
};
