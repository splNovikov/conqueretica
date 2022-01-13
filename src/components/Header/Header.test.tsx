import React from 'react';
import { shallow } from 'enzyme';
import { User } from 'firebase/auth';
// Components
import Header from './Header';

const user = {
  displayName: 'Pavel Novikov',
};

it('Header is rendering', () => {
  const wrapper = shallow(<Header user={user as User} />);
  expect(wrapper.hasClass('header')).toEqual(true);
});

// todo add tests for displayName
