import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
// Components
import App from './App';

describe('App Component', () => {
  // Wrappers
  let wrapper: ShallowWrapper;

  beforeEach(async () => {
    await act(async () => {
      wrapper = shallow(<App />);
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('App is rendering', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
