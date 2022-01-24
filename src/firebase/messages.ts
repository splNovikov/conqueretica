import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  Query,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';

// Firebase
import firebase from './index';
// Interfaces
import { IMessage } from '../interfaces';
// Utils
import { httpErrorHandler } from '../utils';

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
    httpErrorHandler(e);
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
    createdAt: serverTimestamp(),
    ownerId: user.uid,
  };
  try {
    const messagesRef = collection(firebase.firestoreDB, 'messages');

    await addDoc(messagesRef, message);

    return message;
  } catch (e) {
    httpErrorHandler(e);
    return null;
  }
};

export const getMessagesQuery = (userId: string): Query => {
  const messagesRef = collection(firebase.firestoreDB, 'messages');
  return query(
    messagesRef,
    where('ownerId', '==', userId),
    orderBy('createdAt', 'desc'),
  );
};
