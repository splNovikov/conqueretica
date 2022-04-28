import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import AppFooter from './AppFooter';

describe('AppFooter Component', () => {
  const appFooterSelector = 'footer.app-footer';
  let wrapper: ReactWrapper;
  let footer: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<AppFooter />);
    footer = wrapper.find(appFooterSelector);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('AppFooter is rendering', () => {
    expect(wrapper.exists()).toEqual(true);
    expect(footer.exists()).toEqual(true);
  });

  it('AppFooter text is Conqueretica', () => {
    expect(footer.text()).toEqual('© Conqueretica');
  });
});
