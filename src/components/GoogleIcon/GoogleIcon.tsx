import React, { FC } from 'react';
import classNames from 'classnames';
// Types
import { IconName, IconSize } from '../../types';
// Styles
import './GoogleIcon.scss';

const GoogleIcon: FC<{
  icon: IconName;
  size?: IconSize;
}> = ({ icon, size }) => (
  <div className={classNames('google-icon', icon, size)} />
);

GoogleIcon.defaultProps = {
  size: 'normal',
};

export default GoogleIcon;
