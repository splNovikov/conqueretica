import React from 'react';
import { ConfigProvider } from 'antd';
// Context
import { AuthContextProvider } from '../../context/authContext';
// Components
import Router from '../../router/Router';

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
        <Router />
      </AuthContextProvider>
    </ConfigProvider>
  );
};

export default App;
