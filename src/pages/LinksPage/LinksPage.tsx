import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
// Firebase
import firebase from '../../firebase';
// Components
import LinksPageView from './LinksPageView';
// test data (should be fetched from BE)
import { columns, importantLinks } from './testDataLinks';

const LinksPage = () => {
  const [user] = useAuthState(firebase.auth);

  return (
    <LinksPageView
      user={user}
      importantLinks={importantLinks}
      columns={columns}
    />
  );
};

export default LinksPage;
