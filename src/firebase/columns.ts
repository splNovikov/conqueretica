import {
  setDoc,
  doc,
  QuerySnapshot,
  serverTimestamp,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
// Firebase
import firebase from './index';
import { deleteColumnScenario } from './scenarios';
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

export const deleteColumns = async (
  columns: QuerySnapshot<IColumn>,
): Promise<(IColumn | null)[]> => {
  let deletedColumns: (IColumn | null)[] = [];

  await Promise.all(
    columns.docs.map(async (column: QueryDocumentSnapshot<IColumn>) => {
      if (column?.data && typeof column?.data === 'function') {
        const deletedCol = await deleteColumnScenario(column.data());
        deletedColumns = [...deletedColumns, deletedCol];
      } else {
        defaultErrorHandler("Column's data is incorrect");
      }
    }),
  );

  return deletedColumns;
};
