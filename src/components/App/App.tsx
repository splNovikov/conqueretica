import React, { FC } from 'react';

import './App.scss';
import SideBar from '../SideBar';
import Dashboard from './Dashboard/Dashboard';

const App = () => {
  return (
    <div className="app-wrapper">
      <div className="app-side-bar">
        <SideBar />
      </div>
      <div className="app-dashboard">
        <Dashboard />
      </div>
    </div>
  );
};

export default App;
