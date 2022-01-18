import React, { FC } from 'react';
import { User } from 'firebase/auth';

import SignOut from '../SignOut';
import Login from '../Login';

const Header: FC<{
  user: User | null | undefined;
}> = ({ user }) => (
  <div className="header">
    {user ? (
      <div className="user-wrapper">
        <span className="user-name">{user.displayName}</span>
        <SignOut />
      </div>
    ) : (
      <Login />
    )}
  </div>
);

export default Header;
