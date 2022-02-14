import React from 'react';
import { mount } from 'enzyme';
import * as authHooks from 'react-firebase-hooks/auth';
import * as firestoreHooks from 'react-firebase-hooks/firestore';
// Components
import LinksPage from './LinksPage';
// Test Data
import { user, tabs, columns } from '../../__test_data__';

describe('LinksPage component', () => {
  let authSpy: any;
  let collectionSpy: any;
  let wrapper: any;

  beforeEach(() => {
    authSpy = jest
      .spyOn(authHooks, 'useAuthState')
      // @ts-ignore
      .mockImplementation(() => [user]);
    collectionSpy = jest
      .spyOn(firestoreHooks, 'useCollectionData')
      // @ts-ignore
      .mockImplementation((query) => {
        if (!query) {
          return [];
        }

        // @ts-ignore
        // eslint-disable-next-line no-underscore-dangle
        const dataType = query._query.path.segments[0];

        if (dataType === 'tabs') {
          return [tabs, false, undefined];
        }

        if (dataType === 'columns') {
          return [columns, false, undefined];
        }

        return [];
      });
  });

  afterEach(() => {
    authSpy.mockReset();
    collectionSpy.mockReset();
    wrapper.unmount();
  });

  it('LinksPage is rendering', () => {
    wrapper = mount(<LinksPage />);
  });

  // todo: add tests no user - no tabs, no columns, no Add Tab, no Add Column
  it('No user - no Tabs', () => {
    authSpy.mockReset();
    authSpy = jest
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
    collectionSpy.mockReset();
    collectionSpy = jest
      .spyOn(firestoreHooks, 'useCollectionData')
      // @ts-ignore
      .mockImplementation(() => [[], true, undefined]);

    wrapper = mount(<LinksPage />);
    expect(wrapper.text()).toContain('loading tabs progress...');

    const tabsEl = wrapper.find('.tab');
    expect(tabsEl.length).toBe(0);
  });

  it('Error handling Error correctly"', () => {
    console.error = jest.fn();
    collectionSpy.mockReset();
    collectionSpy = jest
      .spyOn(firestoreHooks, 'useCollectionData')
      // @ts-ignore
      .mockImplementation(() => [[], false, { message: 'err' }]);

    wrapper = mount(<LinksPage />);
    expect(console.error).toHaveBeenCalledWith({ message: 'err' });
  });
});

// todo: test somehow behaviour of adding tabs with columns removing it and removing selected tab
