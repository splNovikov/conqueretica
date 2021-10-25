import React, { FC } from 'react';
import Profile from '../Profile';

// Styles
import './SideBar.scss';

const SideBar: FC = () => {
  return (
    <div className="side-bar-wrapper">
      <Profile />
    </div>
  );
};

export default SideBar;
