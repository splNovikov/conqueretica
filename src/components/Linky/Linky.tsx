import React, { FC } from 'react';
import classNames from 'classnames';

import { ILink } from '../../interfaces';

import './Linky.scss';
import { identifyLink } from '../../utils';
import GoogleIcon from '../GoogleIcon';

const Linky: FC<{
  link: ILink;
  /* eslint-disable react/require-default-props */
  big?: boolean;
  colored?: boolean;
  ellipsed?: boolean;
  /* eslint-enable */
}> = ({ link, big, colored, ellipsed }) => {
  const iconType = identifyLink(link.href);

  return (
    <a
      className={classNames('linky', { colored, big, ellipsed })}
      aria-label={link.title}
      href={link.href}
    >
      {iconType && <GoogleIcon icon={iconType} size="x-small" />}
      {link.title || link.href}
    </a>
  );
};

export default Linky;
