import React, { FC } from 'react';

import firebase from '../../firebase';

const Login: FC = () => (
  <button type="button" onClick={firebase.signInWithGoogle} className="login">
    Login with Google
  </button>
);

export default Login;
