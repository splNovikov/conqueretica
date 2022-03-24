import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import reportWebVitals from './reportWebVitals';

import App from './components/App';

import './styles/index.scss';

ConfigProvider.config({
  prefixCls: 'ant',
  theme: {
    primaryColor: '#951f40',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ConfigProvider prefixCls="ant">
        <App />
      </ConfigProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
