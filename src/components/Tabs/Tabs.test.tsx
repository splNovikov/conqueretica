import React from 'react';
import { shallow, mount } from 'enzyme';
// Components
import Tabs from './Tabs';
// Test Data
import { tabs } from '../../__test_data__';

describe('Tabs', () => {
  it('Tabs Component is rendering', () => {
    shallow(<Tabs tabs={tabs} selectedTab={tabs[0]} />);
  });

  it('Tabs Component render all tabs', () => {
    const wrapper = shallow(<Tabs tabs={tabs} selectedTab={tabs[0]} />);
    const tabsEl = wrapper.find('.tab');
    expect(tabsEl.length).toBe(3);
  });

  it('Tabs Component Should select Selected Tab', () => {
    const wrapper = mount(<Tabs tabs={tabs} selectedTab={tabs[0]} />);
    const tabsEl = wrapper.find('.tab');
    expect(tabsEl.at(0).text()).toBe('test_tab_1[Selected]');
  });
});
