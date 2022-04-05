import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
// Components
import Category from './Category';
// Test Data
import { columns } from '../../__test_data__';

describe('Column Component', () => {
  const deleteCategoryHandler = jest.fn();
  const createLinkHandler = jest.fn();
  const categoryHeaderSelector = 'div.category-header';
  const categoryTitleSelector = 'span.category-title';
  const categoryActionsTriggerSelector = 'button.category-actions-menu-trigger';
  const categoryLinksSelector = 'div.category-links';
  const categoryAddLinkTriggerSelector = 'button.category-btn-enable-add-link';
  const categoryLinkyWrapperSelector = 'div.category-linky-wrapper';
  const category = columns[0].categories[0];
  let wrapper: ReactWrapper;
  let categoryHeader: ReactWrapper;
  let categoryTitle: ReactWrapper;
  let categoryActionsTrigger: ReactWrapper;
  let categoryLinks: ReactWrapper;
  let categoryAddLinkTrigger: ReactWrapper;
  let categoryLinkyWrapper: ReactWrapper;

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
  });
});
