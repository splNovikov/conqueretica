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

describe('User', () => {
  it('User is passed', () => {
    const wrapper = shallow(<Header user={user as User} />);
    expect(wrapper.text().includes('Pavel Novikov')).toBe(true);
  });

  it('User is not passed', () => {
    const wrapper = shallow(<Header user={null} />);
    const userWrapper = wrapper.find('.user-wrapper');
    expect(userWrapper.exists()).toBe(false);
  });
});
