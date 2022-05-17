import {
  deleteDoc,
  doc,
  getDocs,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from 'firebase/firestore';
// Firebase
import firebase from './index';
import { addColumn, deleteColumn } from './columns';
import { addCategory, deleteCategories } from './categories';
import { getCategoriesQuery, getColumnsQuery } from './queryBuilders';
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

  // 3. delete column
  return deleteColumn(column);
};

export const deleteColumnsScenario = async (
  columns: QuerySnapshot<IColumn>,
): Promise<(IColumn | null)[]> => {
  let deletedColumns: (IColumn | null)[] = [];

  await Promise.all(
    columns.docs.map(async (column: QueryDocumentSnapshot<IColumn>) => {
      if (column?.data && typeof column?.data === 'function') {
        const deletedCol = await deleteColumnScenario(column.data());
        deletedColumns = [...deletedColumns, deletedCol];
      } else {
        defaultErrorHandler("Column's data is incorrect");
      }
    }),
  );

  return deletedColumns;
};

export const deleteTabScenario = async (tab: ITab): Promise<ITab | null> => {
  if (!tab?.id) {
    defaultErrorHandler('No Tab');
    return null;
  }

  // 1. Get all columns
  const columnsQ = getColumnsQuery(tab);

  if (!columnsQ) {
    defaultErrorHandler('Columns Query can not be formulated');
    return null;
  }

  const columns: QuerySnapshot<IColumn> = await getDocs(columnsQ);

  // 2. Delete all columns with all content
  await deleteColumnsScenario(columns);

  // 3. Delete Tab
  // todo: it should be a function deleteTab
  try {
    await deleteDoc(doc(firebase.firestoreDB, 'tabs', tab.id));

    return tab;
  } catch (e) {
    httpErrorHandler(e);
    return null;
  }
};
