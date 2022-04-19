import { FieldValue } from 'firebase/firestore';

export interface IColumn {
  id: string;
  tabId: string;
  ownerId: string;
  createdAt: FieldValue;
  categories: string[];
}
