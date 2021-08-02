import React from 'react';
import './App.scss';

const App = () => {
  const x = (a: number) => (a > 2 ? 3 : 4);
  return (
    <div className="app">
      <header className="app-header">hi there {x(2)}</header>
    </div>
  );
};

export default App;
