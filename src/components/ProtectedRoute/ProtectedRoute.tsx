import React from 'react';
import { Navigate } from 'react-router-dom';
// Context
import { UserAuth } from '../../context/authContext';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = UserAuth();

  return user ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
