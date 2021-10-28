import React from 'react';

// Components
import SideBar from '../../components/SideBar';
import Dashboard from '../../components/Dashboard';

// Styles
import './MainPage.scss';

const MainPage = () => {
  return (
    <div className="main-page-wrapper">
      <div className="main-page-side-bar">
        <SideBar />
      </div>
      <div className="main-page-dashboard">
        <Dashboard />
      </div>
    </div>
  );
};

export default MainPage;
