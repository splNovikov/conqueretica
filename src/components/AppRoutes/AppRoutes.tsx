import React from 'react';
import { Route, Routes } from 'react-router-dom';
// Router-dom iverview: https://reactrouter.com/docs/en/v6/getting-started/overview

import LinksPage from '../../pages/LinksPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<LinksPage />} />
    </Routes>
  );
};

export default AppRoutes;
