import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  User,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  CollectionReference,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';

import { FIREBASE } from './constants/credentials';
import { IUser } from './interfaces';

const app = initializeApp(FIREBASE);
const auth = getAuth(app);
const firestoreDB = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  const { user } = await signInWithPopup(auth, googleProvider);

  const usersRef = collection(firestoreDB, 'users');
  const q = query(usersRef, where('uid', '==', user.uid));
  const users = await getDocs(q);

  if (users?.size === 0) {
    await createUser(usersRef, user);
  }
};

const signOut = () => {
  auth.signOut();
};

const createUser = async (usersRef: CollectionReference, user: User) => {
  return addDoc(usersRef, {
    uid: user.uid,
    name: user.displayName,
    authProvider: 'google',
    email: user.email,
  });
};

export { auth, firestoreDB, signInWithGoogle, signOut };
