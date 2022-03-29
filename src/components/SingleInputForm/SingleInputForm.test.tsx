import React from 'react';
import { mount, ReactWrapper } from 'enzyme';

import SingleInputForm from './SingleInputForm';

const inputLocator = 'input[type="text"]';
const buttonLocator = 'button[type="submit"]';

// todo add tests for placeholder="placeholder"
describe('SingleInputForm', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <SingleInputForm
        formSubmitHandler={() => 1}
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
    it('Input is able to receive text', () => {
      const inputEl = wrapper.find(inputLocator);

      inputEl.simulate('change', { target: { value: 'somenew' } });

      expect(wrapper.find(inputLocator).prop('value')).toEqual('somenew');
    });
  });

  describe('SingleInputForm Handlers', () => {
    const handleSubmit = jest.fn();

    it('Input should be cleared after submit', () => {
      const inputEl = wrapper.find(inputLocator);

      inputEl.simulate('change', { target: { value: 'somenew' } });

      expect(wrapper.find(inputLocator).prop('value')).toEqual('somenew');

      wrapper.simulate('submit');

      expect(wrapper.find(inputLocator).prop('value')).toEqual('');
    });

    it('Input handler should be triggered', () => {
      const inputEl = wrapper.find(inputLocator);

      inputEl.simulate('change', { target: { value: 'somenew' } });

      expect(wrapper.find(inputLocator).prop('value')).toEqual('somenew');

      wrapper.simulate('submit');

      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
