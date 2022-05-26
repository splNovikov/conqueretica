import React, { FC } from 'react';
import { Typography } from 'antd';
import classNames from 'classnames';
// Interfaces, Types
import { ILink } from '../../interfaces';
import { IconSize } from '../../types';
// Components
import GoogleIcon from '../GoogleIcon';
// Utils
import {
  identifyLink,
  deltaSeconds,
  getDeltaSecondsClassName,
} from '../../utils';
// Styles
import './Linky.scss';

const { Link } = Typography;

const Linky: FC<{
  link: ILink;
  iconSize?: IconSize;
  ellipsis?: boolean;
  // todo: tests for this handler
  updateLinkLastUsedHandler: (link: ILink) => void;
}> = ({ link, iconSize, ellipsis, updateLinkLastUsedHandler }) => {
  const iconType = identifyLink(link.href);
  const lastUsedDeltaSeconds = deltaSeconds(link.lastUsed);

  const handleLinkClick = () => {
    updateLinkLastUsedHandler(link);
  };

  return (
    <Link
      className={classNames(
        'linky',
        getDeltaSecondsClassName(lastUsedDeltaSeconds),
      )}
      href={link.href}
      ellipsis={ellipsis}
      underline
      onClick={handleLinkClick}
    >
      <div className="linky-icon-wrapper">
        {iconType && <GoogleIcon icon={iconType} size={iconSize} />}
      </div>

      <span className="linky-title">{link.title || link.href}</span>
    </Link>
  );
};

export default Linky;
