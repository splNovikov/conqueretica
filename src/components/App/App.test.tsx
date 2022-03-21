import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { shallow } from 'enzyme';

import App from './App';

describe('App Component', () => {
  it('App is rendering', () => {
    const wrapper = shallow(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    expect(wrapper.exists()).toEqual(true);
  });
});
