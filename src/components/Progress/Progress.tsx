import React, { FC } from 'react';
import { Progress } from 'antd';

// todo: We should have colors in variables
const ProgressBar: FC = () => (
  <Progress type="circle" percent={30} strokeColor="#d8eacc" />
);

export default ProgressBar;
