import React from 'react';
import { shallow, mount } from 'enzyme';
// Components
import Tabs from './Tabs';
// Test Data
import { tabs } from '../../__test_data__';

const mockedFunctions = {
  selectTabHandler: () => {},
  deleteTabHandler: () => {},
  tabsFormSubmitHandler: () => {},
};

describe('Tabs', () => {
  it('Tabs Component is rendering', () => {
    shallow(<Tabs tabs={tabs} selectedTab={tabs[0]} {...mockedFunctions} />);
  });

  it('Tabs Component render all tabs', () => {
    const wrapper = shallow(
      <Tabs tabs={tabs} selectedTab={tabs[0]} {...mockedFunctions} />,
    );
    const tabsEl = wrapper.find('Tab');
    expect(tabsEl.length).toBe(3);
  });

  it('Tabs Component Should select Selected Tab', () => {
    const wrapper = mount(
      <Tabs tabs={tabs} selectedTab={tabs[0]} {...mockedFunctions} />,
    );
    const tabsEl = wrapper.find('.tab-title');
    expect(tabsEl.at(0).hasClass('selected')).toBeTruthy();
  });
});
