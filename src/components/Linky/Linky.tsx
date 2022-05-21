import React, { FC } from 'react';
import { Typography } from 'antd';
// Interfaces, Types
import { ILink } from '../../interfaces';
import { IconSize } from '../../types';
// Components
import GoogleIcon from '../GoogleIcon';
// Utils
import { identifyLink } from '../../utils';
// Styles
import './Linky.scss';

const { Link } = Typography;

const Linky: FC<{
  link: ILink;
  iconSize?: IconSize;
  ellipsis?: boolean;
}> = ({ link, iconSize, ellipsis }) => {
  const iconType = identifyLink(link.href);

  return (
    <Link className="linky" href={link.href} ellipsis={ellipsis} underline>
      <div className="linky-icon-wrapper">
        {iconType && <GoogleIcon icon={iconType} size={iconSize} />}
      </div>

      <span className="linky-title">{link.title || link.href}</span>
    </Link>
  );
};

export default Linky;
