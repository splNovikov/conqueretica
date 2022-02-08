import { ICategory } from './ICategory';

export interface IColumn {
  id: string;
  tabId: string;
  categories: ICategory[];
}
