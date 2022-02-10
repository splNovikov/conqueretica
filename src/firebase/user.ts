import { User } from 'firebase/auth';
import { addDoc, CollectionReference } from 'firebase/firestore';

import { httpErrorHandler } from '../utils';

const createUser = async (
  usersRef: CollectionReference,
  user: User,
): Promise<User | null> => {
  // todo: change to setDoc
  try {
    await addDoc(usersRef, {
      uid: user.uid,
      name: user.displayName,
      authProvider: 'google',
      email: user.email,
    });
    return user;
  } catch (e) {
    httpErrorHandler(e);
    return null;
  }
};

export { createUser };
