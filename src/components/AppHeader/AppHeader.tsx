import React, { FC } from 'react';
import { Avatar, Button, Dropdown, Layout, Menu, Skeleton } from 'antd';
import {
  AppstoreOutlined,
  DashboardOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { UserInfo } from 'firebase/auth';
// Components
import UserMenu from '../UserMenu';
import Login from '../Login';
import QuickAccessLinksMenu from '../QuickAccessLinksMenu';
// Utils
import { acronym } from '../../utils';
// Styles
import './AppHeader.scss';

const { Header } = Layout;

const AppHeader: FC<{
  user: UserInfo | null | undefined;
  authInProgress: boolean;
  pathname: string;
}> = ({ user, authInProgress, pathname }) => {
  return (
    <Header className="app-header">
      <div className="left-wrapper">
        <Menu
          selectedKeys={[pathname]}
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
          ) : (
            <Login key="login" />
          )}
        </Skeleton>
      </div>
    </Header>
  );
};

export default AppHeader;
