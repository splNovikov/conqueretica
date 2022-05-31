import React, { FC } from 'react';
import { Popover, Typography } from 'antd';
// Interfaces, Types
import { ILink } from '../../interfaces';
import { IconSize } from '../../types';
// Components
import GoogleIcon from '../GoogleIcon';
import LinkyInfo from '../LinkyInfo';
// Utils
import { identifyLink } from '../../utils';
// Styles
import './Linky.scss';

const { Link } = Typography;

const Linky: FC<{
  link: ILink;
  iconSize?: IconSize;
  ellipsis?: boolean;
  updateLinkLastUsedHandler: (link: ILink) => void;
}> = ({ link, iconSize, ellipsis, updateLinkLastUsedHandler }) => {
  const iconType = identifyLink(link.href);

  const handleLinkClick = () => {
    updateLinkLastUsedHandler(link);
  };

  return (
    <Link
      className="linky"
      href={link.href}
      ellipsis={ellipsis}
      onClick={handleLinkClick}
    >
      <div className="linky-icon-wrapper">
        {iconType && <GoogleIcon icon={iconType} size={iconSize} />}
      </div>

      <Popover
        content={<LinkyInfo link={link} />}
        placement="topLeft"
        mouseEnterDelay={0.7}
        autoAdjustOverflow={false}
      >
        <span className="linky-title">{link.title || link.href}</span>
      </Popover>
    </Link>
  );
};

export default Linky;
