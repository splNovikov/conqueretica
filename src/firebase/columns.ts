import { setDoc, doc, deleteDoc, Timestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
// Firebase
import firebase from './index';
// Interfaces
import { IColumn, ITab } from '../interfaces';
// Utils
import { defaultErrorHandler, httpErrorHandler } from '../utils';

export const addColumn = async (tab: ITab): Promise<IColumn | null> => {
  if (!tab?.id) {
    defaultErrorHandler('No Tab');
    return null;
  }

  const column: IColumn = {
    id: uuidv4(),
    createdAt: Timestamp.now(),
    tabId: tab.id,
  };
  try {
    const columnRef = doc(firebase.firestoreDB, 'columns', column.id);

    await setDoc(columnRef, column);
    return column;
  } catch (e) {
    httpErrorHandler(e);
    return null;
  }
};

export const deleteColumn = async (
  column: IColumn,
): Promise<IColumn | null> => {
  if (!column?.id) {
    defaultErrorHandler('No Column');
    return null;
  }

  try {
    const columnRef = doc(firebase.firestoreDB, 'columns', column.id);

    await deleteDoc(columnRef);
    return column;
  } catch (e) {
    httpErrorHandler(e);
    return null;
  }
};
