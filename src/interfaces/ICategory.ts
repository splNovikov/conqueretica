import { ILink } from './ILink';

export interface ICategory {
  id: string;
  title: string;
  links: ILink[];
}
