import { FieldValue } from 'firebase/firestore';

import { ICategory } from './ICategory';

export interface IColumn {
  id: string;
  tabId: string;
  createdAt: FieldValue;
  categories: ICategory[];
}
