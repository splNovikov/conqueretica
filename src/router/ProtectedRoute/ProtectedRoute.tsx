import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// Routes
import { appRoutes } from '../routes';
// Context
import { UserAuth } from '../../context/authContext';

const ProtectedRoute = () => {
  const { user, isLoading } = UserAuth();

  if (isLoading) {
    return <div>Loading</div>;
  }

  return user ? <Outlet /> : <Navigate to={`/${appRoutes.signIn.path}`} />;
};

export default ProtectedRoute;
