import {
  setDoc,
  deleteDoc,
  doc,
  collection,
  orderBy,
  query,
  Query,
  QuerySnapshot,
  QueryDocumentSnapshot,
  serverTimestamp,
  where,
  getDocs,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
// Firebase
import firebase from './index';
// Interfaces
import { ICategory, IColumn, ITab } from '../interfaces';
// Utils
import { defaultErrorHandler, httpErrorHandler } from '../utils';
import { deleteCategories, getCategoriesQuery } from './categories';

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
): Promise<void> => {
  await columns.forEach((column) => {
    deleteColumn(column.data());
  });
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

const columnsConverter = {
  toFirestore: (data: IColumn) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as IColumn,
};

export const getColumnsQuery = (tab: ITab): Query<IColumn> => {
  const columnsRef = collection(
    firebase.firestoreDB,
    'columns',
  ).withConverter<IColumn>(columnsConverter);

  return query(
    columnsRef,
    where('tabId', '==', tab.id),
    orderBy('createdAt', 'asc'),
  );
};
