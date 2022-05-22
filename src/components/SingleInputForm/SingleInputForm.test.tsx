import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
// Utils
import { getInputValue, updateInputValue } from '../../testUtils';
// Components
import SingleInputForm from './SingleInputForm';

describe('SingleInputForm Component', () => {
  const formSubmitHandler = jest.fn();
  const abortHandler = jest.fn();
  // Selectors
  const inputSelector = 'input[type="text"]';
  const submitButtonSelector =
    'button[type="submit"].single-input-form-submit-btn';
  const formItemErrorSelector = 'div.ant-form-item-explain-error';
  const cancelButtonSelector = 'button.single-input-form-cancel-btn';
  const formSelector = 'form.single-input-form';
  // Wrappers
  let wrapper: ReactWrapper;

  const getWrappers = (w: ReactWrapper) => ({
    form: w.find(formSelector),
    input: w.find(inputSelector),
    submitButton: w.find(submitButtonSelector),
    formItemError: w.find(formItemErrorSelector),
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
      const { form, input, submitButton, formItemError, cancelButton } =
        getWrappers(wrapper);

      expect(wrapper.exists()).toBe(true);
      expect(form.exists()).toBe(true);
      expect(input.exists()).toBe(true);
      expect(input.prop('placeholder')).toBe('place-holder');
      expect(getInputValue(input)).toBe('');
      expect(submitButton.exists()).toBe(true);
      expect(formItemError.exists()).toBe(false);
      expect(cancelButton.exists()).toBe(true);
    });
  });

  describe('SingleInputForm Component Interactions', () => {
    const origConsoleError = console.warn;

    beforeEach(() => {
      console.warn = jest.fn();

      wrapper = mount(
        <SingleInputForm
          formSubmitHandler={formSubmitHandler}
          placeholder="placeholder"
          abortHandler={abortHandler}
        />,
      );
    });

    afterEach(() => {
      console.warn = origConsoleError;
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

    it('Input max characters default value shows error', async () => {
      const { input } = getWrappers(wrapper);

      await act(async () => {
        updateInputValue(input, '12345678901234567890');
      });
      wrapper.update();
      await act(async () => {
        updateInputValue(input, '123456789012345678901');
      });
      wrapper.update();

      const { formItemError } = getWrappers(wrapper);
      expect(formItemError.exists()).toBe(true);
      expect(formItemError.text()).toBe('Max 20 characters');
    });

    it('Input max characters prop value shows error', async () => {
      wrapper = mount(
        <SingleInputForm
          formSubmitHandler={formSubmitHandler}
          placeholder="placeholder"
          abortHandler={abortHandler}
          maxCharacters={30}
        />,
      );
      const { input } = getWrappers(wrapper);

      await act(async () => {
        updateInputValue(input, '123456789012345678901234567890');
      });
      wrapper.update();
      await act(async () => {
        updateInputValue(input, '1234567890123456789012345678901');
      });
      wrapper.update();

      const { formItemError } = getWrappers(wrapper);
      expect(formItemError.exists()).toBe(true);
      expect(formItemError.text()).toBe('Max 30 characters');
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

    it('Abort Handler should be triggered', async () => {
      const { cancelButton } = getWrappers(wrapper);

      await act(async () => {
        cancelButton.simulate('click');
      });

      expect(abortHandler).toHaveBeenCalled();
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

    it('Submit handler should not be triggered when value is spaces', async () => {
      const { input, form } = getWrappers(wrapper);

      await act(async () => {
        updateInputValue(input, '     ');
      });

      wrapper.update();

      await act(async () => {
        form.simulate('submit');
      });

      wrapper.update();

      expect(formSubmitHandler).not.toHaveBeenCalled();
      expect(getInputValue(getWrappers(wrapper).input)).toBe('');
    });

    it('Esc event should invoke abort handler at Href', async () => {
      const { input } = getWrappers(wrapper);

      await act(async () => {
        input.simulate('keydown', { key: 'Escape' });
      });

      expect(abortHandler).toHaveBeenCalled();
    });

    it('"Not Esc" event should NOT invoke abort handler at Href', async () => {
      const { input } = getWrappers(wrapper);

      await act(async () => {
        input.simulate('keydown', { key: 'A' });
      });

      expect(abortHandler).not.toHaveBeenCalled();
    });
  });

  describe('SingleInputForm Component - Outside click', () => {
    const eventListener = {};
    document.addEventListener = (evt, cb) => (eventListener[evt] = cb);
    // Selectors
    const outsideWrapperSelector = 'div.outside';

    const getOutsideClickWrappers = (w: ReactWrapper) => {
      const outsideWrapper = w.find(outsideWrapperSelector);

      return {
        outsideWrapper,
        outsideEl: outsideWrapper.getDOMNode(),
      };
    };

    beforeEach(() => {
      wrapper = mount(
        <div>
          <div className="outside">Outside El</div>

          <SingleInputForm
            formSubmitHandler={formSubmitHandler}
            placeholder="placeholder"
            abortHandler={abortHandler}
          />
        </div>,
      );
    });

    it('Should trigger abort handler on outside click', async () => {
      const { outsideEl } = getOutsideClickWrappers(wrapper);

      eventListener.mousedown({ target: outsideEl });
      eventListener.mouseup({ target: outsideEl });

      expect(abortHandler).toHaveBeenCalled();
    });
  });
});
