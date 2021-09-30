import React, { FC } from 'react';
import { Progress } from 'antd';

const ProgressBar: FC = () => (
  <Progress type="circle" percent={75} strokeColor="#d8eacc" />
);

export default ProgressBar;
