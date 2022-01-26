import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
// Firebase
import firebase from '../../firebase';
// Components
import LinksPageView from './LinksPageView';
// Utils
import { defaultErrorHandler } from '../../utils';
// Test Data (should be fetched from BE)
import { columns, importantLinks } from '../../__test_data__';

const LinksPage = () => {
  const [user] = useAuthState(firebase.auth);

  const sendMessage = async (value: string) => {
    if (user) {
      await firebase.sendMessage(value, user);
    } else {
      defaultErrorHandler('No User');
    }
  };

  return (
    <LinksPageView
      user={user}
      importantLinks={importantLinks}
      columns={columns}
      formSubmitHandler={sendMessage}
    />
  );
};

export default LinksPage;
