import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';
// Firebase
import firebase from './index';
// Utils
import { defaultErrorHandler, httpErrorHandler } from '../utils';

const createUser = async (
  email: string,
  password: string,
): Promise<UserCredential | null> => {
  if (!email || !password) {
    defaultErrorHandler('No email or Password');
    return null;
  }

  try {
    return await createUserWithEmailAndPassword(firebase.auth, email, password);
  } catch (e) {
    httpErrorHandler(e);
    return null;
  }
};

export { createUser };
