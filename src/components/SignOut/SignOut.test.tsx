import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
// Components
import SignOut from './SignOut';

describe('SignOut Component', () => {
  // Wrappers
  let wrapper: ReactWrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it('SignOut Component is rendering', () => {
    wrapper = mount(<SignOut />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toBe(' Log Out');
  });
});
