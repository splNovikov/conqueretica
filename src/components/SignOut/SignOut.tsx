import React, { FC } from 'react';
import { LogoutOutlined } from '@ant-design/icons';
// Firebase
import firebase from '../../firebase';

const SignOut: FC = () => (
  <div role="none" className="sign-out" onClick={firebase.signOut}>
    <LogoutOutlined /> Log Out
  </div>
);

export default SignOut;
