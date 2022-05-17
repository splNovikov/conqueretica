import { UserInfo } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';

import { defaultErrorHandler, httpErrorHandler } from '../utils';
import firebase from './index';

const createUser = async (user: UserInfo): Promise<UserInfo | null> => {
  if (!user?.uid) {
    defaultErrorHandler('No User');
    return null;
  }

  try {
    const usersRef = collection(firebase.firestoreDB, 'users');
    const userDoc = doc(usersRef, user.uid);

    await setDoc(userDoc, {
      uid: user.uid,
      name: user.displayName,
      authProvider: 'google',
      email: user.email,
    });

    return user;
  } catch (e) {
    httpErrorHandler(e);
    return null;
  }
};

export { createUser };
