import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
// Components
import UserMenu from './UserMenu';
// Test Data
import { user } from '../../__test_data__';

describe('UserMenu Component', () => {
  // Selectors
  const userMenuSelector = 'div.user-menu';
  const signOutButtonSelector = 'button.sign-out';
  const userNameBlockSelector = 'div.ant-card-meta-title';
  const userEmailBlockSelector = 'div.ant-card-meta-description';
  // Wrappers
  let wrapper: ReactWrapper;

  const getWrappers = (w: ReactWrapper) => ({
    userMenu: w.find(userMenuSelector),
    userNameBlock: w.find(userNameBlockSelector),
    userEmailBlock: w.find(userEmailBlockSelector),
    signOutButton: w.find(signOutButtonSelector),
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe('UserMenu Component is rendering elements', () => {
    beforeEach(() => {
      wrapper = mount(<UserMenu user={user} />);
    });

    it('UserMenu Component is rendering correctly', () => {
      const { userMenu, userNameBlock, userEmailBlock, signOutButton } =
        getWrappers(wrapper);

      expect(userMenu.exists()).toBe(true);
      expect(userNameBlock.exists()).toBe(true);
      expect(userEmailBlock.exists()).toBe(true);
      expect(signOutButton.exists()).toBe(true);
      expect(userNameBlock.text()).toBe(user.displayName);
      expect(userEmailBlock.text()).toBe(user.email);
    });
  });
});
