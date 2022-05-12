import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  QuerySnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { UserInfo } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';
// Firebase
import firebase from './index';
import { deleteColumns } from './columns';
import { getColumnsQuery } from './queryBuilders';
// Interfaces
import { IColumn, ITab } from '../interfaces';
// Utils
import { defaultErrorHandler, httpErrorHandler } from '../utils';

export const addTab = async (
  title: string,
  user: UserInfo | null | undefined,
): Promise<ITab | null> => {
  if (!title || !user?.uid) {
    defaultErrorHandler('No Title | User');
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
    const tabDoc = doc(tabsRef, tab.id);

    await setDoc(tabDoc, tab);

    return tab;
  } catch (e) {
    httpErrorHandler(e);
    return null;
  }
};

export const updateTab = async (
  tab: ITab,
  newTitle: string,
): Promise<ITab | null> => {
  if (!tab?.id) {
    defaultErrorHandler('No Tab');
    return null;
  }

  if (!newTitle) {
    defaultErrorHandler('Tab Title is absent');
    return null;
  }

  const updatedTab = { ...tab, title: newTitle };
  try {
    const tabsRef = collection(firebase.firestoreDB, 'tabs');
    const tabDoc = doc(tabsRef, tab.id);

    await updateDoc(tabDoc, updatedTab);

    return updatedTab;
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
  const columnsQ = getColumnsQuery(tab);

  if (!columnsQ) {
    defaultErrorHandler('Columns Query can not be formulated');
    return null;
  }

  const columns: QuerySnapshot<IColumn> = await getDocs(columnsQ);

  // 2. delete all columns
  await deleteColumns(columns);

  // 3. delete Tab
  try {
    await deleteDoc(doc(firebase.firestoreDB, 'tabs', tab.id));

    return tab;
  } catch (e) {
    httpErrorHandler(e);
    return null;
  }
};
