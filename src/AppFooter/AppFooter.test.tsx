import React from 'react';
import { shallow } from 'enzyme';

import AppFooter from './AppFooter';

describe('AppFooter Component', () => {
  it('AppFooter is rendering', () => {
    const wrapper = shallow(<AppFooter />);
    expect(wrapper.exists()).toEqual(true);
  });
});
