import {
  collection,
  orderBy,
  query,
  Query,
  QueryDocumentSnapshot,
  where,
} from 'firebase/firestore';
import { UserInfo } from 'firebase/auth';
// Firebase
import firebase from './index';
// Interfaces
import { IColumn, ITab } from '../interfaces';
// Utils

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
