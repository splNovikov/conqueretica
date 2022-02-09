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
import { v4 as uuidv4 } from 'uuid';
// Firebase
import firebase from './index';
// Interfaces
import { IColumn, ITab } from '../interfaces';
// Utils
import { defaultErrorHandler, httpErrorHandler } from '../utils';

export const addColumn = async (tab: ITab): Promise<IColumn | null> => {
  if (!tab) {
    defaultErrorHandler('No Tab');
    return null;
  }

  const column: IColumn = {
    id: uuidv4(),
    createdAt: serverTimestamp(),
    tabId: tab.id,
    categories: [],
  };
  try {
    const columnsRef = collection(firebase.firestoreDB, 'columns');

    await addDoc(columnsRef, column);

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
    orderBy('createdAt', 'desc'),
  );
};
