import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
// Context
import { UserContext } from '../../context/authContext';
// Components
import AppHeader from './AppHeader';
// Test Data
import { user } from '../../__test_data__';

describe('AppHeader Component', () => {
  // Selectors
  const appHeaderSelector = 'header.app-header';
  const userAvatarSelector = 'span.app-header-user-avatar';
  const userSkeletonSelector = 'div.user-skeleton';
  // Wrappers
  let wrapper: ReactWrapper;

  const getWrappers = (w: ReactWrapper) => ({
    header: w.find(appHeaderSelector),
    userAvatar: w.find(userAvatarSelector),
    userSkeleton: w.find(userSkeletonSelector),
  });

  beforeEach(async () => {
    await act(async () => {
      wrapper = mount(
        <UserContext.Provider value={{ user }}>
          <BrowserRouter>
            <AppHeader />
          </BrowserRouter>
        </UserContext.Provider>,
      );
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
    wrapper.unmount();
  });

  it('AppHeader is rendering', () => {
    const { header, userAvatar, userSkeleton } = getWrappers(wrapper);

    expect(wrapper.exists()).toEqual(true);
    expect(header.exists()).toEqual(true);
    expect(userAvatar.exists()).toEqual(true);
    expect(userSkeleton.exists()).toEqual(false);
  });

  describe('User', () => {
    it('User is passed with photoURL', async () => {
      const { userAvatar } = getWrappers(wrapper);

      expect(userAvatar.text()).toBe('');
      expect(userAvatar.find('img').exists()).toBe(true);
    });

    it('User is passed without photoURL', async () => {
      const user2 = { displayName: 'Pavel Novikov' };
      await act(async () => {
        wrapper = mount(
          <UserContext.Provider value={{ user: user2 }}>
            <BrowserRouter>
              <AppHeader />
            </BrowserRouter>
          </UserContext.Provider>,
        );
      });

      const { userAvatar } = getWrappers(wrapper);

      expect(userAvatar.text()).toBe('PN');
      expect(userAvatar.find('img').exists()).toBe(false);
    });

    it('User is not passed', async () => {
      await act(async () => {
        wrapper = mount(
          <BrowserRouter>
            <AppHeader />
          </BrowserRouter>,
        );
      });

      const { userAvatar, userSkeleton } = getWrappers(wrapper);

      expect(userAvatar.exists()).toBe(false);
      expect(userSkeleton.exists()).toEqual(false);
    });
  });
});
