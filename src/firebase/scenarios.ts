import { deleteDoc, doc, getDocs, QuerySnapshot } from 'firebase/firestore';
// Firebase
import firebase from './index';
import { addColumn } from './columns';
import { addCategory, deleteCategories, deleteCategory } from './categories';
import { getCategoriesQuery } from './queryBuilders';
// Interfaces
import { ICategory, IColumn, ITab } from '../interfaces';
// Utils
import { defaultErrorHandler, httpErrorHandler } from '../utils';

export const addCategoryWithColumnScenario = async (
  categoryTitle: string,
  tab: ITab,
): Promise<ICategory | null> => {
  const column = await addColumn(tab);

  if (column?.id) {
    return addCategory(categoryTitle, column);
  }

  return null;
};

export const deleteColumnScenario = async (
  column: IColumn,
): Promise<IColumn | null> => {
  if (!column?.id) {
    defaultErrorHandler('No Column');
    return null;
  }

  // 1. get all categories
  const categoriesQ = getCategoriesQuery(column);

  if (!categoriesQ) {
    defaultErrorHandler('Categories Query can not be formulated');
    return null;
  }

  const categories: QuerySnapshot<ICategory> = await getDocs(categoriesQ);

  // 2. delete all categories
  await deleteCategories(categories);

  try {
    await deleteDoc(doc(firebase.firestoreDB, 'columns', column.id));

    return column;
  } catch (e) {
    httpErrorHandler(e);
    return null;
  }
};

export const deleteCategoryWithColumnScenario = async (
  category: ICategory,
  column: IColumn,
): Promise<ICategory | null> => {
  // todo: update the logic
  // there should be used deleteColumnScenario and tha is it.

  const [cat] = await Promise.all([
    deleteCategory(category),
    deleteColumnScenario(column),
  ]);

  return cat;
};
