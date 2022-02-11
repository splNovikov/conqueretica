import {
  arrayUnion,
  arrayRemove,
  collection,
  doc,
  updateDoc,
  Timestamp,
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
  if (!column) {
    defaultErrorHandler('No Column');
    return null;
  }

  const category: ICategory = {
    id: uuidv4(),
    title,
    createdAt: Timestamp.now(),
    links: [],
  };
  try {
    const columnsRef = collection(firebase.firestoreDB, 'columns');
    const columnDoc = doc(columnsRef, column.id);

    await updateDoc(columnDoc, { categories: arrayUnion(category) });
    return category;
  } catch (e) {
    httpErrorHandler(e);
    return null;
  }
};

export const deleteCategory = async (
  column: IColumn,
  category: ICategory,
): Promise<ICategory | null> => {
  if (!column || !category) {
    defaultErrorHandler('No Column || Category');
    return null;
  }

  try {
    const columnsRef = collection(firebase.firestoreDB, 'columns');
    const columnDoc = doc(columnsRef, column.id);

    await updateDoc(columnDoc, { categories: arrayRemove(category) });

    return category;
  } catch (e) {
    httpErrorHandler(e);
    return null;
  }
};
