import React from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import { useAuthState } from 'react-firebase-hooks/auth';
// Firebase
import firebase from '../../firebase';
// Components
import AppRoutes from '../AppRoutes';
import AppHeader from '../AppHeader';
// Styles
import './App.scss';

const { Content, Footer } = Layout;

const App = () => {
  const [user] = useAuthState(firebase.auth);
  const location = useLocation();

  return (
    <Layout className="app">
      <AppHeader user={user} pathname={location.pathname} />
      <Content className="app-content-wrapper">
        <AppRoutes />
      </Content>
      <Footer>footer</Footer>
    </Layout>
  );
};

export default App;
