import React from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import { useAuthState } from 'react-firebase-hooks/auth';
// Firebase
import firebase from '../../firebase';
// Components
import AppRoutes from '../AppRoutes';
import AppHeader from '../AppHeader';
import AppFooter from '../../AppFooter';
// Styles
import './App.scss';

const { Content } = Layout;

const App = () => {
  const [user, loading] = useAuthState(firebase.auth);
  const location = useLocation();

  return (
    <Layout className="app">
      <AppHeader
        user={user}
        authInProgress={loading}
        pathname={location.pathname}
      />
      <Content className="app-content-wrapper">
        <AppRoutes />
      </Content>
      <AppFooter />
    </Layout>
  );
};

export default App;
