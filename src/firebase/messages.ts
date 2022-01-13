import { collection, getDocs, query, where } from 'firebase/firestore';
import { User } from 'firebase/auth';

import firebase from './index';

import { IMessage } from '../interfaces';

export const fetchMessages = async (user: User | null): Promise<IMessage[]> => {
  const res: IMessage[] = [];

  try {
    const messagesRef = collection(firebase.firestoreDB, 'messages');
    const q = query(messagesRef, where('ownerId', '==', user?.uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const { ownerId, id, text } = doc.data();

      res.push({ ownerId, id, text });
    });
  } catch (e) {
    // todo [after release]: error handling
    // eslint-disable-next-line no-console
    console.error(e);
  }

  return res;
};
