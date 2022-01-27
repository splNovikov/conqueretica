import React from 'react';
import { mount, shallow } from 'enzyme';
import * as hooks from 'react-firebase-hooks/auth';
// Components
import LinksPage from './LinksPage';
import LinksPageView from './LinksPageView';
// Test Data
import { columns, importantLinks, user } from '../../__test_data__';

it('LinksPage is rendering', () => {
  // @ts-ignore
  jest.spyOn(hooks, 'useAuthState').mockImplementation(() => [user]);

  shallow(<LinksPage />);
});

describe('LinksPage - Messages should be rendered', () => {
  it('Messages should be rendered when user is in state', () => {
    // @ts-ignore
    jest.spyOn(hooks, 'useAuthState').mockImplementation(() => [user]);

    const wrapper = mount(<LinksPage />);
    const messagesElement = wrapper.find('Messages');
    expect(messagesElement.exists()).toEqual(true);
  });
});

describe('LinksPageView - Messages should be rendered', () => {
  it('Messages should be rendered when user is in state', () => {
    const wrapper = shallow(
      <LinksPageView
        user={user}
        importantLinks={importantLinks}
        columns={columns}
        formSubmitHandler={() => ''}
      />,
    );

    const messagesElement = wrapper.find('Messages');
    expect(messagesElement.exists()).toEqual(true);
  });
});
