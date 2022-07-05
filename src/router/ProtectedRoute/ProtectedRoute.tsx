import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
// Routes
import { appRoutes } from '../routes';
// Context
import { UserAuth } from '../../context/authContext';

const ProtectedRoute = () => {
  const { user, isLoading } = UserAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading</div>;
  }

  const isAuthPage =
    location.pathname === `/${appRoutes.signIn.path}` ||
    location.pathname === `/${appRoutes.signUp.path}`;

  if (!user && isAuthPage) {
    return <Outlet />;
  }

  if (!user) {
    return <Navigate to={`/${appRoutes.signIn.path}`} />;
  }

  if (user && isAuthPage) {
    return <Navigate to={`/${appRoutes.default.path}`} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
