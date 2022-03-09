import React from 'react';
import { shallow, mount } from 'enzyme';
// Components
import Tabs from './Tabs';
// Test Data
import { tabs } from '../../__test_data__';

describe('Tabs', () => {
  it('Tabs Component is rendering', () => {
    shallow(
      <Tabs
        tabs={tabs}
        selectedTab={tabs[0]}
        selectTabHandler={() => 1}
        deleteTabHandler={() => 1}
        tabsFormSubmitHandler={() => 1}
      />,
    );
  });

  it('Tabs Component render all tabs', () => {
    const wrapper = shallow(
      <Tabs
        tabs={tabs}
        selectedTab={tabs[0]}
        selectTabHandler={() => 1}
        deleteTabHandler={() => 1}
        tabsFormSubmitHandler={() => 1}
      />,
    );
    const tabsEl = wrapper.find('Tab');
    expect(tabsEl.length).toBe(3);
  });

  it('Tabs Component Should select Selected Tab', () => {
    const wrapper = mount(
      <Tabs
        tabs={tabs}
        selectedTab={tabs[0]}
        selectTabHandler={() => 1}
        deleteTabHandler={() => 1}
        tabsFormSubmitHandler={() => 1}
      />,
    );
    const tabsEl = wrapper.find('.tab-title');
    expect(tabsEl.at(0).hasClass('selected')).toBeTruthy();
  });

  describe('Tabs Add Form', () => {
    it('Tabs Add Form should not be displayed by default', () => {
      const wrapper = mount(
        <Tabs
          tabs={tabs}
          selectedTab={tabs[0]}
          selectTabHandler={() => 1}
          deleteTabHandler={() => 1}
          tabsFormSubmitHandler={() => 1}
        />,
      );
      const addFormEl = wrapper.find('AddForm');
      expect(addFormEl.exists()).toBeFalsy();
    });

    it('Tabs Add Form display trigger is exist', () => {
      const wrapper = mount(
        <Tabs
          tabs={tabs}
          selectedTab={tabs[0]}
          selectTabHandler={() => 1}
          deleteTabHandler={() => 1}
          tabsFormSubmitHandler={() => 1}
        />,
      );
      const addTabTriggerEl = wrapper.find('.btn-show-add-tab-form');
      expect(addTabTriggerEl.exists()).toBeTruthy();
    });

    it('Tabs Add Form should be displayed after clicking on trigger', () => {
      const wrapper = mount(
        <Tabs
          tabs={tabs}
          selectedTab={tabs[0]}
          selectTabHandler={() => 1}
          deleteTabHandler={() => 1}
          tabsFormSubmitHandler={() => 1}
        />,
      );
      const addTabTriggerEl = wrapper.find('button.btn-show-add-tab-form');

      addTabTriggerEl.simulate('click');

      const addFormEl = wrapper.find('.add-tab-form-wrapper');
      expect(addFormEl.exists()).toBeTruthy();

      const closeFormEl = wrapper.find('.btn-hide-add-tab-form');
      expect(closeFormEl.exists()).toBeTruthy();
    });

    it('Tabs Add Form should be displayed OFF after clicking on trigger', () => {
      const wrapper = mount(
        <Tabs
          tabs={tabs}
          selectedTab={tabs[0]}
          selectTabHandler={() => 1}
          deleteTabHandler={() => 1}
          tabsFormSubmitHandler={() => 1}
        />,
      );
      const addTabTriggerEl = wrapper.find('button.btn-show-add-tab-form');
      addTabTriggerEl.simulate('click');

      const closeFormEl = wrapper.find('button.btn-hide-add-tab-form');
      closeFormEl.simulate('click');

      const addTabTriggerEl2 = wrapper.find('button.btn-show-add-tab-form');
      const closeFormEl2 = wrapper.find('button.btn-hide-add-tab-form');
      expect(addTabTriggerEl2.exists()).toBeTruthy();
      expect(closeFormEl2.exists()).toBeFalsy();
    });
  });
});
