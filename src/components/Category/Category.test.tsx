import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
// Firebase
import firebase from '../../firebase';
// Components
import Category from './Category';
import LinkForm from '../LinkForm';
import CategoryLinky from '../CategoryLinky';
import SingleInputForm from '../SingleInputForm';
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

describe('Category Component', () => {
  const deleteCategoryHandler = jest.fn();
  // Selectors
  const categoryHeaderSelector = 'div.category-header';
  const categoryTitleSelector = 'span.category-title';
  const categoryActionsTriggerSelector = 'button.category-actions-menu-trigger';
  const categoryLinksSelector = 'div.category-links';
  const categoryAddLinkTriggerSelector = 'button.category-btn-enable-add-link';
  // ClassNames
  const actionsMenuEditClassName = 'category-actions-menu-edit-category';
  const actionsMenuDeleteClassName = 'category-actions-menu-delete-category';
  // Test Data
  const category = categories[0];
  // Wrappers
  let wrapper: ReactWrapper;

  const getWrappers = (w: ReactWrapper) => {
    const categoryHeader = w.find(categoryHeaderSelector);
    return {
      categoryHeader,
      categoryTitle: categoryHeader.find(categoryTitleSelector),
      categoryActionsTrigger: categoryHeader.find(
        categoryActionsTriggerSelector,
      ),
      singleInputWrapper: w.find(SingleInputForm),
      categoryLinks: wrapper.find(categoryLinksSelector),
      categoryAddLinkTrigger: wrapper.find(categoryAddLinkTriggerSelector),
      categoryLinky: wrapper.find(CategoryLinky),
      categoryAddLinkForm: wrapper.find(LinkForm),
    };
  };

  beforeEach(() => {
    wrapper = mount(
      <Category
        category={category}
        deleteCategoryHandler={deleteCategoryHandler}
      />,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Category Component is rendering', () => {
    const {
      categoryHeader,
      categoryTitle,
      categoryActionsTrigger,
      singleInputWrapper,
      categoryLinks,
      categoryAddLinkTrigger,
      categoryLinky,
      categoryAddLinkForm,
    } = getWrappers(wrapper);

    expect(wrapper.exists()).toBe(true);
    expect(categoryHeader.exists()).toBe(true);
    expect(categoryTitle.exists()).toBe(true);
    expect(categoryActionsTrigger.exists()).toBe(true);
    expect(singleInputWrapper.exists()).toBe(false);
    expect(categoryLinks.exists()).toBe(true);
    expect(categoryAddLinkTrigger.exists()).toBe(true);
    expect(categoryLinky.length).toBe(3);
    expect(categoryAddLinkForm.exists()).toBe(false);
  });

  describe('Category Component Interactions', () => {
    it('Should enable Create Link Mode', async () => {
      const { categoryAddLinkTrigger } = getWrappers(wrapper);

      await act(async () => {
        categoryAddLinkTrigger.simulate('click');
      });

      wrapper.update();

      expect(wrapper.find(LinkForm).exists()).toBe(true);
    });

    it('Should have Dropdown Menu Items', async () => {
      const submenuItems = getSubmenuItems(wrapper);
      expect(submenuItems.length).toBe(2);
      expect(submenuItems.at(0).hasClass(actionsMenuEditClassName)).toBe(true);
      expect(submenuItems.at(1).hasClass(actionsMenuDeleteClassName)).toBe(
        true,
      );
    });

    it('Should enable Edit Category Mode', async () => {
      const submenuItems = getSubmenuItems(wrapper);
      await act(async () => {
        submenuItems.at(0).simulate('click');
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

  describe('Category Component Handlers', () => {
    it('Should invoke "Delete Category Handler"', () => {
      const modal = getModalWrapper(wrapper);
      const btnEl = getModalPrimaryButton(modal);

      btnEl.simulate('click');

      expect(deleteCategoryHandler).toHaveBeenCalledWith(category);
    });

    it('Should invoke "Edit Category Handler"', async () => {
      firebase.updateCategory = jest.fn();

      const submenuItems = getSubmenuItems(wrapper);

      await act(async () => {
        submenuItems.at(0).simulate('click');
      });

      wrapper.update();

      const { singleInputWrapper } = getWrappers(wrapper);

      const updateHandler = singleInputWrapper.prop('formSubmitHandler');

      await act(async () => {
        updateHandler && updateHandler('azaza');
      });

      wrapper.update();

      expect(firebase.updateCategory).toHaveBeenCalledWith(category, 'azaza');
      expect(getWrappers(wrapper).singleInputWrapper.exists()).toBe(false);
    });

    it('Should invoke Abort "Edit Category handler"', async () => {
      firebase.updateCategory = jest.fn();

      const submenuItems = getSubmenuItems(wrapper);

      await act(async () => {
        submenuItems.at(0).simulate('click');
      });

      wrapper.update();

      const { singleInputWrapper } = getWrappers(wrapper);

      const abortHandler = singleInputWrapper.prop('abortHandler');

      await act(async () => {
        abortHandler && abortHandler();
      });

      wrapper.update();

      expect(firebase.updateCategory).not.toHaveBeenCalled();
      expect(getWrappers(wrapper).singleInputWrapper.exists()).toBe(false);
    });
  });

  describe('Category Component -> LinkForm Component Handlers', () => {
    it('Should invoke "Create Link handler"', async () => {
      const { categoryAddLinkTrigger } = getWrappers(wrapper);

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
      const { categoryAddLinkTrigger } = getWrappers(wrapper);

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
      const { categoryLinky } = getWrappers(wrapper);

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
      const { categoryLinky } = getWrappers(wrapper);

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
