import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
// Components
import Linky from './Linky';
import GoogleIcon from '../GoogleIcon';
// Test Data
import { links } from '../../__test_data__';

describe('Linky Component', () => {
  const updateLinkLastUsedHandler = jest.fn();
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
      wrapper = mount(
        <Linky
          updateLinkLastUsedHandler={updateLinkLastUsedHandler}
          link={links.sheets}
        />,
      );
      const { hrefLinky } = getWrappers(wrapper);
      expect(hrefLinky.exists()).toBe(true);
      expect(hrefLinky.hasClass(ellipsisSelector)).toBe(false);
    });

    it('Linky has ellipsis attribute', () => {
      wrapper = mount(
        <Linky
          updateLinkLastUsedHandler={updateLinkLastUsedHandler}
          link={links.sheets}
          ellipsis
        />,
      );
      const { hrefLinky } = getWrappers(wrapper);
      expect(hrefLinky.hasClass(ellipsisSelector)).toBe(true);
    });

    it('Should have "predefined" title', () => {
      const link = {
        ...links.sheets,
        title: 'predefined',
      };

      wrapper = mount(
        <Linky
          updateLinkLastUsedHandler={updateLinkLastUsedHandler}
          link={link}
        />,
      );
      expect(wrapper.text()).toEqual('predefined');
    });

    it('Should have "https://" title', () => {
      const link = {
        ...links.sheets,
        title: '',
        href: 'https://',
      };

      wrapper = mount(
        <Linky
          updateLinkLastUsedHandler={updateLinkLastUsedHandler}
          link={link}
        />,
      );
      expect(wrapper.text()).toEqual('https://');
    });
  });

  describe('Linky Component Handlers', () => {
    it('Should invoke "Update Linky Last Used Handler"', async () => {
      wrapper = mount(
        <Linky
          updateLinkLastUsedHandler={updateLinkLastUsedHandler}
          link={links.sheets}
        />,
      );

      const { hrefLinky } = getWrappers(wrapper);

      await act(async () => {
        hrefLinky.simulate('click');
      });

      expect(updateLinkLastUsedHandler).toHaveBeenCalledWith(links.sheets);
    });
  });

  describe('Linky Component - Icon', () => {
    it('Icon should be displayed', () => {
      wrapper = mount(
        <Linky
          updateLinkLastUsedHandler={updateLinkLastUsedHandler}
          link={links.sheets}
        />,
      );

      expect(wrapper.find(GoogleIcon).exists()).toBe(true);
    });

    it('Icon should not be displayed', () => {
      const link = {
        ...links.sheets,
        href: 'asdasdasdasd',
      };
      wrapper = mount(
        <Linky
          updateLinkLastUsedHandler={updateLinkLastUsedHandler}
          link={link}
        />,
      );

      expect(wrapper.find(GoogleIcon).exists()).toBe(false);
    });
  });
});
