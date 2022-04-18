import React from 'react';
import { mount, shallow } from 'enzyme';
// Components
import Linky from './Linky';
import GoogleIcon from '../GoogleIcon';
// Test Data
import { links } from '../../__test_data__';

it('Linky is rendering', () => {
  const wrapper = shallow(<Linky link={links.sheets} ellipsis />);
  expect(wrapper.hasClass('linky')).toBe(true);
});

describe('Linky should has correct classes', () => {
  it('Should have "ellipsis" class', async () => {
    const wrapper = mount(<Linky link={links.sheets} ellipsis />);

    expect(wrapper.find('a.linky').hasClass('ant-typography-ellipsis')).toBe(
      true,
    );
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
