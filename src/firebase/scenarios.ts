import {
  getDocs,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from 'firebase/firestore';
// Firebase
import { deleteTab } from './tabs';
import { addColumn, deleteColumn } from './columns';
import { addCategory, deleteCategory } from './categories';
import { getCategoriesQuery, getColumnsQuery } from './queryBuilders';
// Interfaces
import { ICategory, IColumn, ITab } from '../interfaces';
// Utils
import { defaultErrorHandler } from '../utils';

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

export const deleteCategoriesScenario = async (
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
  await deleteCategoriesScenario(categories);

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
  return deleteTab(tab);
};
