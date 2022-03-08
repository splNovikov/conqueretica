import React from 'react';
import { mount, shallow } from 'enzyme';
// Components
import AddLinkForm from './AddLinkForm';

describe('Add Link Form', () => {
  it('Add Link Form is rendering', () => {
    const wrapper = shallow(<AddLinkForm createLinkHandler={() => {}} />);
    expect(wrapper.hasClass('toggle-form-display-button')).toEqual(true);
  });

  it('Add Link Form Component is rendering necessary elements', () => {
    const wrapper = mount(<AddLinkForm createLinkHandler={() => {}} />);

    const buttonEl = wrapper.find('button.toggle-form-display-button');
    expect(buttonEl.exists()).toBeTruthy();

    buttonEl.simulate('click');

    const formEl = wrapper.find('form.add-link-form');
    expect(formEl.exists()).toBeTruthy();

    const titleInputEl = wrapper.find('input.title-input');
    expect(titleInputEl.exists()).toBeTruthy();

    const hrefInputEl = wrapper.find('input.href-input');
    expect(hrefInputEl.exists()).toBeTruthy();
    expect(hrefInputEl.hasClass('href-is-invalid')).toBeTruthy();
  });

  it('Form should be able to receive texts', () => {
    const wrapper = mount(<AddLinkForm createLinkHandler={() => {}} />);
    const buttonEl = wrapper.find('button.toggle-form-display-button');
    buttonEl.simulate('click');

    const titleInputEl = wrapper.find('input.title-input');
    titleInputEl.simulate('change', { target: { value: 'somenew' } });
    const titleInputEl2 = wrapper.find('input.title-input');
    expect(titleInputEl2.prop('value')).toBe('somenew');

    const hrefInputEl = wrapper.find('input.href-input');
    hrefInputEl.simulate('change', { target: { value: 'somenew' } });
    expect(hrefInputEl.hasClass('href-is-invalid')).toBeTruthy();
    hrefInputEl.simulate('change', { target: { value: 'https://ya.ru' } });
    const hrefInputEl2 = wrapper.find('input.href-input');
    expect(hrefInputEl2.prop('value')).toBe('https://ya.ru');

    expect(hrefInputEl2.hasClass('href-is-invalid')).toBeFalsy();
  });

  describe('Add Link Form Handlers', () => {
    it('Should handle Submit', () => {
      const handleSubmit = jest.fn();
      const wrapper = mount(<AddLinkForm createLinkHandler={handleSubmit} />);
      const buttonEl = wrapper.find('button.toggle-form-display-button');
      buttonEl.simulate('click');

      const formEl = wrapper.find('form.add-link-form');
      const titleInputEl = wrapper.find('input.title-input');
      const hrefInputEl = wrapper.find('input.href-input');

      titleInputEl.simulate('change', { target: { value: 'somenew' } });
      hrefInputEl.simulate('change', { target: { value: 'https://ya.ru' } });

      formEl.simulate('submit');

      expect(handleSubmit).toHaveBeenCalledWith('somenew', 'https://ya.ru');
    });
  });
});
