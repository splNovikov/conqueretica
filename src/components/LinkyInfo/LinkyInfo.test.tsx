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

  // Wrappers
  let wrapper: ReactWrapper;

  const getWrappers = (w: ReactWrapper) => ({
    linkyInfo: w.find(linkyInfoSelector),
    linkyInfoTitle: w.find(linkyInfoTitleSelector),
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
      const { linkyInfo, linkyInfoTitle } = getWrappers(wrapper);
      expect(linkyInfo.exists()).toBe(true);
      expect(linkyInfoTitle.exists()).toBe(true);
      expect(linkyInfoTitle.text()).toBe(link.title);
    });
  });
});
