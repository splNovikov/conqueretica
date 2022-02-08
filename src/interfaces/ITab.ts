import { FieldValue } from 'firebase/firestore';

export interface ITab {
  id: string;
  ownerId: string;
  title: string;
  createdAt: FieldValue;
}
