import { User } from 'firebase/auth';
import { addDoc, CollectionReference } from 'firebase/firestore';

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
    // todo [after release]: error handling
    // eslint-disable-next-line no-console
    console.error(e);
  }

  return null;
};

export { createUser };
