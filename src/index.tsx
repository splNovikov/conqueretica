import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import App from './components/App';

import './styles/index.scss';

ConfigProvider.config({
  prefixCls: 'ant',
  theme: {
    primaryColor: '#951f40',
  },
});

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement as Element);
root.render(
  <React.StrictMode>
    <Router>
      <ConfigProvider prefixCls="ant">
        <App />
      </ConfigProvider>
    </Router>
  </React.StrictMode>,
);
