import { signInWithEmailAndPassword } from 'firebase/auth';
// Firebase
import firebase from './index';
// Utils
import { defaultErrorHandler } from '../utils';

const signIn = (email: string, password: string) => {
  if (!email || !password) {
    defaultErrorHandler('No email or Password');
    return null;
  }

  return signInWithEmailAndPassword(firebase.auth, email, password);
};

const signOut = () => firebase.auth.signOut();

export { signIn, signOut };
