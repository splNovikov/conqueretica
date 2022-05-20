import React, { FC } from 'react';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
// Firebase
import firebase from '../../firebase';

const SignOut: FC = () => (
  <Button type="primary" className="sign-out" onClick={firebase.signOut}>
    <LogoutOutlined /> Log Out
  </Button>
);

export default SignOut;
