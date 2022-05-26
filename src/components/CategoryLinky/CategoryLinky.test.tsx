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
  let categoryLinkyTitleWrapper: ReactWrapper;
  let categoryLinkyActionMenuTrigger: ReactWrapper<any>;
  let linky: ReactWrapper<any>;
  let categoryLinkyFormWrapper: ReactWrapper;
  let linkForm: ReactWrapper<any>;

  beforeEach(() => {
    wrapper = mount(
      <CategoryLinky
        link={link}
        updateLinkLastUsedHandler={updateLinkLastUsedHandler}
        formSubmitHandler={formSubmitHandler}
        deleteLinkHandler={deleteLinkHandler}
      />,
    );
    categoryLinkyTitleWrapper = wrapper.find(categoryLinkyTitleWrapperSelector);
    categoryLinkyActionMenuTrigger = categoryLinkyTitleWrapper.find(Button);
    linky = categoryLinkyTitleWrapper.find(Linky);
    categoryLinkyFormWrapper = wrapper.find(categoryLinkyFormWrapperSelector);
    linkForm = wrapper.find(LinkForm);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('CategoryLinky Component is rendering', () => {
    expect(wrapper.exists()).toBe(true);
    expect(categoryLinkyTitleWrapper.exists()).toBe(true);
    expect(categoryLinkyActionMenuTrigger.exists()).toBe(true);
    expect(linky.exists()).toBe(true);
    expect(categoryLinkyFormWrapper.exists()).toBe(true);
    expect(linkForm.exists()).toBe(false);
  });

  describe('CategoryLinky Component Interactions', () => {
    it('Should show/hide LinkForm Component', async () => {
      await act(async () => {
        categoryLinkyActionMenuTrigger.simulate('click');
      });

      wrapper.update();

      expect(wrapper.find(LinkForm).exists()).toBe(true);

      await act(async () => {
        categoryLinkyActionMenuTrigger.simulate('click');
      });

      wrapper.update();

      expect(wrapper.find(LinkForm).exists()).toBe(false);
    });
  });

  describe('CategoryLinky Component -> LinkForm Component Handlers', () => {
    it('Should invoke "Delete Link handler"', async () => {
      await act(async () => {
        categoryLinkyActionMenuTrigger.simulate('click');
      });

      wrapper.update();

      const deleteHandler = wrapper.find(LinkForm).prop('deleteHandler');

      deleteHandler && deleteHandler();

      expect(deleteLinkHandler).toHaveBeenCalledWith(link);
    });

    it('Should invoke "Abort Link handler"', async () => {
      await act(async () => {
        categoryLinkyActionMenuTrigger.simulate('click');
      });

      wrapper.update();

      const abortHandler = wrapper.find(LinkForm).prop('abortHandler');

      await act(async () => {
        abortHandler && abortHandler();
      });

      wrapper.update();

      expect(wrapper.find(LinkForm).exists()).toBe(false);
    });

    it('Should invoke "Save Link handler"', async () => {
      await act(async () => {
        categoryLinkyActionMenuTrigger.simulate('click');
      });

      wrapper.update();

      const submitHandler = wrapper.find(LinkForm).prop('formSubmitHandler');

      await act(async () => {
        submitHandler && submitHandler('title', 'href');
      });

      expect(formSubmitHandler).toHaveBeenCalledWith('title', 'href', link);

      wrapper.update();

      expect(wrapper.find(LinkForm).exists()).toBe(false);
    });

    it('Should not invoke "Save Link handler" when title and href is the same', async () => {
      await act(async () => {
        categoryLinkyActionMenuTrigger.simulate('click');
      });

      wrapper.update();

      const submitHandler = wrapper.find(LinkForm).prop('formSubmitHandler');

      await act(async () => {
        // @ts-ignore
        submitHandler && submitHandler(link.title, link.href);
      });

      expect(formSubmitHandler).not.toHaveBeenCalled();

      wrapper.update();

      expect(wrapper.find(LinkForm).exists()).toBe(false);
    });
  });
});
