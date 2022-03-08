import React, { FC } from 'react';
import classNames from 'classnames';
// Styles
import './GoogleIcon.scss';

const GoogleIcon: FC<{
  icon: string;
  size?: string;
}> = ({ icon, size }) => (
  <div className={classNames('google-icon', icon, size)} />
);

GoogleIcon.defaultProps = {
  size: 'normal',
};

export default GoogleIcon;
