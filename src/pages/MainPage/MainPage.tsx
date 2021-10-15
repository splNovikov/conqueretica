import React from 'react';

import './MainPage.scss';
import SideBar from '../../components/SideBar';
import Dashboard from '../../components/Dashboard';

const MainPage = () => {
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

export default MainPage;
