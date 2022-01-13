import React, { FC } from 'react';
import { User } from 'firebase/auth';

import SignOut from '../SignOut';
import Login from '../Login';

const Header: FC<{
  user: User | null | undefined;
}> = ({ user }) => (
  <div className="header">
    {user ? (
      <>
        {user.displayName}
        <SignOut />
      </>
    ) : (
      <Login />
    )}
  </div>
);

export default Header;
