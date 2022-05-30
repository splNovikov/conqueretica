import React from 'react';
import { Button } from 'antd';
import { mount, ReactWrapper } from 'enzyme';
// Components
import CategoryLinky from './CategoryLinky';
import Linky from '../Linky';
import LinkForm from '../LinkForm';
// Test Data
import { categories } from '../../__test_data__';
import { act } from 'react-dom/test-utils';

describe('CategoryLinky Component', () => {
  const updateLinkLastUsedHandler = jest.fn();
  const formSubmitHandler = jest.fn();
  const deleteLinkHandler = jest.fn();
  // Selectors
  const categoryLinkyTitleWrapperSelector = 'div.category-linky-title-wrapper';
  const categoryLinkyFormWrapperSelector = 'div.category-linky-form-wrapper';
  // Test Data
  const link = categories[0].links[0];
  // Wrappers
  let wrapper: ReactWrapper;

  const getWrappers = (w: ReactWrapper) => {
    const categoryLinkyTitleWrapper = wrapper.find(
      categoryLinkyTitleWrapperSelector,
    );

    return {
      categoryLinkyTitleWrapper,
      categoryLinkyActionMenuTrigger: categoryLinkyTitleWrapper.find(Button),
      linky: categoryLinkyTitleWrapper.find(Linky),
      categoryLinkyFormWrapper: wrapper.find(categoryLinkyFormWrapperSelector),
      linkForm: wrapper.find(LinkForm),
    };
  };

  beforeEach(() => {
    wrapper = mount(
      <CategoryLinky
        link={link}
        updateLinkLastUsedHandler={updateLinkLastUsedHandler}
        formSubmitHandler={formSubmitHandler}
        deleteLinkHandler={deleteLinkHandler}
      />,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('CategoryLinky Component is rendering', () => {
    expect(wrapper.exists()).toBe(true);

    const {
      categoryLinkyTitleWrapper,
      categoryLinkyActionMenuTrigger,
      linky,
      categoryLinkyFormWrapper,
      linkForm,
    } = getWrappers(wrapper);

    expect(categoryLinkyTitleWrapper.exists()).toBe(true);
    expect(categoryLinkyActionMenuTrigger.exists()).toBe(true);
    expect(linky.exists()).toBe(true);
    expect(categoryLinkyFormWrapper.exists()).toBe(true);
    expect(linkForm.exists()).toBe(false);
  });

  describe('CategoryLinky Component Interactions', () => {
    it('Should show/hide LinkForm Component', async () => {
      const { categoryLinkyActionMenuTrigger } = getWrappers(wrapper);

      await act(async () => {
        categoryLinkyActionMenuTrigger.simulate('click');
      });

      wrapper.update();

      expect(getWrappers(wrapper).linkForm.exists()).toBe(true);

      await act(async () => {
        categoryLinkyActionMenuTrigger.simulate('click');
      });

      wrapper.update();

      expect(getWrappers(wrapper).linkForm.exists()).toBe(false);
    });
  });

  describe('CategoryLinky Component -> LinkForm Component Handlers', () => {
    it('Should invoke "Delete Link handler"', async () => {
      await act(async () => {
        getWrappers(wrapper).categoryLinkyActionMenuTrigger.simulate('click');
      });

      wrapper.update();

      const deleteHandler = getWrappers(wrapper).linkForm.prop('deleteHandler');

      await act(async () => {
        deleteHandler && deleteHandler();
      });

      expect(deleteLinkHandler).toHaveBeenCalledWith(link);
    });

    it('Should invoke "Abort Link handler"', async () => {
      await act(async () => {
        getWrappers(wrapper).categoryLinkyActionMenuTrigger.simulate('click');
      });

      wrapper.update();

      const abortHandler = getWrappers(wrapper).linkForm.prop('abortHandler');

      await act(async () => {
        abortHandler && abortHandler();
      });

      wrapper.update();

      expect(getWrappers(wrapper).linkForm.exists()).toBe(false);
    });

    it('Should invoke "Save Link handler"', async () => {
      await act(async () => {
        getWrappers(wrapper).categoryLinkyActionMenuTrigger.simulate('click');
      });

      wrapper.update();

      const submitHandler =
        getWrappers(wrapper).linkForm.prop('formSubmitHandler');

      await act(async () => {
        submitHandler && submitHandler('title', 'href');
      });

      expect(formSubmitHandler).toHaveBeenCalledWith('title', 'href', link);

      wrapper.update();

      expect(getWrappers(wrapper).linkForm.exists()).toBe(false);
    });

    it('Should not invoke "Save Link handler" when title and href is the same', async () => {
      await act(async () => {
        getWrappers(wrapper).categoryLinkyActionMenuTrigger.simulate('click');
      });

      wrapper.update();

      const submitHandler =
        getWrappers(wrapper).linkForm.prop('formSubmitHandler');

      await act(async () => {
        // @ts-ignore
        submitHandler && submitHandler(link.title, link.href);
      });

      expect(formSubmitHandler).not.toHaveBeenCalled();

      wrapper.update();

      expect(getWrappers(wrapper).linkForm.exists()).toBe(false);
    });

    it('Should update state when Form changed woth error', async () => {
      await act(async () => {
        getWrappers(wrapper).categoryLinkyActionMenuTrigger.simulate('click');
      });

      wrapper.update();

      const formErrorsHandler =
        getWrappers(wrapper).linkForm.prop('formErrorsHandler');

      await act(async () => {
        // @ts-ignore
        formErrorsHandler && formErrorsHandler(1);
      });

      wrapper.update();

      expect(
        getWrappers(wrapper).categoryLinkyFormWrapper.hasClass(
          'link-form-errors-1',
        ),
      ).toBe(true);
    });
  });
});
