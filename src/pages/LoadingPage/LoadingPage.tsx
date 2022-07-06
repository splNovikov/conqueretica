import React from 'react';
import { Image } from 'antd';
// Image
import logo from './conqueretica_main.png';
// Styles
import './LoadingPage.scss';

const LoadingPage = () => {
  return (
    <div className="loading-page">
      <h1>Conqueretica</h1>
      <Image width={200} src={logo} />
      <h2>Loading...</h2>
    </div>
  );
};

export default LoadingPage;
