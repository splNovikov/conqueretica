import { UserInfo } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
// Firebase
import firebase from './index';
// Utils
import { defaultErrorHandler, httpErrorHandler } from '../utils';

const createUser = async (user: UserInfo): Promise<UserInfo | null> => {
  if (!user?.uid) {
    defaultErrorHandler('No User');
    return null;
  }

  try {
    const userDoc = doc(firebase.firestoreDB, 'users', user.uid);

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
