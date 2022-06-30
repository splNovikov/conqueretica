import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
// Layouts
import CleanPageLayout from '../../layouts/CleanPageLayout';
import DefaultPageLayout from '../../layouts/DefaultPageLayout';
// Pages
import SignInPage from '../../pages/SignInPage';
import SignUpPage from '../../pages/SignUpPage';
import LinksPage from '../../pages/LinksPage';
import DashboardPage from '../../pages/DashboardPage';
import ProtectedRoute from '../ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/links" />} />

      <Route element={<CleanPageLayout />}>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DefaultPageLayout />}>
          <Route path="/links" element={<LinksPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
