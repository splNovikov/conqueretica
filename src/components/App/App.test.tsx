import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

it('App is rendering', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.hasClass('app')).toEqual(true);
});
