import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import LinksPage from '../../pages/LinksPage';
import DashboardPage from '../../pages/DashboardPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/" element={<LinksPage />} />
      <Route path="dashboard" element={<DashboardPage />} />
    </Routes>
  );
};

export default AppRoutes;
