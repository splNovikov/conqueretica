import {
  addDoc,
  collection,
  orderBy,
  Query,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { UserInfo } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';

// Firebase
import firebase from './index';
// Interfaces
import { IMessage } from '../interfaces';
// Utils
import { defaultErrorHandler, httpErrorHandler } from '../utils';

export const sendMessage = async (
  text: string,
  user: UserInfo | null | undefined,
): Promise<IMessage | null> => {
  if (!user) {
    defaultErrorHandler('No User');
    return null;
  }

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
