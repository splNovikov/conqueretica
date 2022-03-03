import React from 'react';
import { shallow } from 'enzyme';
// Components
import Tab from './Tab';
// Test Data
import { tabs } from '../../__test_data__';

describe('Tab', () => {
  it('Tab Component is rendering', () => {
    const wrapper = shallow(
      <Tab
        tab={tabs[0]}
        selectedTab={tabs[0]}
        selectTabHandler={() => {}}
        deleteTabHandler={() => {}}
      />,
    );
    expect(wrapper.hasClass('tab')).toEqual(true);
  });

  it('Tab Component is rendering necessary elements', () => {
    const wrapper = shallow(
      <Tab
        tab={tabs[0]}
        selectedTab={tabs[0]}
        selectTabHandler={() => {}}
        deleteTabHandler={() => {}}
      />,
    );

    const tabTitleEl = wrapper.find('.tab-title');
    expect(tabTitleEl.text()).toBe('test_tab_1[Selected]');

    const buttonEl = wrapper.find('button');
    expect(buttonEl.exists()).toBeTruthy();
  });

  it('Tab Component "Delete Tab" button should invoke "Delete Tab" method', () => {
    const handleDeleteTab = jest.fn();
    const wrapper = shallow(
      <Tab
        tab={tabs[0]}
        selectedTab={tabs[0]}
        selectTabHandler={() => {}}
        deleteTabHandler={handleDeleteTab}
      />,
    );

    const buttonEl = wrapper.find('button');

    buttonEl.simulate('click');

    expect(handleDeleteTab).toHaveBeenCalledWith(tabs[0]);
  });
});
