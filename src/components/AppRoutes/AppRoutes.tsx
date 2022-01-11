import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainPage from '../../pages/MainPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
};

export default AppRoutes;
