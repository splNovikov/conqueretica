import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// Routes
import { appRoutes } from '../routes';
// Layouts
import CleanPageLayout from '../../layouts/CleanPageLayout';
import DefaultPageLayout from '../../layouts/DefaultPageLayout';
// Pages
import SignInPage from '../../pages/SignInPage';
import SignUpPage from '../../pages/SignUpPage';
import LinksPage from '../../pages/LinksPage';
import DashboardPage from '../../pages/DashboardPage';
import ProtectedRoute from '../ProtectedRoute';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={<Navigate to={`/${appRoutes.default.path}`} />}
        />
        <Route element={<ProtectedRoute />}>
          <Route element={<CleanPageLayout />}>
            <Route path={appRoutes.signIn.path} element={<SignInPage />} />
            <Route path={appRoutes.signUp.path} element={<SignUpPage />} />
          </Route>
          <Route element={<DefaultPageLayout />}>
            <Route path={appRoutes.links.path} element={<LinksPage />} />
            <Route
              path={appRoutes.dashboard.path}
              element={<DashboardPage />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
