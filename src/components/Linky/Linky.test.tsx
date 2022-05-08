import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
// Components
import Linky from './Linky';
import GoogleIcon from '../GoogleIcon';
// Test Data
import { links } from '../../__test_data__';

describe('Linky Component', () => {
  // Selectors
  const hrefLinkySelector = 'a.linky';
  const ellipsisSelector = 'ant-typography-ellipsis';

  // Wrappers
  let wrapper: ReactWrapper;

  const getWrappers = (w: ReactWrapper) => ({
    hrefLinky: w.find(hrefLinkySelector),
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe('Linky Component Rendering Elements', () => {
    it('Linky is rendering elements correctly', () => {
      wrapper = mount(<Linky link={links.sheets} />);
      const { hrefLinky } = getWrappers(wrapper);
      expect(hrefLinky.exists()).toBe(true);
      expect(hrefLinky.hasClass(ellipsisSelector)).toBe(false);
    });

    it('Linky has ellipsis attribute', () => {
      wrapper = mount(<Linky link={links.sheets} ellipsis />);
      const { hrefLinky } = getWrappers(wrapper);
      expect(hrefLinky.hasClass(ellipsisSelector)).toBe(true);
    });

    it('Should have "predefined" title', () => {
      const link = {
        ...links.sheets,
        title: 'predefined',
      };

      wrapper = mount(<Linky link={link} />);
      expect(wrapper.text()).toEqual('predefined');
    });

    it('Should have "https://" title', () => {
      const link = {
        ...links.sheets,
        title: '',
        href: 'https://',
      };

      wrapper = mount(<Linky link={link} />);
      expect(wrapper.text()).toEqual('https://');
    });
  });

  describe('Linky Component - Icon', () => {
    it('Icon should be displayed', () => {
      wrapper = mount(<Linky link={links.sheets} />);

      expect(wrapper.find(GoogleIcon).exists()).toBe(true);
    });

    it('Icon should not be displayed', () => {
      const link = {
        ...links.sheets,
        href: 'asdasdasdasd',
      };
      wrapper = mount(<Linky link={link} />);

      expect(wrapper.find(GoogleIcon).exists()).toBe(false);
    });
  });
});
