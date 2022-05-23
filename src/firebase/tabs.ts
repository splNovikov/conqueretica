import {
  deleteDoc,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
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
  if (!title || !user?.uid) {
    defaultErrorHandler('No Title | User');
    return null;
  }

  const tab: ITab = {
    id: uuidv4(),
    title,
    createdAt: Timestamp.now(),
    ownerId: user.uid,
  };
  try {
    const tabRef = doc(firebase.firestoreDB, 'tabs', tab.id);

    await setDoc(tabRef, tab);
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
    const tabRef = doc(firebase.firestoreDB, 'tabs', tab.id);

    await updateDoc(tabRef, updatedTab);
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

  try {
    const tabRef = doc(firebase.firestoreDB, 'tabs', tab.id);

    await deleteDoc(tabRef);
    return tab;
  } catch (e) {
    httpErrorHandler(e);
    return null;
  }
};
