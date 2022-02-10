import { UserInfo } from 'firebase/auth';
import { CollectionReference, doc, setDoc } from 'firebase/firestore';

import { httpErrorHandler } from '../utils';

const createUser = async (
  usersRef: CollectionReference,
  user: UserInfo,
): Promise<UserInfo | null> => {
  try {
    await setDoc(doc(usersRef, user.uid), {
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
