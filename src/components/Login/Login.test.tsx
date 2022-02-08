import React from 'react';
import { shallow } from 'enzyme';

import Login from './Login';

it('Login is rendering', () => {
  const wrapper = shallow(<Login />);
  expect(wrapper.hasClass('login')).toEqual(true);
});
