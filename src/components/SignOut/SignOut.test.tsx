import React from 'react';
import { shallow } from 'enzyme';

import SignOut from './SignOut';

it('SignOut is rendering', () => {
  const wrapper = shallow(<SignOut />);
  expect(wrapper.hasClass('sign-out')).toEqual(true);
});
