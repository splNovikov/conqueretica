import React from 'react';
import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';

import AddForm from './AddForm';

const inputLocator = 'input[type="text"]';
const buttonLocator = 'button[type="submit"]';

// todo add tests for placeholder="placeholder"
describe('AddForm Elements Presence', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(
      <AddForm formSubmitHandler={() => 1} placeholder="placeholder" />,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('AddForm is rendering', () => {
    expect(wrapper.hasClass('send-form')).toEqual(true);
  });

  it('AddForm Input is rendering', () => {
    const inputEl = wrapper.find(inputLocator);

    expect(inputEl.exists()).toBe(true);
  });

  it('AddForm Input is empty by default', () => {
    const inputEl = wrapper.find(inputLocator);

    expect(inputEl.prop('value')).toEqual('');
  });

  it('AddForm Button is rendering', () => {
    const buttonEl = wrapper.find(buttonLocator);

    expect(buttonEl.exists()).toBe(true);
    expect(buttonEl.prop('disabled')).toBe(true);
  });
});

describe('AddForm Element Events', () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(
      <AddForm formSubmitHandler={() => 1} placeholder="placeholder" />,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Input is able to receive text', () => {
    const inputEl = wrapper.find(inputLocator);

    inputEl.simulate('change', { target: { value: 'somenew' } });

    expect(wrapper.find(inputLocator).prop('value')).toEqual('somenew');
  });

  it('Input text should enable button', () => {
    const inputEl = wrapper.find(inputLocator);

    inputEl.simulate('change', { target: { value: 'somenew' } });

    const buttonEl = wrapper.find(buttonLocator);
    expect(buttonEl.prop('disabled')).toBe(false);
  });
});

describe('AddForm Handlers', () => {
  const handleSubmit = jest.fn();
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <AddForm formSubmitHandler={handleSubmit} placeholder="placeholder" />,
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

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
