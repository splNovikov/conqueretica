import React, { FC } from 'react';
import Icon from '@ant-design/icons';
import classNames from 'classnames';

import { ILink } from '../../interfaces';

import './Linky.scss';
import { getIconByLink } from '../../utils';

const Linky: FC<{
  link: ILink;
  /* eslint-disable react/require-default-props */
  big?: boolean;
  colored?: boolean;
  ellipsed?: boolean;
  /* eslint-enable */
}> = ({ link, big, colored, ellipsed }) => {
  const icon = getIconByLink(link.href);

  return (
    <a
      className={classNames('linky', { colored, big, ellipsed })}
      aria-label={link.title}
      href={link.href}
    >
      {icon && <Icon component={icon} />}
      {link.title || link.href}
    </a>
  );
};

export default Linky;
