import React, { FC } from 'react';
import classNames from 'classnames';

import { ILink } from '../../interfaces';

import './Linky.scss';

const Linky: FC<{
  link: ILink;
  /* eslint-disable react/require-default-props */
  big?: boolean;
  colored?: boolean;
  ellipsed?: boolean;
  /* eslint-enable */
}> = ({ link, big, colored, ellipsed }) => (
  <a
    className={classNames('linky', { colored, big, ellipsed })}
    aria-label={link.title}
    href={link.href}
  >
    {link.title || link.href}
  </a>
);

export default Linky;
