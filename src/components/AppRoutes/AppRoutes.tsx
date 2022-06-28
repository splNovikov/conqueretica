import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import SignInPage from '../../pages/SignInPage';
import SignUpPage from '../../pages/SignUpPage';
import LinksPage from '../../pages/LinksPage';
import DashboardPage from '../../pages/DashboardPage';
import ProtectedRoute from '../ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/links" />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route
        path="/links"
        element={
          <ProtectedRoute>
            <LinksPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
