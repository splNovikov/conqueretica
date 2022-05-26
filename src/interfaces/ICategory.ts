import { Timestamp } from 'firebase/firestore';

import { ILink } from './ILink';

export interface ICategory {
  id: string;
  columnId: string;
  title: string;
  createdAt: Timestamp;
  links: ILink[];
}
