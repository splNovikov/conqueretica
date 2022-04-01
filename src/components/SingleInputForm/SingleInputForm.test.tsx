import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

import SingleInputForm from './SingleInputForm';

const inputLocator = 'input[type="text"]';
const buttonLocator = 'button[type="submit"]';

// todo add tests for placeholder="placeholder"
describe('SingleInputForm', () => {
  const handleSubmit = jest.fn();
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <SingleInputForm
        value=""
        formSubmitHandler={handleSubmit}
        placeholder="placeholder"
        abortHandler={() => 1}
      />,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe('SingleInputForm Elements Presence', () => {
    it('SingleInputForm is rendering', () => {
      expect(wrapper.childAt(0).hasClass('single-input-form')).toEqual(true);
    });

    it('SingleInputForm Input is rendering', () => {
      const inputEl = wrapper.find(inputLocator);

      expect(inputEl.exists()).toBe(true);
    });

    it('SingleInputForm Input is empty by default', () => {
      const inputEl = wrapper.find(inputLocator);

      expect(inputEl.prop('value')).toEqual('');
    });

    it('SingleInputForm Button is rendering', () => {
      const buttonEl = wrapper.find(buttonLocator);

      expect(buttonEl.exists()).toBe(true);
    });
  });

  describe('SingleInputForm Element Events', () => {
    it('Input is able to receive text', async () => {
      const inputEl = wrapper.find(inputLocator);

      await act(async () => {
        inputEl.simulate('change', { target: { value: 'somenew' } });
      });

      wrapper.update();

      expect(wrapper.find(inputLocator).prop('value')).toEqual('somenew');
    });
  });

  describe('SingleInputForm Handlers', () => {
    it('Input should be cleared after submit', async () => {
      const inputEl = wrapper.find(inputLocator);

      await act(async () => {
        inputEl.simulate('change', { target: { value: 'somenew' } });
      });

      await act(async () => {
        wrapper.simulate('submit');
      });

      wrapper.update();

      expect(wrapper.find(inputLocator).prop('value')).toEqual('');
    });

    it('Submit handler should be triggered', async () => {
      const inputEl = wrapper.find(inputLocator);

      await act(async () => {
        inputEl.simulate('change', { target: { value: 'somenew' } });
      });

      await act(async () => {
        wrapper.simulate('submit');
      });

      expect(handleSubmit).toHaveBeenCalledWith('somenew');
    });
  });
});
