import React from 'react';
import { mount, shallow } from 'enzyme';
// Components
import Linky from './Linky';
import GoogleIcon from '../GoogleIcon';
// Test Data
import { links } from '../../__test_data__';

it('Linky is rendering', () => {
  const wrapper = shallow(<Linky link={links.sheets} />);
  expect(wrapper.hasClass('linky')).toEqual(true);
});

describe('Linky should has correct classes', () => {
  it('Should have "colored" class', () => {
    const wrapper = shallow(<Linky link={links.sheets} colored />);
    expect(wrapper.hasClass('colored')).toEqual(true);
  });

  it('Should have "big" class', () => {
    const wrapper = shallow(<Linky link={links.sheets} big />);
    expect(wrapper.hasClass('big')).toEqual(true);
  });

  it('Should have "ellipsed" class', () => {
    const wrapper = shallow(<Linky link={links.sheets} ellipsed />);
    expect(wrapper.hasClass('ellipsed')).toEqual(true);
  });
});

describe('Linky should has correct title', () => {
  it('Should have "predefined" title', () => {
    const link = {
      ...links.sheets,
      title: 'predefined',
    };

    const wrapper = mount(<Linky link={link} />);
    expect(wrapper.text()).toEqual('predefined');
  });

  it('Should have "https://" title', () => {
    const link = {
      ...links.sheets,
      title: '',
      href: 'https://',
    };

    const wrapper = shallow(<Linky link={link} />);
    expect(wrapper.text()).toEqual('https://');
  });
});

describe('Linky - Icon', () => {
  it('Icon should be displayed', () => {
    const wrapper = shallow(<Linky link={links.sheets} />);

    expect(wrapper.find(GoogleIcon).exists()).toBe(true);
  });

  it('Icon should not be displayed', () => {
    const link = {
      ...links.sheets,
      href: 'asdasdasdasd',
    };
    const wrapper = shallow(<Linky link={link} />);

    expect(wrapper.find(GoogleIcon).exists()).toBe(false);
  });
});
