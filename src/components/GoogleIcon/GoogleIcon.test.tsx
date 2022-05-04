import React from 'react';
import { shallow } from 'enzyme';
// Components
import GoogleIcon from './GoogleIcon';

describe('GoogleIcon Component', () => {
  it('GoogleIcon is rendering', () => {
    const wrapper = shallow(<GoogleIcon icon="sheets" />);
    expect(wrapper.hasClass('google-icon')).toEqual(true);
  });

  it('GoogleIcon. Default size is set up', () => {
    const wrapper = shallow(<GoogleIcon icon="sheets" />);
    expect(wrapper.hasClass('normal')).toEqual(true);
  });

  it('GoogleIcon. icon is passed correctly', () => {
    const wrapper = shallow(<GoogleIcon icon="sheets" />);
    expect(wrapper.hasClass('sheets')).toEqual(true);
  });

  it('GoogleIcon. size is passed correctly', () => {
    const wrapper = shallow(<GoogleIcon icon="sheets" size="x-small" />);
    expect(wrapper.hasClass('x-small')).toEqual(true);
  });
});
