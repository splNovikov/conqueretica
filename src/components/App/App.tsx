import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import { HomeOutlined, DashboardOutlined } from '@ant-design/icons';
import { useAuthState } from 'react-firebase-hooks/auth';

// Firebase
import firebase from '../../firebase';
// Components
import AppRoutes from '../AppRoutes';
// Styles
import './App.scss';
import Header from '../Header';

const App = () => {
  const [user] = useAuthState(firebase.auth);
  const location = useLocation();

  return (
    <div className="app">
      <Header user={user} />
      <Menu selectedKeys={[location.pathname]} mode="horizontal">
        <Menu.Item key="/" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="/dashboard" icon={<DashboardOutlined />}>
          <Link to="dashboard">Dashboard</Link>
        </Menu.Item>
      </Menu>

      <AppRoutes />
    </div>
  );
};

export default App;
