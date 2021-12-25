import React from 'react';

// todo: routes
import MainPage from '../../pages/MainPage';

import './App.scss';

// todo: fix COVERAGE
const App = () => {
  return (
    <div className="app-wrapper">
      <h1>Hello world React!</h1>
      <MainPage />
    </div>
  );
};

export default App;
