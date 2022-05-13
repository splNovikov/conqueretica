import {
  setDoc,
  deleteDoc,
  doc,
  collection,
  QuerySnapshot,
  serverTimestamp,
  getDocs,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
// Firebase
import firebase from './index';
import { deleteCategories } from './categories';
import { getCategoriesQuery } from './queryBuilders';
// Interfaces
import { ICategory, IColumn, ITab } from '../interfaces';
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
    const columnsRef = collection(firebase.firestoreDB, 'columns');
    const columnDoc = doc(columnsRef, column.id);

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
        const deletedCol = await deleteColumn(column.data());
        deletedColumns = [...deletedColumns, deletedCol];
      } else {
        defaultErrorHandler("Column's data is incorrect");
      }
    }),
  );

  return deletedColumns;
};

export const deleteColumn = async (
  column: IColumn,
): Promise<IColumn | null> => {
  if (!column?.id) {
    defaultErrorHandler('No Column');
    return null;
  }

  // 1. get all categories
  const categoriesQ = getCategoriesQuery(column);
  const categories: QuerySnapshot<ICategory> = await getDocs(categoriesQ);

  // 2. delete all categories
  await deleteCategories(categories);

  try {
    await deleteDoc(doc(firebase.firestoreDB, 'columns', column.id));

    return column;
  } catch (e) {
    httpErrorHandler(e);
    return null;
  }
};
