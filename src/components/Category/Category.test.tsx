import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
// Components
import Category from './Category';
// Test Data
import { categories } from '../../__test_data__';

describe('Column Component', () => {
  const deleteCategoryHandler = jest.fn();
  // Selectors
  const categoryHeaderSelector = 'div.category-header';
  const categoryTitleSelector = 'span.category-title';
  const categoryActionsTriggerSelector = 'button.category-actions-menu-trigger';
  const categoryLinksSelector = 'div.category-links';
  const categoryAddLinkTriggerSelector = 'button.category-btn-enable-add-link';
  const categoryLinkySelector = 'div.category-linky';
  const categoryAddLinkFormSelector = 'form.link-form';
  // Test Data
  const category = categories[0];
  // Wrappers
  let wrapper: ReactWrapper;
  let categoryHeader: ReactWrapper;
  let categoryTitle: ReactWrapper;
  let categoryActionsTrigger: ReactWrapper;
  let categoryLinks: ReactWrapper;
  let categoryAddLinkTrigger: ReactWrapper;
  let categoryLinky: ReactWrapper;
  let categoryAddLinkForm: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <Category
        category={category}
        deleteCategoryHandler={deleteCategoryHandler}
      />,
    );
    categoryHeader = wrapper.find(categoryHeaderSelector);
    categoryTitle = categoryHeader.find(categoryTitleSelector);
    categoryActionsTrigger = categoryHeader.find(
      categoryActionsTriggerSelector,
    );
    categoryLinks = wrapper.find(categoryLinksSelector);
    categoryAddLinkTrigger = wrapper.find(categoryAddLinkTriggerSelector);
    categoryLinky = wrapper.find(categoryLinkySelector);
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
    expect(categoryLinky.length).toBe(3);
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
