import React, { FC } from 'react';
import { Button } from 'antd';
// Firebase
import firebase from '../../firebase';

const SignOut: FC = () => (
  <Button className="sign-out" onClick={firebase.signOut}>
    Sign Out
  </Button>
);

export default SignOut;
