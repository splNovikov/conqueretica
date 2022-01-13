import { User } from 'firebase/auth';
import { addDoc, CollectionReference } from 'firebase/firestore';

import { firebaseErrorHandler } from '../utils';

const createUser = async (
  usersRef: CollectionReference,
  user: User,
): Promise<User | null> => {
  try {
    await addDoc(usersRef, {
      uid: user.uid,
      name: user.displayName,
      authProvider: 'google',
      email: user.email,
    });
    return user;
  } catch (e) {
    firebaseErrorHandler(e);
    return null;
  }
};

export { createUser };
