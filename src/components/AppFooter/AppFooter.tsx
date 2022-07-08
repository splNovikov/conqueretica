import React from 'react';
import { Layout } from 'antd';
// Styles
import './AppFooter.scss';

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer className="app-footer">
      &copy; {process.env.REACT_APP_WEBSITE_NAME}
    </Footer>
  );
};

export default AppFooter;
