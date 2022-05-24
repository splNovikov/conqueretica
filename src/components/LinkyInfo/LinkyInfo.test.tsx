import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
// Components
import LinkyInfo from './LinkyInfo';
// Test Data
import { links } from '../../__test_data__';
// todo: 34
describe('LinkyInfo Component', () => {
  // Selectors
  const linkyInfoSelector = 'div.linky-info';
  const linkyInfoTitleSelector = 'li.linky-info-title-wrapper';
  const linkyInfoLastUsedSelector = 'li.linky-info-last-used-wrapper';

  // Wrappers
  let wrapper: ReactWrapper;

  const getWrappers = (w: ReactWrapper) => ({
    linkyInfo: w.find(linkyInfoSelector),
    linkyInfoTitle: w.find(linkyInfoTitleSelector),
    linkyInfoLastUsed: w.find(linkyInfoLastUsedSelector),
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe('LinkyInfo Component Rendering Elements', () => {
    const link = links.sheets;
    beforeEach(() => {
      wrapper = mount(<LinkyInfo link={link} />);
    });

    it('LinkyInfo is rendering elements correctly', () => {
      const { linkyInfo, linkyInfoTitle, linkyInfoLastUsed } =
        getWrappers(wrapper);
      expect(linkyInfo.exists()).toBe(true);
      expect(linkyInfoTitle.exists()).toBe(true);
      expect(linkyInfoTitle.text()).toBe(link.title);
      expect(linkyInfoLastUsed.exists()).toBe(true);
    });

    it('LinkyInfo is handle incorrect last used data', () => {
      const link2 = { ...link, lastUsed: undefined };
      wrapper = mount(<LinkyInfo link={link2} />);
      const { linkyInfoLastUsed } = getWrappers(wrapper);
      expect(linkyInfoLastUsed.text()).toBe('Last Used: not specified');
    });
  });
});
