import React, { FC } from 'react';
import { Typography } from 'antd';
// Interfaces
import { ILink } from '../../interfaces';
// Components
import GoogleIcon from '../GoogleIcon';
// Utils
import { identifyLink } from '../../utils';
// Styles
import './Linky.scss';

const { Link } = Typography;

const Linky: FC<{
  link: ILink;
  /* eslint-disable react/require-default-props */
  iconSize?: string;
  ellipsis?: boolean;
  /* eslint-enable */
}> = ({ link, iconSize, ellipsis }) => {
  const iconType = identifyLink(link.href);

  return (
    <Link className="linky" href={link.href} ellipsis={ellipsis} underline>
      {iconType && <GoogleIcon icon={iconType} size={iconSize} />}
      <span className="title">{link.title || link.href}</span>
    </Link>
  );
};

export default Linky;
