import React, { FC } from 'react';
import { Button, Dropdown, Menu, PageHeader, Typography } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import { UserInfo } from 'firebase/auth';
// Interfaces
import { ILink } from '../../interfaces';
// Components
import SignOut from '../SignOut';
import Login from '../Login';
import Linky from '../Linky';
// Styles
import './Header.scss';

const { Text } = Typography;

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
  <Dropdown key="more" overlay={googleLinksMenu} placement="bottomRight">
    <Button type="text" icon={<AppstoreOutlined />} />
  </Dropdown>
);

const Header: FC<{
  user: UserInfo | null | undefined;
}> = ({ user }) => {
  return (
    <PageHeader
      className="site-page-header"
      extra={[
        <GoogleLinksDropdownMenu key="more" />,
        user ? (
          [
            <Text className="user-name" key="user-name">
              {user.displayName}
            </Text>,
            <SignOut key="sign-out" />,
          ]
        ) : (
          <Login key="login" />
        ),
      ]}
    />
  );
};

export default Header;
