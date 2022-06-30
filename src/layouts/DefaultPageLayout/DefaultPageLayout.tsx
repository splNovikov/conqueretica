import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
// Components
import AppHeader from '../../components/AppHeader';
import AppFooter from '../../components/AppFooter';

const { Content } = Layout;

const DefaultPageLayout = () => {
  return (
    <>
      <AppHeader />

      <Content>
        <Outlet />
      </Content>

      <AppFooter />
    </>
  );
};

export default DefaultPageLayout;
