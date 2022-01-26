import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
// Firebase
import firebase from '../../firebase';
// Components
import LinksPageView from './LinksPageView';
// Test Data (should be fetched from BE)
import { columns, importantLinks } from '../../__test_data__';

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
