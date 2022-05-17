import {
  doc,
  Timestamp,
  setDoc,
  deleteDoc,
  QuerySnapshot,
  QueryDocumentSnapshot,
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
    const categoriesDoc = doc(firebase.firestoreDB, 'categories', category.id);

    await setDoc(categoriesDoc, category);
    return category;
  } catch (e) {
    httpErrorHandler(e);
    return null;
  }
};

export const deleteCategories = async (
  categories: QuerySnapshot<ICategory>,
): Promise<(ICategory | null)[]> => {
  let deletedCategories: (ICategory | null)[] = [];

  await Promise.all(
    categories.docs.map(async (category: QueryDocumentSnapshot<ICategory>) => {
      if (category?.data && typeof category?.data === 'function') {
        const deletedCat = await deleteCategory(category.data());
        deletedCategories = [...deletedCategories, deletedCat];
      } else {
        defaultErrorHandler('Categories data is incorrect');
      }
    }),
  );

  return deletedCategories;
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
