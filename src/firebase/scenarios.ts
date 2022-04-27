import { ICategory, ITab } from '../interfaces';
import { addColumn } from './columns';
import { addCategory } from './categories';

// todo: tests
export const addColumnAndCategory = async (
  categoryTitle: string,
  tab: ITab,
): Promise<ICategory | null> => {
  const column = await addColumn(tab);

  if (column?.id) {
    return addCategory(categoryTitle, column);
  }

  return null;
};
