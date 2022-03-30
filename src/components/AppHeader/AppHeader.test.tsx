import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
// Components
import AppHeader from './AppHeader';
// Test Data
import { user } from '../../__test_data__';

it('Header is rendering', () => {
  const wrapper = shallow(
    <AppHeader user={user} pathname="/links" authInProgress={false} />,
  );
  expect(wrapper.hasClass('header')).toEqual(true);
});

describe('User', () => {
  it('User is passed', async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(
        <BrowserRouter>
          <AppHeader user={user} pathname="/links" authInProgress={false} />
        </BrowserRouter>,
      );
    });

    const userNameEl = wrapper.find('span.user-name');
    expect(userNameEl.text()).toBe('PN');
  });

  it('User is not passed', async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(
        <BrowserRouter>
          <AppHeader user={null} pathname="/links" authInProgress={false} />
        </BrowserRouter>,
      );
    });

    const userWrapper = wrapper.find('.user-wrapper');
    expect(userWrapper.exists()).toBe(false);
  });
});
