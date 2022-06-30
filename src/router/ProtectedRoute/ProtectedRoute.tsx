import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// Context
import { UserAuth } from '../../context/authContext';

const ProtectedRoute = () => {
  const { user } = UserAuth();

  return user ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
