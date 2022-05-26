import { Timestamp } from 'firebase/firestore';

export interface IColumn {
  id: string;
  tabId: string;
  createdAt: Timestamp;
}
