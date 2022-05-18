import React from 'react';
import { mount } from 'enzyme';
import * as authHooks from 'react-firebase-hooks/auth';
import * as firestoreHooks from 'react-firebase-hooks/firestore';
// Components
import LinksPage from './LinksPage';
// Utils
import { mockUseCollectionData } from '../../testUtils';
// Test Data
import { user } from '../../__test_data__';

describe('LinksPage component', () => {
  let wrapper: any;

  beforeEach(() => {
    jest
      .spyOn(authHooks, 'useAuthState')
      // @ts-ignore
      .mockImplementation(() => [user]);
    jest
      .spyOn(firestoreHooks, 'useCollectionData')
      // @ts-ignore
      .mockImplementation(mockUseCollectionData());
  });

  afterEach(() => {
    jest.resetAllMocks();
    wrapper.unmount();
  });

  it('LinksPage is rendering', () => {
    wrapper = mount(<LinksPage />);
  });

  it('No user - no Tabs', () => {
    jest
      .spyOn(authHooks, 'useAuthState')
      // @ts-ignore
      .mockImplementation(() => []);

    wrapper = mount(<LinksPage />);

    const tabsElement = wrapper.find('Tabs');
    expect(tabsElement.exists()).toBe(false);
  });

  it('Tabs are rendering', () => {
    wrapper = mount(<LinksPage />);
    const tabsEl = wrapper.find('.tab');
    expect(tabsEl.length).toBe(3);
  });

  it('Tabs are rendering "Loading tabs progress..."', () => {
    jest
      .spyOn(firestoreHooks, 'useCollectionData')
      // @ts-ignore
      .mockImplementation(() => [[], true, undefined]);

    wrapper = mount(<LinksPage />);

    const skeleton = wrapper.find('.tabs-skeleton');
    expect(skeleton.exists()).toBe(true);

    const tabsEl = wrapper.find('.tab');
    expect(tabsEl.length).toBe(0);
  });

  it('Error handling Error correctly"', () => {
    console.error = jest.fn();
    jest
      .spyOn(firestoreHooks, 'useCollectionData')
      // @ts-ignore
      .mockImplementation(() => [[], false, { message: 'err' }]);

    wrapper = mount(<LinksPage />);
    expect(console.error).toHaveBeenCalledWith({ message: 'err' });
  });
});
