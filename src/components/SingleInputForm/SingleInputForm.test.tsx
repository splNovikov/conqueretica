import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
// Utils
import { getInputValue, updateInputValue } from '../../testUtils';
// Components
import SingleInputForm from './SingleInputForm';
import { links } from '../../__test_data__';

describe('SingleInputForm Component', () => {
  const formSubmitHandler = jest.fn();
  const abortHandler = jest.fn();
  // Selectors
  const inputSelector = 'input[type="text"]';
  const submitButtonSelector =
    'button[type="submit"].single-input-form-submit-btn';
  const cancelButtonSelector = 'button.single-input-form-cancel-btn';
  const formSelector = 'form.single-input-form';
  // Wrappers
  let wrapper: ReactWrapper;

  const getWrappers = (w: ReactWrapper) => ({
    form: w.find(formSelector),
    input: w.find(inputSelector),
    submitButton: w.find(submitButtonSelector),
    cancelButton: w.find(cancelButtonSelector),
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe('SingleInputForm Component is rendering elements', () => {
    beforeEach(() => {
      wrapper = mount(
        <SingleInputForm
          formSubmitHandler={formSubmitHandler}
          placeholder="place-holder"
          abortHandler={abortHandler}
        />,
      );
    });

    it('SingleInputForm is rendering', () => {
      const { form, input, submitButton, cancelButton } = getWrappers(wrapper);

      expect(wrapper.exists()).toBe(true);
      expect(form.exists()).toBe(true);
      expect(input.exists()).toBe(true);
      expect(input.prop('placeholder')).toBe('place-holder');
      expect(getInputValue(input)).toBe('');
      expect(submitButton.exists()).toBe(true);
      expect(cancelButton.exists()).toBe(true);
    });
  });

  describe('SingleInputForm Component Interactions', () => {
    beforeEach(() => {
      wrapper = mount(
        <SingleInputForm
          formSubmitHandler={formSubmitHandler}
          placeholder="placeholder"
          abortHandler={abortHandler}
        />,
      );
    });

    it('Input is able to receive text', async () => {
      const { input } = getWrappers(wrapper);

      await act(async () => {
        updateInputValue(input, 'somenew');
      });

      wrapper.update();

      const inputValue = getInputValue(getWrappers(wrapper).input);

      expect(inputValue).toEqual('somenew');
    });
  });

  describe('SingleInputForm Handlers', () => {
    beforeEach(() => {
      wrapper = mount(
        <SingleInputForm
          formSubmitHandler={formSubmitHandler}
          placeholder="placeholder"
          abortHandler={abortHandler}
        />,
      );
    });

    it('Submit handler should be triggered', async () => {
      const { input, form } = getWrappers(wrapper);

      await act(async () => {
        updateInputValue(input, 'somenew');
      });

      wrapper.update();

      await act(async () => {
        form.simulate('submit');
      });

      wrapper.update();

      expect(formSubmitHandler).toHaveBeenCalledWith('somenew');
      expect(getInputValue(getWrappers(wrapper).input)).toBe('');
    });
  });
});
