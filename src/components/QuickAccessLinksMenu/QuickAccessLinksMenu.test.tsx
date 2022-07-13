import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
// Components
import QuickAccessLinksMenu from './QuickAccessLinksMenu';

describe('QuickAccessLinksMenu Component', () => {
  // Selectors
  const quickAccessLinksMenuSelector = 'div.quick-access-links-menu';
  const quickAccessLinksMenuCardSelector = 'div.quick-access-links-menu-card';
  // Wrappers
  let wrapper: ReactWrapper;

  const getWrappers = (w: ReactWrapper) => ({
    quickAccessLinksMenu: w.find(quickAccessLinksMenuSelector),
    quickAccessLinksMenuCard: w.find(quickAccessLinksMenuCardSelector),
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe('QuickAccessLinksMenu Component is rendering elements', () => {
    beforeEach(() => {
      wrapper = mount(<QuickAccessLinksMenu />);
    });

    it('QuickAccessLinksMenu Component is rendering correctly', () => {
      const { quickAccessLinksMenu, quickAccessLinksMenuCard } =
        getWrappers(wrapper);

      expect(quickAccessLinksMenu.exists()).toBe(true);
      expect(quickAccessLinksMenuCard.length).toBe(6);
    });
  });
});
