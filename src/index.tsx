import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider } from 'antd';
// Context
import { AuthContextProvider } from './context/authContext';
// Components
import App from './components/App';
// Styles
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
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </ConfigProvider>
    </Router>
  </React.StrictMode>,
);
