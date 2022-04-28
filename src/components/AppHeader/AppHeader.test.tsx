import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
// Components
import AppHeader from './AppHeader';
// Test Data
import { user } from '../../__test_data__';

describe('AppHeader Component', () => {
  // Selectors
  const appHeaderSelector = 'header.app-header';
  const userNameSelector = 'span.user-name';
  // Wrappers
  let wrapper: ReactWrapper;
  let header: ReactWrapper;
  let userNameEl: ReactWrapper;

  beforeEach(async () => {
    await act(async () => {
      wrapper = mount(
        <BrowserRouter>
          <AppHeader user={user} pathname="/links" authInProgress={false} />
        </BrowserRouter>,
      );
    });

    header = wrapper.find(appHeaderSelector);
    userNameEl = wrapper.find(userNameSelector);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('AppHeader is rendering', () => {
    expect(wrapper.exists()).toEqual(true);
    expect(header.exists()).toEqual(true);
    expect(userNameEl.exists()).toEqual(true);
  });

  describe('User', () => {
    it('User is passed', async () => {
      expect(userNameEl.text()).toBe('PN');
    });

    it('User is not passed', async () => {
      await act(async () => {
        wrapper = mount(
          <BrowserRouter>
            <AppHeader user={null} pathname="/links" authInProgress={false} />
          </BrowserRouter>,
        );
      });

      const userNameEl2 = wrapper.find(userNameSelector);

      expect(userNameEl2.exists()).toBe(false);
    });
  });
});
