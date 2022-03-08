import { FieldValue } from 'firebase/firestore';

export interface ILink {
  id: string;
  href: string;
  title: string;
  createdAt: FieldValue;
}
