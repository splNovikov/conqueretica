import { FieldValue } from 'firebase/firestore';

import { ILink } from './ILink';

export interface ICategory {
  id: string;
  columnId: string;
  ownerId: string;
  title: string;
  createdAt: FieldValue;
  links: ILink[];
}
