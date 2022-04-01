import React from 'react';
import { mount, shallow } from 'enzyme';
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
        selectTabHandler={() => 1}
        deleteTabHandler={() => 1}
        updateTabHandler={() => 1}
      />,
    );
    expect(wrapper.hasClass('tab')).toEqual(true);
  });

  it('Tab Component is rendering necessary elements', () => {
    const wrapper = mount(
      <Tab
        tab={tabs[0]}
        selectedTab={tabs[0]}
        selectTabHandler={() => 1}
        deleteTabHandler={() => 1}
        updateTabHandler={() => 1}
      />,
    );

    expect(wrapper.text()).toBe('test_tab_1');
    expect(wrapper.find('.tab-selected').exists()).toBe(true);

    const actionMenuTriggerEl = wrapper.find('button.actions-menu-trigger');
    expect(actionMenuTriggerEl.exists()).toBe(true);
  });

  // Since we moved delete button to dropdown - it has been move out of the wrapper's scope. And we can not test it anymore
  xit('Tab Component "Delete Tab" button should invoke "Delete Tab" method', () => {
    const handleDeleteTab = jest.fn();
    const wrapper = shallow(
      <Tab
        tab={tabs[0]}
        selectedTab={tabs[0]}
        selectTabHandler={() => 1}
        deleteTabHandler={handleDeleteTab}
        updateTabHandler={() => 1}
      />,
    );

    const actionMenuTriggerEl = wrapper.find('button.actions-menu-trigger');
    actionMenuTriggerEl.simulate('mouseover');

    // const deleteEl = wrapper.find('.btn-delete-tab');
    expect(handleDeleteTab).toHaveBeenCalledWith(tabs[0]);
  });

  it('Tab Component "Select Tab" button should invoke "Select Tab" method', () => {
    const handleSelectTab = jest.fn();
    const wrapper = shallow(
      <Tab
        tab={tabs[0]}
        selectedTab={tabs[1]}
        selectTabHandler={handleSelectTab}
        deleteTabHandler={() => 1}
        updateTabHandler={() => 1}
      />,
    );

    const tabTitleEl = wrapper.find('.tab-title');

    tabTitleEl.simulate('click');

    expect(handleSelectTab).toHaveBeenCalledWith(tabs[0]);
  });

  it('Tab Component "Select Tab" button should NOT invoke "Select Tab" method on clicking the same tab', () => {
    const handleSelectTab = jest.fn();
    const wrapper = shallow(
      <Tab
        tab={tabs[0]}
        selectedTab={tabs[0]}
        selectTabHandler={handleSelectTab}
        deleteTabHandler={() => 1}
        updateTabHandler={() => 1}
      />,
    );

    const tabTitleEl = wrapper.find('.tab-title');

    tabTitleEl.simulate('click');

    expect(handleSelectTab).toHaveBeenCalledTimes(0);
  });
});
