import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';
// Firebase
import firebase from './index';
// Utils
import { defaultErrorHandler } from '../utils';

const createUser = async (
  email: string,
  password: string,
): Promise<UserCredential | null> => {
  if (!email || !password) {
    defaultErrorHandler('No email or Password');
    return null;
  }

  return createUserWithEmailAndPassword(firebase.auth, email, password);
};

export { createUser };
