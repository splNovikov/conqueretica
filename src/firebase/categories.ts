import {
  collection,
  doc,
  Timestamp,
  setDoc,
  deleteDoc,
  QuerySnapshot,
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

export const deleteCategories = async (
  categories: QuerySnapshot<ICategory>,
): Promise<void> => {
  await categories.forEach((category) => {
    if (category?.data && typeof category?.data === 'function') {
      deleteCategory(category.data());
    }
  });
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
