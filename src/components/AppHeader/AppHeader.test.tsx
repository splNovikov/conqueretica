import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
// Components
import AppHeader from './AppHeader';
// Test Data
import { user } from '../../__test_data__';

it('Header is rendering', () => {
  const wrapper = shallow(<AppHeader user={user} pathname="/links" />);
  expect(wrapper.hasClass('header')).toEqual(true);
});

describe('User', () => {
  it('User is passed', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppHeader user={user} pathname="/links" />
      </BrowserRouter>,
    );
    expect(wrapper.text().includes('Pavel Novikov')).toBe(true);
  });

  it('User is not passed', () => {
    const wrapper = mount(
      <BrowserRouter>
        <AppHeader user={null} pathname="/links" />
      </BrowserRouter>,
    );
    const userWrapper = wrapper.find('.user-wrapper');
    expect(userWrapper.exists()).toBe(false);
  });
});
