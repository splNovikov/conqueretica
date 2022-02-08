import React from 'react';
import { mount, ReactWrapper, shallow } from 'enzyme';
import * as authHooks from 'react-firebase-hooks/auth';
import * as firestoreHooks from 'react-firebase-hooks/firestore';
// Components
import LinksPage from './LinksPage';
import LinksPageView from './LinksPageView';
// Test Data
import { columns, importantLinks, user, tabs } from '../../__test_data__';

describe('LinksPage component', () => {
  let wrapper: ReactWrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it('LinksPage is rendering', () => {
    // @ts-ignore
    jest.spyOn(authHooks, 'useAuthState').mockImplementation(() => [user]);

    wrapper = mount(<LinksPage />);
  });

  describe('LinksPage - Auth Hooks', () => {
    it('No user - no Tabs', () => {
      // @ts-ignore
      jest.spyOn(authHooks, 'useAuthState').mockImplementation(() => []);
      wrapper = mount(<LinksPage />);

      const tabsElement = wrapper.find('Tabs');
      expect(tabsElement.exists()).toBe(false);
    });
  });

  describe('LinksPage FireStoreHooks', () => {
    it('Tabs are rendering', () => {
      // @ts-ignore
      jest.spyOn(authHooks, 'useAuthState').mockImplementation(() => [user]);
      jest
        .spyOn(firestoreHooks, 'useCollectionData')
        // @ts-ignore
        .mockImplementation(() => [tabs, false, undefined]);

      wrapper = mount(<LinksPage />);
      const tabsEl = wrapper.find('.tab');
      expect(tabsEl.length).toBe(3);
    });

    it('Tabs are rendering "Loading tabs progress..."', () => {
      // @ts-ignore
      jest.spyOn(authHooks, 'useAuthState').mockImplementation(() => [user]);
      jest
        .spyOn(firestoreHooks, 'useCollectionData')
        // @ts-ignore
        .mockImplementation(() => [[], true, undefined]);

      wrapper = mount(<LinksPage />);
      expect(wrapper.text()).toContain('loading tabs progress...');

      const tabsEl = wrapper.find('.tab');
      expect(tabsEl.length).toBe(0);
    });

    it('Error handling Error correctly"', () => {
      // @ts-ignore
      jest.spyOn(authHooks, 'useAuthState').mockImplementation(() => [user]);
      console.error = jest.fn();
      jest
        .spyOn(firestoreHooks, 'useCollectionData')
        // @ts-ignore
        .mockImplementation(() => [[], false, { message: 'err' }]);

      wrapper = mount(<LinksPage />);
      expect(console.error).toHaveBeenCalledWith({ message: 'err' });
    });
  });
});
