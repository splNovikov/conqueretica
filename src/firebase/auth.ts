import {
  UserInfo,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';

import firebase from './index';

// todo: tests
const getToken = (userInfo: chrome.identity.UserInfo): Promise<string> => {
  return new Promise((resolve) => {
    chrome.identity.getAuthToken(
      { account: { id: userInfo.id }, interactive: true },
      (token: string) => {
        resolve(token);
      },
    );
  });
};

// todo: tests
const getProfileUserInfo = (): Promise<chrome.identity.UserInfo> => {
  return new Promise((resolve) => {
    chrome.identity.getProfileUserInfo(
      { accountStatus: chrome.identity.AccountStatus.ANY },
      (userInfo) => {
        resolve(userInfo);
      },
    );
  });
};

// todo: update tests
const signInWithGoogle = async (): Promise<UserInfo | null> => {
  const profile = await getProfileUserInfo();

  const token = await getToken(profile);

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
