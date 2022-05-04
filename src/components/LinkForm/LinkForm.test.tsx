import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
// Components
import LinkForm from './LinkForm';
// Test Data
import { links } from '../../__test_data__';

describe('LinkForm Component', () => {
  const origConsoleWarn = console.warn;
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
    console.warn = jest.fn();
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
    console.warn = origConsoleWarn;
  });

  it('LinkForm is rendering', () => {
    expect(form.exists()).toBe(true);
    expect(titleInput.exists()).toBe(true);
    expect(linkInput.exists()).toBe(true);
    expect(btnSubmit.exists()).toBe(true);
    expect(btnCancel.exists()).toBe(true);
  });

  describe('LinkForm Component interactions', () => {
    it('Title Input is able to input text', async () => {
      await act(async () => {
        titleInput.simulate('change', { target: { value: 'somenew' } });
      });

      wrapper.update();

      expect(wrapper.find(titleInputSelector).prop('value')).toEqual('somenew');
    });

    it('Link Input is able to input text', async () => {
      await act(async () => {
        linkInput.simulate('change', { target: { value: links.sheets.href } });
      });

      wrapper.update();

      expect(wrapper.find(linkInputSelector).prop('value')).toEqual(
        links.sheets.href,
      );
    });
  });

  describe('LinkForm Component Handlers', () => {
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

    it('Submit is not triggering when Href is empty', async () => {
      await act(async () => {
        titleInput.simulate('change', { target: { value: 'somenew' } });
      });

      wrapper.update();

      await act(async () => {
        form.simulate('submit');
      });

      wrapper.update();

      expect(handleSubmit).not.toHaveBeenCalled();
    });

    it('Submit should be triggered when Title is empty', async () => {
      await act(async () => {
        linkInput.simulate('change', { target: { value: links.sheets.href } });
      });

      wrapper.update();

      await act(async () => {
        form.simulate('submit');
      });

      wrapper.update();

      expect(handleSubmit).toHaveBeenCalledWith(
        links.sheets.href,
        links.sheets.href,
      );
    });

    it('Submit is not triggering when Href is equals spaces', async () => {
      await act(async () => {
        titleInput.simulate('change', { target: { value: 'somenew' } });
        linkInput.simulate('change', { target: { value: '     ' } });
      });

      wrapper.update();

      await act(async () => {
        form.simulate('submit');
      });

      wrapper.update();

      expect(handleSubmit).not.toHaveBeenCalled();
    });
  });
});
