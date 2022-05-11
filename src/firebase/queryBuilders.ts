import {
  collection,
  orderBy,
  query,
  Query,
  QueryDocumentSnapshot,
  where,
} from 'firebase/firestore';
// Firebase
import firebase from './index';
// Interfaces
import { ICategory, IColumn } from '../interfaces';

const categoriesConverter = {
  toFirestore: (data: ICategory) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as ICategory,
};

// todo tests
export const getCategoriesQuery = (column: IColumn): Query<ICategory> => {
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
