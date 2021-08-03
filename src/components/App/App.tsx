import React, { FC } from 'react';
import PropTypes from 'prop-types';

import './App.scss';

const caseStudy = (a: number) => (a > 0 ? 'plus' : 'minus');

type Props = {
  a: number;
};

const App: FC<Props> = ({ a }) => (
  <div className="app">
    <header className="app-header">hi there {caseStudy(a)}</header>
  </div>
);
App.propTypes = {
  a: PropTypes.number.isRequired,
};

export default App;
