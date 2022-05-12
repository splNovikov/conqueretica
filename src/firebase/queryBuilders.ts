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

// todo tests
export const getCategoriesQuery = (column: IColumn): Query<ICategory> => {
  // todo: + update tests in columns.tests -> delete column
  // if (!column?.id) {
  //   return null;
  // }

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

// todo tests
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

// todo tests
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
