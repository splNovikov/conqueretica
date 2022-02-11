import { FieldValue } from 'firebase/firestore';

import { ILink } from './ILink';

export interface ICategory {
  id: string;
  title: string;
  createdAt: FieldValue;
  links: ILink[];
}
