import React from 'react';
// Context
import { AuthContextProvider } from '../../context/authContext';
// Components
import Router from '../../router/Router';
import UIConfigProvider from '../UIConfigProvider';

const App = () => {
  return (
    <UIConfigProvider>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </UIConfigProvider>
  );
};

export default App;
