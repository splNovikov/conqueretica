import React, { FC } from 'react';
import { Avatar, Button, Dropdown, Layout, Menu } from 'antd';
import {
  AppstoreOutlined,
  DashboardOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { UserInfo } from 'firebase/auth';
// Interfaces
import { ILink } from '../../interfaces';
// Components
import SignOut from '../SignOut';
import Login from '../Login';
import Linky from '../Linky';
// Styles
import './AppHeader.scss';
import { acronym } from '../../utils';

const { Header } = Layout;

const googleLinks: ILink[] = [
  {
    id: '1',
    href: 'https://docs.google.com/spreadsheets',
    title: 'Sheets',
    // @ts-ignore
    createdAt: '',
  },
  {
    id: '2',
    href: 'https://docs.google.com/document',
    title: 'Docs',
    // @ts-ignore
    createdAt: '',
  },
  {
    id: '3',
    href: 'https://docs.google.com/presentation',
    title: 'Slides',
    // @ts-ignore
    createdAt: '',
  },
];

const googleLinksMenu = (
  <Menu>
    {googleLinks.map((l) => (
      <Menu.Item key={l.id}>
        <Linky link={l} iconSize="x-small" />
      </Menu.Item>
    ))}
  </Menu>
);

const GoogleLinksDropdownMenu = () => (
  <Dropdown key="more" overlay={googleLinksMenu} placement="bottomRight" arrow>
    <Button type="text" icon={<AppstoreOutlined />} />
  </Dropdown>
);

const userMenu = (
  <Menu>
    <Menu.Item key="sign-out">
      <SignOut />
    </Menu.Item>
  </Menu>
);

const UserDropdownMenu: FC<{
  user: UserInfo;
}> = ({ user: { displayName } }) => (
  <Dropdown key="user-menu" overlay={userMenu} placement="bottomRight" arrow>
    <Avatar className="user-name" gap={1}>
      {acronym(displayName)}
    </Avatar>
  </Dropdown>
);

const AppHeader: FC<{
  user: UserInfo | null | undefined;
  pathname: string;
}> = ({ user, pathname }) => {
  return (
    <Header className="header">
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
        <GoogleLinksDropdownMenu />
        {user ? <UserDropdownMenu user={user} /> : <Login key="login" />}
      </div>
    </Header>
  );
};

export default AppHeader;
