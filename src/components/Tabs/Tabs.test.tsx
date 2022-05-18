import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
// Components
import Tabs from './Tabs';
import Tab from '../Tab';
import SingleInputForm from '../SingleInputForm';
// Test Data
import { tabs } from '../../__test_data__';
import { act } from 'react-dom/test-utils';

describe('Tabs Component', () => {
  const selectTabHandler = jest.fn();
  const updateTabHandler = jest.fn();
  const deleteTabHandler = jest.fn();
  const tabsFormSubmitHandler = jest.fn();
  // Selectors
  const tabsAddFormTriggerSelector = 'button.btn-show-add-tab-form';
  const tabSelector = 'div.tab';
  // ClassNames
  const tabIsSelectedClassName = 'tab-selected';
  // Test Data
  const tab = tabs[0];
  // Wrappers
  let wrapper: ReactWrapper;

  const getWrappers = (w: ReactWrapper) => ({
    tabWrappers: w.find(Tab),
    addFormWrapper: w.find(SingleInputForm),
    tabsAddFormTrigger: w.find(tabsAddFormTriggerSelector),
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe('Tabs Component is rendering elements', () => {
    beforeEach(() => {
      wrapper = mount(
        <Tabs
          tabs={tabs}
          selectedTab={tab}
          selectTabHandler={selectTabHandler}
          updateTabHandler={updateTabHandler}
          deleteTabHandler={deleteTabHandler}
          tabsFormSubmitHandler={tabsFormSubmitHandler}
        />,
      );
    });

    it('Tabs Component is rendering correctly', () => {
      const { tabWrappers, addFormWrapper, tabsAddFormTrigger } =
        getWrappers(wrapper);

      expect(tabWrappers.length).toBe(3);
      expect(addFormWrapper.exists()).toBe(false);
      expect(tabsAddFormTrigger.exists()).toBe(true);
    });

    it('First tab is selected', () => {
      const { tabWrappers } = getWrappers(wrapper);

      expect(
        tabWrappers.at(0).find(tabSelector).hasClass(tabIsSelectedClassName),
      ).toBe(true);
    });
  });

  describe('Tabs Component Interactions', () => {
    beforeEach(() => {
      wrapper = mount(
        <Tabs
          tabs={tabs}
          selectedTab={tab}
          selectTabHandler={selectTabHandler}
          updateTabHandler={updateTabHandler}
          deleteTabHandler={deleteTabHandler}
          tabsFormSubmitHandler={tabsFormSubmitHandler}
        />,
      );
    });

    it('Tabs Add Form should be displayed after clicking on trigger', () => {
      const { tabsAddFormTrigger } = getWrappers(wrapper);

      tabsAddFormTrigger.simulate('click');

      expect(getWrappers(wrapper).addFormWrapper.exists()).toBe(true);
    });
  });

  describe('Tabs Component Рфтвдукы', () => {
    beforeEach(() => {
      wrapper = mount(
        <Tabs
          tabs={tabs}
          selectedTab={tab}
          selectTabHandler={selectTabHandler}
          updateTabHandler={updateTabHandler}
          deleteTabHandler={deleteTabHandler}
          tabsFormSubmitHandler={tabsFormSubmitHandler}
        />,
      );
    });

    it('Tabs Component Should handle tab creation', async () => {
      const { tabsAddFormTrigger } = getWrappers(wrapper);

      tabsAddFormTrigger.simulate('click');

      const { addFormWrapper } = getWrappers(wrapper);

      const formSubmitHandler = addFormWrapper.prop('formSubmitHandler');

      await act(async () => {
        formSubmitHandler && formSubmitHandler('new-tab-title');
      });

      wrapper.update();

      expect(tabsFormSubmitHandler).toHaveBeenCalledWith('new-tab-title');
      expect(getWrappers(wrapper).addFormWrapper.exists()).toBe(false);
    });
  });
});
