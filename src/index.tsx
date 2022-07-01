import React from 'react';
import ReactDOM from 'react-dom/client';
// Components
import App from './components/App';
// Styles
import './styles/index.scss';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement as Element);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
