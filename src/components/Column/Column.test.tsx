import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import * as firestoreHooks from 'react-firebase-hooks/firestore';
import { act } from 'react-dom/test-utils';
// Firebase
import firebase from '../../firebase';
// Components
import Column from './Column';
import Category from '../Category';
import SingleInputForm from '../SingleInputForm';
// Utils
import { mockUseCollectionData } from '../../testUtils';
// Test Data
import { categories, columns } from '../../__test_data__';

describe('Column Component', () => {
  const origConsoleError = console.error;
  // Selectors
  const columnHeaderSelector = 'div.column-header';
  const enableAddCategoryButtonSelector =
    'button.column-btn-enable-add-category';
  // Test Data
  const column = columns[0];
  // Wrappers
  let wrapper: ReactWrapper;
  let columnHeader: ReactWrapper;
  let categoriesWrappers: ReactWrapper<any>;
  let enableAddCategoryButton: ReactWrapper;
  let singleInputForm: ReactWrapper<any>;

  beforeEach(() => {
    console.error = jest.fn();
    jest
      .spyOn(firestoreHooks, 'useCollectionData')
      // @ts-ignore
      .mockImplementation(mockUseCollectionData());
    wrapper = mount(<Column column={column} span={6} />);
    columnHeader = wrapper.find(columnHeaderSelector);
    categoriesWrappers = wrapper.find(Category);
    enableAddCategoryButton = wrapper.find(enableAddCategoryButtonSelector);
    singleInputForm = wrapper.find(SingleInputForm);
  });

  afterEach(() => {
    jest.resetAllMocks();
    console.error = origConsoleError;
    wrapper.unmount();
  });

  it('Column Component is rendering', () => {
    expect(wrapper.exists()).toBe(true);
    expect(columnHeader.exists()).toBe(true);
    expect(categoriesWrappers.length).toBe(3);
    expect(enableAddCategoryButton.exists()).toBe(true);
    expect(singleInputForm.exists()).toBe(false);
  });

  it('Column Component is handling errors when categories are not loading', () => {
    jest.resetAllMocks();
    jest.spyOn(firestoreHooks, 'useCollectionData').mockImplementation(
      // @ts-ignore
      mockUseCollectionData([[], false, { message: 'err' }]),
    );

    wrapper.unmount();
    wrapper = mount(<Column column={column} span={6} />);

    expect(console.error).toHaveBeenCalledWith({ message: 'err' });
  });

  describe('Column Component Interactions', () => {
    it('Should enable Create Category Mode', async () => {
      await act(async () => {
        enableAddCategoryButton.simulate('click');
      });

      wrapper.update();

      expect(wrapper.find(SingleInputForm).exists()).toBe(true);
    });
  });

  describe('Column Component -> SingleInputForm Component Handlers', () => {
    it('Should invoke "Add Category Handler"', async () => {
      firebase.addCategory = jest.fn();

      await act(async () => {
        enableAddCategoryButton.simulate('click');
      });

      wrapper.update();

      const formSubmitHandler = wrapper
        .find(SingleInputForm)
        .prop('formSubmitHandler');

      formSubmitHandler && formSubmitHandler('category_title');

      wrapper.update();

      expect(firebase.addCategory).toHaveBeenCalledWith(
        'category_title',
        column,
      );
      expect(wrapper.find(SingleInputForm).exists()).toBe(false);
    });

    it('Should invoke Abort "Add Category Handler"', async () => {
      await act(async () => {
        enableAddCategoryButton.simulate('click');
      });

      wrapper.update();

      const abortHandler = wrapper.find(SingleInputForm).prop('abortHandler');

      abortHandler && abortHandler();

      wrapper.update();

      expect(wrapper.find(SingleInputForm).exists()).toBe(false);
    });
  });

  describe('Column Component -> Category Component Handlers', () => {
    it('Should invoke "Delete Category Handler" and delete Column as well', async () => {
      const category = categories[0];
      jest.resetAllMocks();
      jest.spyOn(firestoreHooks, 'useCollectionData').mockImplementation(
        mockUseCollectionData(
          // @ts-ignore
          [[category], false, undefined],
        ),
      );

      wrapper.unmount();
      wrapper = mount(<Column column={column} span={6} />);

      firebase.deleteCategoryWithColumnScenario = jest.fn();
      firebase.deleteCategory = jest.fn();

      const categoryWrapper = wrapper.find(Category);
      const deleteCategoryHandler = categoryWrapper.prop(
        'deleteCategoryHandler',
      );

      deleteCategoryHandler && deleteCategoryHandler(category);

      expect(firebase.deleteCategoryWithColumnScenario).toHaveBeenCalledWith(
        category,
        column,
      );
      expect(firebase.deleteCategory).not.toHaveBeenCalled();
    });

    it('Should invoke "Delete Category Handler"', async () => {
      firebase.deleteCategoryWithColumnScenario = jest.fn();
      firebase.deleteCategory = jest.fn();

      const category = categories[0];
      const categoryWrapper = categoriesWrappers.at(0);
      const deleteCategoryHandler = categoryWrapper.prop(
        'deleteCategoryHandler',
      );

      deleteCategoryHandler && deleteCategoryHandler(category);

      expect(firebase.deleteCategoryWithColumnScenario).not.toHaveBeenCalled();
      expect(firebase.deleteCategory).toHaveBeenCalledWith(category);
    });
  });
});
