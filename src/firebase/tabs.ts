import {
  collection,
  doc,
  orderBy,
  query,
  Query,
  QueryDocumentSnapshot,
  serverTimestamp,
  setDoc,
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

    await setDoc(doc(tabsRef, tab.id), tab);

    return tab;
  } catch (e) {
    httpErrorHandler(e);
    return null;
  }
};

const tabsConverter = {
  toFirestore: (data: ITab) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as ITab,
};

export const getTabsQuery = (user: UserInfo): Query<ITab> => {
  const tabsRef = collection(firebase.firestoreDB, 'tabs').withConverter<ITab>(
    tabsConverter,
  );

  return query(
    tabsRef,
    where('ownerId', '==', user.uid),
    orderBy('createdAt', 'desc'),
  );
};
