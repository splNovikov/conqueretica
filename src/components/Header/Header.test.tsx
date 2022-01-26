import React from 'react';
import { shallow } from 'enzyme';
// Components
import Header from './Header';
// Test Data
import { user } from '../../__test_data__';

it('Header is rendering', () => {
  const wrapper = shallow(<Header user={user} />);
  expect(wrapper.hasClass('header')).toEqual(true);
});

describe('User', () => {
  it('User is passed', () => {
    const wrapper = shallow(<Header user={user} />);
    expect(wrapper.text().includes('Pavel Novikov')).toBe(true);
  });

  it('User is not passed', () => {
    const wrapper = shallow(<Header user={null} />);
    const userWrapper = wrapper.find('.user-wrapper');
    expect(userWrapper.exists()).toBe(false);
  });
});
