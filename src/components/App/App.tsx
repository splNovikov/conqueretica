import React from 'react';
import { Layout } from 'antd';
// Components
import AppRoutes from '../../router/AppRoutes';
// Styles
import './App.scss';

const App = () => {
  return (
    <Layout className="app">
      <AppRoutes />
    </Layout>
  );
};

export default App;
