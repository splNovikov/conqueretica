import { setDoc, doc, serverTimestamp, deleteDoc } from 'firebase/firestore';
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
    createdAt: serverTimestamp(),
    tabId: tab.id,
  };
  try {
    const columnDoc = doc(firebase.firestoreDB, 'columns', column.id);

    await setDoc(columnDoc, column);

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
    await deleteDoc(doc(firebase.firestoreDB, 'columns', column.id));

    return column;
  } catch (e) {
    httpErrorHandler(e);
    return null;
  }
};
