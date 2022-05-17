import { UserInfo, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';

import firebase from './index';

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async (): Promise<UserInfo | null> => {
  const { user } = await signInWithPopup(firebase.auth, googleProvider);

  const userRef = await doc(firebase.firestoreDB, 'users', user.uid);
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
