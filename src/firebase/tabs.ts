import {
  addDoc,
  collection,
  orderBy,
  query,
  Query,
  QueryDocumentSnapshot,
  serverTimestamp,
  where,
} from 'firebase/firestore';
import { UserInfo } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';

// Firebase
import firebase from './index';
// Interfaces
import { ITab } from '../interfaces';
// Utils
import { defaultErrorHandler, httpErrorHandler } from '../utils';

export const addTab = async (
  title: string,
  user: UserInfo | null | undefined,
): Promise<ITab | null> => {
  if (!user) {
    defaultErrorHandler('No User');
    return null;
  }

  const tab: ITab = {
    id: uuidv4(),
    title,
    createdAt: serverTimestamp(),
    ownerId: user.uid,
  };
  try {
    const tabsRef = collection(firebase.firestoreDB, 'tabs');

    await addDoc(tabsRef, tab);

    return tab;
  } catch (e) {
    httpErrorHandler(e);
    return null;
  }
};

const tabsConverter = {
  toFirestore: (data: ITab[]) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as ITab[],
};

export const getTabsQuery = (user: UserInfo): Query<ITab[]> => {
  const messagesRef = collection(firebase.firestoreDB, 'tabs').withConverter(
    tabsConverter,
  );
  return query(
    messagesRef,
    where('ownerId', '==', user.uid),
    orderBy('createdAt', 'desc'),
  );
};
