import React, { FC } from 'react';
import { Button } from 'antd';
// Firebase
import firebase from '../../firebase';

const Login: FC = () => (
  <Button className="login" onClick={firebase.signInWithGoogle} type="primary">
    Login with Google
  </Button>
);

export default Login;
