import { ICategory, IColumn, ITab } from '../interfaces';
import { addColumn, deleteColumn } from './columns';
import { addCategory, deleteCategory } from './categories';

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

export const deleteCategoryWithColumnScenario = async (
  category: ICategory,
  column: IColumn,
): Promise<ICategory | null> => {
  // todo: update the logic
  // there should be used deleteColumnScenario and tha is it.

  const [cat] = await Promise.all([
    deleteCategory(category),
    deleteColumn(column),
  ]);

  return cat;
};

// todo: deleteTabWithContent, deleteColumnWithContent - are scenarios either
