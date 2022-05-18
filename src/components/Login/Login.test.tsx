import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
// Components
import Login from './Login';

describe('Login Component', () => {
  // Wrappers
  let wrapper: ReactWrapper;

  afterEach(() => {
    wrapper.unmount();
  });

  it('Login Component is rendering', () => {
    wrapper = mount(<Login />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.text()).toBe('Login with Google');
  });
});
