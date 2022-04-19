import { FieldValue } from 'firebase/firestore';

export interface IColumn {
  id: string;
  tabId: string;
  createdAt: FieldValue;
}
