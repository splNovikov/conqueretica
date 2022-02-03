import React from 'react';
import * as hooks from 'react-firebase-hooks/firestore';
import { mount } from 'enzyme';
// Components
import Tabs from './Messages';
// Test Data
import { user, messages } from '../../__test_data__';

describe('Messages', () => {
  it('Messages Component is rendering', () => {
    jest
      .spyOn(hooks, 'useCollectionData')
      .mockImplementation(() => [[], false, undefined]);

    mount(<Tabs user={user} />);
  });

  it('Messages is rendering', () => {
    jest
      .spyOn(hooks, 'useCollectionData')
      // @ts-ignore
      .mockImplementation(() => [messages, false, undefined]);

    const wrapper = mount(<Tabs user={user} />);
    const messagesEl = wrapper.find('.message');
    expect(messagesEl.length).toBe(2);
  });

  it('Messages is rendering "Loading message"', () => {
    jest
      .spyOn(hooks, 'useCollectionData')
      .mockImplementation(() => [[], true, undefined]);

    const wrapper = mount(<Tabs user={user} />);
    expect(wrapper.text()).toBe('loading messages progress...');

    const messagesEl = wrapper.find('.message');
    expect(messagesEl.length).toBe(0);
  });

  it('Error handling Error correctly"', () => {
    console.error = jest.fn();
    jest
      .spyOn(hooks, 'useCollectionData')
      // @ts-ignore
      .mockImplementation(() => [[], false, { message: 'err' }]);

    mount(<Tabs user={user} />);
    expect(console.error).toHaveBeenCalledWith({ message: 'err' });
  });
});
