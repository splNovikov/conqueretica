import React from 'react';
import { shallow } from 'enzyme';

import Linky from './Linky';

import { ILink } from '../../interfaces';

const link1: ILink = {
  id: '1',
  href: 'https://',
  title: 'title',
};

it('Linky is rendering', () => {
  const wrapper = shallow(<Linky link={link1} />);
  expect(wrapper.hasClass('linky')).toEqual(true);
});

describe('Linky should has correct classes', () => {
  it('Should have "colored" class', () => {
    const wrapper = shallow(<Linky link={link1} colored />);
    expect(wrapper.hasClass('colored')).toEqual(true);
  });

  it('Should have "big" class', () => {
    const wrapper = shallow(<Linky link={link1} big />);
    expect(wrapper.hasClass('big')).toEqual(true);
  });

  it('Should have "ellipsed" class', () => {
    const wrapper = shallow(<Linky link={link1} ellipsed />);
    expect(wrapper.hasClass('ellipsed')).toEqual(true);
  });
});

describe('Linky should has correct title', () => {
  it('Should have "predefined" title', () => {
    link1.title = 'predefined';

    const wrapper = shallow(<Linky link={link1} />);
    expect(wrapper.text()).toEqual('predefined');
  });

  it('Should have "https://" title', () => {
    link1.title = '';

    const wrapper = shallow(<Linky link={link1} />);
    expect(wrapper.text()).toEqual('https://');
  });
});
