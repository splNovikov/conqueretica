import {
  collection,
  doc,
  Timestamp,
  DocumentReference,
  getDoc,
  setDoc,
  Query,
  query,
  where,
  orderBy,
  QueryDocumentSnapshot,
  deleteDoc,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
// Firebase
import firebase from './index';
// Interfaces
import { ICategory, IColumn } from '../interfaces';
// Utils
import { defaultErrorHandler, httpErrorHandler } from '../utils';

export const addCategory = async (
  title: string,
  column: IColumn,
): Promise<ICategory | null> => {
  if (!column?.id) {
    defaultErrorHandler('No Column');
    return null;
  }

  if (!title) {
    defaultErrorHandler('No Title');
    return null;
  }

  const category: ICategory = {
    id: uuidv4(),
    columnId: column.id,
    title,
    createdAt: Timestamp.now(),
    links: [],
  };
  try {
    const categoriesRef = collection(firebase.firestoreDB, 'categories');
    const categoriesDoc = doc(categoriesRef, category.id);

    await setDoc(categoriesDoc, category);
    return category;
  } catch (e) {
    httpErrorHandler(e);
    return null;
  }
};

export const deleteCategory = async (
  category: ICategory,
): Promise<ICategory | null> => {
  if (!category?.id) {
    defaultErrorHandler('No Category');
    return null;
  }

  try {
    await deleteDoc(doc(firebase.firestoreDB, 'categories', category.id));

    return category;
  } catch (e) {
    httpErrorHandler(e);
    return null;
  }
};

export const getCategoriesByColumnDoc = async (
  columnDoc: DocumentReference,
): Promise<ICategory[]> => {
  try {
    const columnDocumentSnapshot = await getDoc(columnDoc);
    const columnData = columnDocumentSnapshot.data();

    if (!columnData?.categories?.length) {
      defaultErrorHandler(
        `Categories not found for this Column: ${columnDoc.id}`,
      );
      return [];
    }

    return columnData.categories;
  } catch (e) {
    httpErrorHandler(e);
    return [];
  }
};

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
