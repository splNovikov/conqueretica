import React, { FC } from 'react';
import { Avatar, Button, Dropdown, Layout, Menu, Skeleton } from 'antd';
import {
  AppstoreOutlined,
  DashboardOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
// Context
import { UserAuth } from '../../context/authContext';
// Components
import UserMenu from '../UserMenu';
import QuickAccessLinksMenu from '../QuickAccessLinksMenu';
// Utils
import { acronym } from '../../utils';
// Styles
import './AppHeader.scss';

const { Header } = Layout;

const AppHeader: FC = () => {
  const { user } = UserAuth();
  const location = useLocation();
  // todo: fix it:
  const authInProgress = false;

  return (
    <Header className="app-header">
      <div className="left-wrapper">
        <Menu
          selectedKeys={[location.pathname]}
          mode="horizontal"
          className="navigation"
        >
          <Menu.Item key="/links" icon={<HomeOutlined />}>
            <Link to="/">Links</Link>
          </Menu.Item>
          <Menu.Item key="/dashboard" icon={<DashboardOutlined />} disabled>
            <Link to="dashboard">Dashboard</Link>
          </Menu.Item>
        </Menu>
      </div>
      <div className="right-wrapper">
        <Dropdown
          key="quick-access-links-menu"
          overlay={<QuickAccessLinksMenu />}
          trigger={['click']}
        >
          <Button
            shape="circle"
            icon={<AppstoreOutlined />}
            className="app-header-google-links-trigger"
          />
        </Dropdown>
        <Skeleton
          loading={authInProgress}
          active
          round
          paragraph={false}
          className="user-skeleton"
        >
          {user ? (
            <Dropdown
              key="user-menu"
              overlay={<UserMenu user={user} />}
              trigger={['click']}
            >
              <Avatar
                className="user-avatar app-header-user-avatar"
                gap={1}
                src={user.photoURL}
              >
                {acronym(user.displayName)}
              </Avatar>
            </Dropdown>
          ) : null}
        </Skeleton>
      </div>
    </Header>
  );
};

export default AppHeader;
