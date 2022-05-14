import { ICategory, IColumn, ITab } from '../interfaces';
import { addColumn, deleteColumn } from './columns';
import { addCategory, deleteCategory } from './categories';

// todo: tests
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

// todo: tests
export const deleteCategoryWithColumnScenario = async (
  category: ICategory,
  column: IColumn,
): Promise<ICategory | null> => {
  // 1. Delete Category
  const cat = await deleteCategory(category);

  // 2. Delete Column
  await deleteColumn(column);

  return cat;
};

// todo: deleteTabWithContent, deleteColumnWithContent - are scenarios either
