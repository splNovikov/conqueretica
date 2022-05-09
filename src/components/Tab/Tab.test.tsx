import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
// Utils
import {
  getModalSecondaryButton,
  getModalWrapper,
  getSubmenuItems,
  isModalDisplayed,
  isModalHidden,
} from '../../testUtils';
// Components
import Tab from './Tab';
import SingleInputForm from '../SingleInputForm';
// Test Data
import { tabs } from '../../__test_data__';

describe('Tab Component', () => {
  const selectTabHandler = jest.fn();
  const updateTabHandler = jest.fn();
  const deleteTabHandler = jest.fn();
  // Selectors
  const tabSelector = 'div.tab';
  const tabTitleSelector = 'span.tab-title';
  const tabActionsMenuTriggerSelector = 'button.tab-actions-menu-trigger';
  // ClassNames
  const tabIsSelectedClassName = 'tab-selected';
  const editModeClassName = 'edit-mode';
  const actionsMenuEditClassName = 'tab-actions-menu-edit-tab';
  const actionsMenuDeleteClassName = 'tab-actions-menu-delete-tab';
  // Test Data
  const tab = tabs[0];
  // Wrappers
  let wrapper: ReactWrapper;

  const getWrappers = (w: ReactWrapper) => ({
    tabWrapper: w.find(tabSelector),
    singleInputWrapper: w.find(SingleInputForm),
    tabTitleWrapper: w.find(tabTitleSelector),
    tabActionsMenuTrigger: w.find(tabActionsMenuTriggerSelector),
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe('Tab Component is rendering elements', () => {
    beforeEach(() => {
      wrapper = mount(
        <Tab
          tab={tab}
          selectedTab={tab}
          selectTabHandler={selectTabHandler}
          deleteTabHandler={deleteTabHandler}
          updateTabHandler={updateTabHandler}
        />,
      );
    });

    it('Tab Component is rendering correctly', () => {
      const {
        tabWrapper,
        singleInputWrapper,
        tabTitleWrapper,
        tabActionsMenuTrigger,
      } = getWrappers(wrapper);

      expect(tabWrapper.exists()).toBe(true);
      expect(singleInputWrapper.exists()).toBe(false);
      expect(tabTitleWrapper.text()).toBe(tab.title);
      expect(tabActionsMenuTrigger.exists()).toBe(true);
    });

    it('Tab Component rendering classNames correctly', () => {
      const { tabWrapper } = getWrappers(wrapper);

      expect(tabWrapper.hasClass(tabIsSelectedClassName)).toBe(true);
      expect(tabWrapper.hasClass(editModeClassName)).toBe(false);
    });

    it('Should have Dropdown Menu Items', async () => {
      const submenuItems = getSubmenuItems(wrapper);
      expect(submenuItems.length).toBe(2);
      expect(submenuItems.at(0).hasClass(actionsMenuEditClassName)).toBe(true);
      expect(submenuItems.at(1).hasClass(actionsMenuDeleteClassName)).toBe(
        true,
      );
    });
  });

  describe('Tab Component Interactions', () => {
    beforeEach(() => {
      wrapper = mount(
        <Tab
          tab={tab}
          selectedTab={tab}
          selectTabHandler={selectTabHandler}
          deleteTabHandler={deleteTabHandler}
          updateTabHandler={updateTabHandler}
        />,
      );
    });

    it('Should enable Edit Mode', async () => {
      const submenuItems = getSubmenuItems(wrapper);
      await act(async () => {
        submenuItems.first().simulate('click');
      });

      wrapper.update();

      expect(getWrappers(wrapper).singleInputWrapper.exists()).toBe(true);
    });

    it('Should invoke open/close Modal', async () => {
      expect(isModalHidden(wrapper)).toBe(true);

      const submenuItems = getSubmenuItems(wrapper);
      await act(async () => {
        submenuItems.at(1).simulate('click');
      });

      wrapper.update();

      expect(isModalDisplayed(wrapper)).toBe(true);

      const modal = getModalWrapper(wrapper);
      const cancelBtn = getModalSecondaryButton(modal);

      await act(async () => {
        cancelBtn.simulate('click');
      });

      wrapper.update();

      expect(isModalHidden(wrapper)).toBe(true);
    });
  });

  describe('Tab Component Handlers', () => {
    beforeEach(() => {
      wrapper = mount(
        <Tab
          tab={tab}
          selectedTab={tab}
          selectTabHandler={selectTabHandler}
          deleteTabHandler={deleteTabHandler}
          updateTabHandler={updateTabHandler}
        />,
      );
    });

    it('Should prevent handle Tab Select when tab is already selected', async () => {
      const { tabTitleWrapper } = getWrappers(wrapper);

      await act(async () => {
        tabTitleWrapper.simulate('click');
      });

      expect(selectTabHandler).not.toHaveBeenCalled();
    });

    it('Should handle Tab Select', async () => {
      wrapper.unmount();
      wrapper = mount(
        <Tab
          tab={tab}
          selectedTab={tabs[1]}
          selectTabHandler={selectTabHandler}
          deleteTabHandler={deleteTabHandler}
          updateTabHandler={updateTabHandler}
        />,
      );
      const { tabTitleWrapper } = getWrappers(wrapper);

      await act(async () => {
        tabTitleWrapper.simulate('click');
      });

      expect(selectTabHandler).toHaveBeenCalledWith(tab);
    });
  });
});
