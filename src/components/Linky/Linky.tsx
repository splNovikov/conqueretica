import React, { FC } from 'react';
import classNames from 'classnames';

import { ILink } from '../../interfaces';

import './Linky.scss';
import { identifyLink } from '../../utils';
import GoogleIcon from '../GoogleIcon';

const Linky: FC<{
  link: ILink;
  /* eslint-disable react/require-default-props */
  iconSize?: string;
  big?: boolean;
  colored?: boolean;
  ellipsed?: boolean;
  /* eslint-enable */
}> = ({ link, iconSize, big, colored, ellipsed }) => {
  const iconType = identifyLink(link.href);

  return (
    <a
      className={classNames('linky', { colored, big, ellipsed })}
      aria-label={link.title}
      href={link.href}
    >
      {iconType && <GoogleIcon icon={iconType} size={iconSize} />}
      {link.title || link.href}
    </a>
  );
};

export default Linky;
