import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
// Components
import AppHeader from '../../components/AppHeader';
import AppFooter from '../../components/AppFooter';
// Styles
import './DefaultPageLayout.scss';

const { Content } = Layout;

const DefaultPageLayout = () => {
  return (
    <Layout className="default-page-layout">
      <AppHeader />

      <Content>
        <Outlet />
      </Content>

      <AppFooter />
    </Layout>
  );
};

export default DefaultPageLayout;
