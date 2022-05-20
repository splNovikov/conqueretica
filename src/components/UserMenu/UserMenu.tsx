import React, { FC } from 'react';
import { UserInfo } from 'firebase/auth';
import { Avatar, Card, Divider } from 'antd';
// Components
import SignOut from '../SignOut';
// Utils
import { acronym } from '../../utils';
// Styles
import './UserMenu.scss';

const { Meta } = Card;

const UserMenu: FC<{
  user: UserInfo;
}> = ({ user }) => (
  <Card className="user-menu">
    <Meta
      avatar={
        <Avatar
          className="user-avatar user-menu-user-avatar"
          size="large"
          gap={1}
          src={user.photoURL}
        >
          {acronym(user.displayName)}
        </Avatar>
      }
      title={user.displayName}
      description={user.email}
    />
    <Divider />
    <div className="user-menu-bottom">
      <SignOut />
    </div>
  </Card>
);

export default UserMenu;
