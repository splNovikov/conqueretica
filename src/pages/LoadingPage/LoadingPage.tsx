import React from 'react';
// Components
import AppLogo from '../../components/AppLogo';
// Styles
import './LoadingPage.scss';

const LoadingPage = () => {
  return (
    <div className="loading-page">
      <h1>Conqueretica</h1>
      <AppLogo width={300} />
      <h2>Loading...</h2>
    </div>
  );
};

export default LoadingPage;
