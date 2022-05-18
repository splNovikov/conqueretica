import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
// Components
import ColumnsAddCategory from './ColumnsAddCategory';
import SingleInputForm from '../SingleInputForm';

describe('ColumnsAddCategory Component', () => {
  const addCategoryScenarioHandler = jest.fn();
  // Selectors
  const btnAddNewCategorySelector = 'button.columns-btn-add-new-category';
  // Wrappers
  let wrapper: ReactWrapper;
  let singleInputForm: ReactWrapper<any>;
  let btnAddNewCategory: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <ColumnsAddCategory
        addCategoryScenarioHandler={addCategoryScenarioHandler}
        span={4}
      />,
    );
    singleInputForm = wrapper.find(SingleInputForm);
    btnAddNewCategory = wrapper.find(btnAddNewCategorySelector);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('ColumnsAddCategory Component is rendering', () => {
    expect(wrapper.exists()).toBe(true);
    expect(singleInputForm.exists()).toBe(false);
    expect(btnAddNewCategory.exists()).toBe(true);
  });

  describe('ColumnsAddCategory Component Interactions', () => {
    it('Should enable Create Category Mode', async () => {
      await act(async () => {
        btnAddNewCategory.simulate('click');
      });

      wrapper.update();

      expect(wrapper.find(SingleInputForm).exists()).toBe(true);
    });
  });

  describe('ColumnsAddCategory Component -> SingleInputForm Component Handlers', () => {
    it('Should invoke "Add Category Handler"', async () => {
      await act(async () => {
        btnAddNewCategory.simulate('click');
      });

      wrapper.update();

      const formSubmitHandler = wrapper
        .find(SingleInputForm)
        .prop('formSubmitHandler');

      await act(async () => {
        formSubmitHandler && formSubmitHandler('category_title');
      });

      wrapper.update();

      expect(addCategoryScenarioHandler).toHaveBeenCalledWith('category_title');
      expect(wrapper.find(SingleInputForm).exists()).toBe(false);
    });

    it('Should invoke Abort "Add Category Handler"', async () => {
      await act(async () => {
        btnAddNewCategory.simulate('click');
      });

      wrapper.update();

      const abortHandler = wrapper.find(SingleInputForm).prop('abortHandler');

      await act(async () => {
        abortHandler && abortHandler();
      });

      wrapper.update();

      expect(wrapper.find(SingleInputForm).exists()).toBe(false);
    });
  });
});
