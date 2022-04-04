import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
// Components
import LinkForm from './LinkForm';
// Test Data
import { links } from '../../__test_data__';

describe('LinkForm Component', () => {
  const handleSubmit = jest.fn();
  const abortHandler = jest.fn();
  const titleInputSelector = 'input.link-form-title-input';
  const linkInputSelector = 'input.link-form-link-input';
  let wrapper: ReactWrapper;
  let form: ReactWrapper;
  let titleInput: ReactWrapper;
  let linkInput: ReactWrapper;
  let btnSubmit: ReactWrapper;
  let btnCancel: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <LinkForm formSubmitHandler={handleSubmit} abortHandler={abortHandler} />,
    );
    form = wrapper.find('form.link-form');
    titleInput = wrapper.find(titleInputSelector);
    linkInput = wrapper.find(linkInputSelector);
    btnSubmit = wrapper.find('button.link-form-btn-submit');
    btnCancel = wrapper.find('button.link-form-btn-cancel');
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('LinkForm is rendering', () => {
    expect(form.exists()).toBe(true);
    expect(titleInput.exists()).toBe(true);
    expect(linkInput.exists()).toBe(true);
    expect(btnSubmit.exists()).toBe(true);
    expect(btnCancel.exists()).toBe(true);
  });

  describe('LinkForm Input is able to input text', () => {
    it('Title Input is able to input text', async () => {
      await act(async () => {
        titleInput.simulate('change', { target: { value: 'somenew' } });
      });

      wrapper.update();

      expect(wrapper.find(titleInputSelector).prop('value')).toEqual('somenew');
    });

    it('Cancel Input is able to input text', async () => {
      await act(async () => {
        linkInput.simulate('change', { target: { value: links.sheets.href } });
      });

      wrapper.update();

      expect(wrapper.find(linkInputSelector).prop('value')).toEqual(
        links.sheets.href,
      );
    });
  });

  describe('LinkForm Handlers', () => {
    it('Submit is triggering', async () => {
      await act(async () => {
        titleInput.simulate('change', { target: { value: 'somenew' } });
        linkInput.simulate('change', { target: { value: links.sheets.href } });
      });

      wrapper.update();

      await act(async () => {
        form.simulate('submit');
      });

      expect(handleSubmit).toHaveBeenCalledWith('somenew', links.sheets.href);
    });

    it('Cancel is triggering', async () => {
      await act(async () => {
        btnCancel.simulate('click');
      });

      expect(abortHandler).toHaveBeenCalled();
    });
  });

  describe('LinkForm Handlers are not triggering when input invalid', () => {
    it('Submit is triggering', async () => {
      await act(async () => {
        titleInput.simulate('change', { target: { value: 'somenew' } });
      });

      wrapper.update();

      await act(async () => {
        form.simulate('submit');
      });

      expect(handleSubmit).not.toHaveBeenCalled();
    });
  });
});
