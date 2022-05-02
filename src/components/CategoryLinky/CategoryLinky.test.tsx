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
});
