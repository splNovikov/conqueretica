import React, { FC } from 'react';

import firebase from '../../firebase';

const SignOut: FC = () => (
  <button type="button" className="sign-out" onClick={firebase.signOut}>
    Sign Out
  </button>
);

export default SignOut;
