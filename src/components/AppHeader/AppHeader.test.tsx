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
        <BrowserRouter>
          <AppHeader user={user} pathname="/links" authInProgress={false} />
        </BrowserRouter>,
      );
    });
  });

  afterEach(() => {
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
          <BrowserRouter>
            <AppHeader user={user2} pathname="/links" authInProgress={false} />
          </BrowserRouter>,
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
            <AppHeader user={null} pathname="/links" authInProgress={false} />
          </BrowserRouter>,
        );
      });

      const { userAvatar, userSkeleton } = getWrappers(wrapper);

      expect(userAvatar.exists()).toBe(false);
      expect(userSkeleton.exists()).toEqual(false);
    });

    it('Spinner is showed', async () => {
      await act(async () => {
        wrapper = mount(
          <BrowserRouter>
            <AppHeader user={null} pathname="/links" authInProgress />
          </BrowserRouter>,
        );
      });

      const { userAvatar, userSkeleton } = getWrappers(wrapper);

      expect(userAvatar.exists()).toBe(false);
      expect(userSkeleton.exists()).toEqual(true);
    });
  });
});
