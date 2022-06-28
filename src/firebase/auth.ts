import { signInWithEmailAndPassword } from 'firebase/auth';

import firebase from './index';

const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(firebase.auth, email, password);
};

const signOut = () => firebase.auth.signOut();

export { signIn, signOut };
