import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
// Firebase
import firebase from '../../firebase';
// Components
import Category from './Category';
// Utils
import {
  getModalWrapper,
  getModalPrimaryButton,
  getSubmenuItems,
  isModalDisplayed,
  isModalHidden,
  getModalSecondaryButton,
} from '../../testUtils';
// Test Data
import { categories } from '../../__test_data__';
import LinkForm from '../LinkForm';
import CategoryLinky from '../CategoryLinky';

describe('Category Component', () => {
  const deleteCategoryHandler = jest.fn();
  // Selectors
  const categoryHeaderSelector = 'div.category-header';
  const categoryTitleSelector = 'span.category-title';
  const categoryActionsTriggerSelector = 'button.category-actions-menu-trigger';
  const categoryLinksSelector = 'div.category-links';
  const categoryAddLinkTriggerSelector = 'button.category-btn-enable-add-link';
  const actionsMenuDeleteSelector = 'category-actions-menu-delete-category';
  // Test Data
  const category = categories[0];
  // Wrappers
  let wrapper: ReactWrapper;
  let categoryHeader: ReactWrapper;
  let categoryTitle: ReactWrapper;
  let categoryActionsTrigger: ReactWrapper;
  let categoryLinks: ReactWrapper;
  let categoryAddLinkTrigger: ReactWrapper;
  let categoryLinky: ReactWrapper<any>;
  let categoryAddLinkForm: ReactWrapper<any>;

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
    categoryLinky = wrapper.find(CategoryLinky);
    categoryAddLinkForm = wrapper.find(LinkForm);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Category Component is rendering', () => {
    expect(wrapper.exists()).toBe(true);
    expect(categoryHeader.exists()).toBe(true);
    expect(categoryTitle.exists()).toBe(true);
    expect(categoryActionsTrigger.exists()).toBe(true);
    expect(categoryLinks.exists()).toBe(true);
    expect(categoryAddLinkTrigger.exists()).toBe(true);
    expect(categoryLinky.length).toBe(3);
    expect(categoryAddLinkForm.exists()).toBe(false);
  });

  describe('Category Component Interactions', () => {
    it('Should enable Create Link Mode', async () => {
      await act(async () => {
        categoryAddLinkTrigger.simulate('click');
      });

      wrapper.update();

      expect(wrapper.find(LinkForm).exists()).toBe(true);
    });

    it('Should have Dropdown Menu Items', async () => {
      const submenuItems = getSubmenuItems(wrapper);
      expect(submenuItems.length).toBe(1);
      expect(submenuItems.at(0).hasClass(actionsMenuDeleteSelector)).toBe(true);
    });

    it('Should invoke open/close Modal', async () => {
      expect(isModalHidden(wrapper)).toBe(true);

      const submenuItems = getSubmenuItems(wrapper);
      await act(async () => {
        submenuItems.first().simulate('click');
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

  describe('Category Component Handlers', () => {
    it('Should invoke "Delete Category Handler"', () => {
      const modal = getModalWrapper(wrapper);
      const btnEl = getModalPrimaryButton(modal);

      btnEl.simulate('click');

      expect(deleteCategoryHandler).toHaveBeenCalledWith(category);
    });
  });

  describe('Category Component -> LinkForm Component Handlers', () => {
    it('Should invoke "Create Link handler"', async () => {
      firebase.addLink = jest.fn();

      // open link form
      await act(async () => {
        categoryAddLinkTrigger.simulate('click');
      });

      wrapper.update();

      const linkForm = wrapper.find(LinkForm);

      await act(async () => {
        linkForm.prop('formSubmitHandler')('qwe', 'href');
      });

      wrapper.update();

      expect(firebase.addLink).toHaveBeenCalledWith('qwe', 'href', category);
      expect(wrapper.find(LinkForm).exists()).toBe(false);
    });

    it('Should invoke Abort "Create Link handler"', async () => {
      firebase.addLink = jest.fn();

      // open link form
      await act(async () => {
        categoryAddLinkTrigger.simulate('click');
      });

      wrapper.update();

      const linkForm = wrapper.find(LinkForm);

      await act(async () => {
        linkForm.prop('abortHandler')();
      });

      wrapper.update();

      expect(firebase.addLink).not.toHaveBeenCalled();
      expect(wrapper.find(LinkForm).exists()).toBe(false);
    });
  });

  describe('Category Component -> CategoryLinky Component Handlers', () => {
    it('Should invoke "Update Link Handler"', async () => {
      firebase.updateLink = jest.fn();

      await act(async () => {
        categoryLinky.first().prop('formSubmitHandler')(
          'title',
          'href',
          category.links[0],
        );
      });

      expect(firebase.updateLink).toHaveBeenCalledWith(
        'title',
        'href',
        category.links[0],
        category,
      );
    });

    it('Should invoke "Delete Link Handler"', async () => {
      firebase.deleteLink = jest.fn();

      await act(async () => {
        categoryLinky.first().prop('deleteLinkHandler')(category.links[0]);
      });

      expect(firebase.deleteLink).toHaveBeenCalledWith(
        category.links[0],
        category,
      );
    });
  });
});
