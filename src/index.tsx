import React from 'react';
import ReactDOM from 'react-dom';
// todo: I assume we will use Router in future - I think correct name of MainPage should be App
import MainPage from './pages/MainPage';
import reportWebVitals from './reportWebVitals';

import './styles/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <MainPage />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
