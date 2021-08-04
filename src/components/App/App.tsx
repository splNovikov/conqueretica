import React, { FC } from 'react';

import './App.scss';
import Button from '../Button';

const App: FC = () => (
  <div className="app">
    <header className="app-header">
      hi there <Button aaa={1} htmlType="submit" />
    </header>
  </div>
);

export default App;
