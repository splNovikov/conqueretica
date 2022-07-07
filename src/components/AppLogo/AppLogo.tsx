import React, { FC } from 'react';
import { Image } from 'antd';
// Image
import logo from './conqueretica_main.png';

const AppLogo: FC<{ width: number }> = ({ width }) => {
  return <Image width={width} src={logo} />;
};

export default AppLogo;
