import { User, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';

import firebase from './index';

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async (): Promise<User | null> => {
  const { user } = await signInWithPopup(firebase.auth, googleProvider);

  const usersRef = collection(firebase.firestoreDB, 'users');
  const q = query(usersRef, where('uid', '==', user.uid));
  // todo [after release] - getDoc instead of getDocs
  // const userRef = doc(firebase.firestoreDB, 'users', user.uid);
  // const userSnap = await getDoc(userRef);
  const users = await getDocs(q);

  if (users?.size === 0) {
    return firebase.createUser(usersRef, user);
  }

  return user;
};

const signOut = () => {
  firebase.auth.signOut();
};

export { signInWithGoogle, signOut };
