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
import { ICategory, IColumn, ITab } from '../interfaces';

const categoriesConverter = {
  toFirestore: (data: ICategory) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as ICategory,
};

export const getCategoriesQuery = (
  column: IColumn,
): Query<ICategory> | null => {
  if (!column?.id) {
    return null;
  }

  const categoriesRef = collection(
    firebase.firestoreDB,
    'categories',
  ).withConverter<ICategory>(categoriesConverter);

  return query(
    categoriesRef,
    where('columnId', '==', column.id),
    orderBy('createdAt', 'asc'),
  );
};

const columnsConverter = {
  toFirestore: (data: IColumn) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as IColumn,
};

export const getColumnsQuery = (tab: ITab): Query<IColumn> | null => {
  if (!tab?.id) {
    return null;
  }

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
