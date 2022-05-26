import { Timestamp } from 'firebase/firestore';

export interface ILink {
  id: string;
  href: string;
  title: string;
  createdAt: Timestamp;
  lastUsed: Timestamp;
}
