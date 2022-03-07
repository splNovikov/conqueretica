import React, { FC } from 'react';

import { ILink } from '../../interfaces';

import './ImportantLinks.scss';

import Linky from '../Linky';

const ImportantLinks: FC<{
  links: ILink[];
}> = ({ links }) => (
  <div className="important-links">
    {links.map((l: ILink) => (
      <Linky key={l.id} link={l} colored />
    ))}
  </div>
);

export default ImportantLinks;
