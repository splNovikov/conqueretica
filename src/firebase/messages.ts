import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';

import firebase from './index';

import { IMessage } from '../interfaces';

// todo [after release] - investigate queries on firestore side. "shallow queries"
export const fetchMessages = async (user: User | null): Promise<IMessage[]> => {
  try {
    const messagesRef = collection(firebase.firestoreDB, 'messages');
    const q = query(messagesRef, where('ownerId', '==', user?.uid));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.reduce((acc: IMessage[], doc) => {
      const { ownerId, id, text, createdAt } = doc.data();

      return [...acc, { ownerId, id, text, createdAt }];
    }, []);
  } catch (e) {
    // todo [after release]: error handling
    // eslint-disable-next-line no-console
    console.error(e);
    return [];
  }
};

export const sendMessage = async (
  text: string,
  user: User,
): Promise<IMessage | null> => {
  const message: IMessage = {
    id: uuidv4(),
    text,
    createdAt: `${serverTimestamp()}`,
    ownerId: user.uid,
  };
  try {
    const messagesRef = collection(firebase.firestoreDB, 'messages');

    await addDoc(messagesRef, message);

    return message;
  } catch (e) {
    // todo [after release]: error handling
    // eslint-disable-next-line no-console
    console.error(e);

    return null;
  }
};
