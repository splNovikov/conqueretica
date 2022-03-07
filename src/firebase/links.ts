import { collection, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
// Firebase
import firebase from './index';
// Interfaces
import { ICategory, IColumn, ILink } from '../interfaces';
// Utils
import { defaultErrorHandler, httpErrorHandler } from '../utils';
import { getCategoriesByColumnDoc } from './categories';

export const addLink = async (
  title: string,
  href: string,
  category: ICategory,
  column: IColumn,
): Promise<ILink | null> => {
  if (!title || !href || !category?.id || !column?.id) {
    defaultErrorHandler('Invalid Parameters Passed to Create new link');
    return null;
  }

  const link: ILink = {
    id: uuidv4(),
    title,
    href,
    createdAt: Timestamp.now(),
  };
  try {
    const columnsRef = collection(firebase.firestoreDB, 'columns');
    const columnDoc = doc(columnsRef, column.id);
    const categories = await getCategoriesByColumnDoc(columnDoc);

    if (!categories) {
      defaultErrorHandler(`Categories not found for this Column: ${column.id}`);
      return null;
    }

    const updatedCategories = categories.reduce((acc, cat) => {
      return cat.id === category.id
        ? [...acc, { ...cat, links: [...cat.links, link] }]
        : [...acc, cat];
    }, [] as ICategory[]);

    await updateDoc(columnDoc, { categories: updatedCategories });
    return link;
  } catch (e) {
    httpErrorHandler(e);
    return null;
  }
};
