import {
  UserInfo,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';

import firebase from './index';

// todo: tests
const getToken = (): Promise<string> => {
  return new Promise((resolve) => {
    chrome.identity.getAuthToken({ interactive: true }, (token: string) => {
      resolve(token);
    });
  });
};

// todo: update tests
const signInWithGoogle = async (): Promise<UserInfo | null> => {
  const token = await getToken();

  const credential = GoogleAuthProvider.credential(null, token);

  const { user } = await signInWithCredential(firebase.auth, credential);

  // todo: move to getUser
  const userRef = doc(firebase.firestoreDB, 'users', user.uid);

  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    return firebase.createUser(user);
  }

  return user;
};

const signOut = () => {
  firebase.auth.signOut();
};

export { signInWithGoogle, signOut };
