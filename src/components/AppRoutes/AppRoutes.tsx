import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import LinksPage from '../../pages/LinksPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/" element={<LinksPage />} />
    </Routes>
  );
};

export default AppRoutes;
