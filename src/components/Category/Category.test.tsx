import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
// Components
import Category from './Category';
// Test Data
import { columns } from '../../__test_data__';

describe('Column Component', () => {
  const deleteCategoryHandler = jest.fn();
  const createLinkHandler = jest.fn();
  // Selectors
  const categoryHeaderSelector = 'div.category-header';
  const categoryTitleSelector = 'span.category-title';
  const categoryActionsTriggerSelector = 'button.category-actions-menu-trigger';
  const categoryLinksSelector = 'div.category-links';
  const categoryAddLinkTriggerSelector = 'button.category-btn-enable-add-link';
  const categoryLinkyWrapperSelector = 'div.category-linky-wrapper';
  const categoryAddLinkFormSelector = 'form.link-form';
  // Test Data
  const category = columns[0].categories[0];
  // Wrappers
  let wrapper: ReactWrapper;
  let categoryHeader: ReactWrapper;
  let categoryTitle: ReactWrapper;
  let categoryActionsTrigger: ReactWrapper;
  let categoryLinks: ReactWrapper;
  let categoryAddLinkTrigger: ReactWrapper;
  let categoryLinkyWrapper: ReactWrapper;
  let categoryAddLinkForm: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <Category
        category={category}
        deleteCategoryHandler={deleteCategoryHandler}
        createLinkHandler={createLinkHandler}
      />,
    );
    categoryHeader = wrapper.find(categoryHeaderSelector);
    categoryTitle = categoryHeader.find(categoryTitleSelector);
    categoryActionsTrigger = categoryHeader.find(
      categoryActionsTriggerSelector,
    );
    categoryLinks = wrapper.find(categoryLinksSelector);
    categoryAddLinkTrigger = wrapper.find(categoryAddLinkTriggerSelector);
    categoryLinkyWrapper = wrapper.find(categoryLinkyWrapperSelector);
    categoryAddLinkForm = wrapper.find(categoryAddLinkFormSelector);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Column Component is rendering', () => {
    expect(wrapper.exists()).toBe(true);
    expect(categoryHeader.exists()).toBe(true);
    expect(categoryTitle.exists()).toBe(true);
    expect(categoryActionsTrigger.exists()).toBe(true);
    expect(categoryLinks.exists()).toBe(true);
    expect(categoryAddLinkTrigger.exists()).toBe(true);
    expect(categoryLinkyWrapper.length).toBe(3);
    expect(categoryAddLinkForm.exists()).toBe(false);
  });

  describe('Column Component Handlers', () => {
    it('Should enable Create Link Mode', async () => {
      await act(async () => {
        categoryAddLinkTrigger.simulate('click');
      });

      wrapper.update();

      expect(wrapper.find(categoryAddLinkFormSelector).exists()).toBe(true);
    });
  });
});
