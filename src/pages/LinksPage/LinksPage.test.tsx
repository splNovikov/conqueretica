import React from 'react';
import { mount, shallow } from 'enzyme';
import * as authHooks from 'react-firebase-hooks/auth';
import * as firestoreHooks from 'react-firebase-hooks/firestore';
// Components
import LinksPage from './LinksPage';
import LinksPageView from './LinksPageView';
// Test Data
import { columns, importantLinks, user, tabs } from '../../__test_data__';

// todo: add beforeach and cover the code WITH SENSE

it('LinksPage is rendering', () => {
  // @ts-ignore
  jest.spyOn(authHooks, 'useAuthState').mockImplementation(() => [user]);

  shallow(<LinksPage />);
});

describe('LinksPage - Auth Hooks', () => {
  it('No user - no Tabs', () => {
    // @ts-ignore
    jest.spyOn(authHooks, 'useAuthState').mockImplementation(() => []);
    const wrapper = mount(<LinksPage />);

    const tabsElement = wrapper.find('Tabs');
    expect(tabsElement.exists()).toBe(false);
  });

  it('Messages should be rendered when user is in state', () => {
    // @ts-ignore
    jest.spyOn(authHooks, 'useAuthState').mockImplementation(() => [user]);

    const wrapper = mount(<LinksPage />);
    const messagesElement = wrapper.find('Messages');
    expect(messagesElement.exists()).toEqual(true);
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

    const wrapper = mount(<LinksPage />);
    const tabsEl = wrapper.find('.tab');
    expect(tabsEl.length).toBe(3);
  });

  it('Tabs are rendering "Loading message"', () => {
    // @ts-ignore
    jest.spyOn(authHooks, 'useAuthState').mockImplementation(() => [user]);
    jest
      .spyOn(firestoreHooks, 'useCollectionData')
      // @ts-ignore
      .mockImplementation(() => [[], true, undefined]);

    const wrapper = mount(<LinksPage />);
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

    mount(<LinksPage />);
    expect(console.error).toHaveBeenCalledWith({ message: 'err' });
  });
});

describe('LinksPageView - Messages should be rendered', () => {
  it('Messages should be rendered when user is in state', () => {
    const wrapper = shallow(
      <LinksPageView
        user={user}
        loadingTabs={false}
        importantLinks={importantLinks}
        columns={columns}
        messagesFormSubmitHandler={() => ''}
        tabs={tabs}
        tabsFormSubmitHandler={() => ''}
        selectedTab={tabs[0]}
      />,
    );

    const messagesElement = wrapper.find('Messages');
    expect(messagesElement.exists()).toEqual(true);

    const tabsElement = wrapper.find('Tabs');
    expect(tabsElement.exists()).toEqual(true);
  });
});
