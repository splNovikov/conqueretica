import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  Query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import { UserInfo } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';
// Firebase
import firebase from './index';
// Interfaces
import { IColumn, ITab } from '../interfaces';
// Utils
import { defaultErrorHandler, httpErrorHandler } from '../utils';

// todo: check if I am able to create entities in DB without login???
export const addTab = async (
  title: string,
  user: UserInfo | null | undefined,
): Promise<ITab | null> => {
  if (!user?.uid) {
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

export const deleteTab = async (tab: ITab): Promise<ITab | null> => {
  if (!tab?.id) {
    defaultErrorHandler('No Tab');
    return null;
  }

  // 1. get all columns
  const columnsQ = firebase.getColumnsQuery(tab);
  const columns: QuerySnapshot<IColumn> = await getDocs(columnsQ);

  // 2. delete all columns
  await firebase.deleteColumns(columns);

  // 3. delete Tab
  try {
    await deleteDoc(doc(firebase.firestoreDB, 'tabs', tab.id));

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
    orderBy('createdAt', 'asc'),
  );
};
