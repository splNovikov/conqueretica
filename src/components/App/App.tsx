import React from 'react';
import { ConfigProvider, Layout } from 'antd';
// Context
import { AuthContextProvider } from '../../context/authContext';
// Components
import Router from '../../router/Router';
// Styles
import './App.scss';

ConfigProvider.config({
  prefixCls: 'ant',
  theme: {
    primaryColor: '#951f40',
  },
});

const App = () => {
  return (
    <ConfigProvider prefixCls="ant">
      <AuthContextProvider>
        <Layout className="app">
          <Router />
        </Layout>
      </AuthContextProvider>
    </ConfigProvider>
  );
};

export default App;
