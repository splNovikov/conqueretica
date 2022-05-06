import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';
// Components
import LinkForm from './LinkForm';
// Utils
import { updateInputValue, getInputValue } from '../../testUtils';
// Test Data
import { links } from '../../__test_data__';

describe('LinkForm Component', () => {
  const origConsoleWarn = console.warn;
  const handleSubmit = jest.fn();
  const abortHandler = jest.fn();
  const deleteHandler = jest.fn();
  // Selectors
  const formSelector = 'form.link-form';
  const titleInputSelector = 'input.link-form-title-input';
  const linkInputSelector = 'input.link-form-link-input';
  const formSubmitButtonSelector = 'button.link-form-btn-submit';
  const formCancelButtonSelector = 'button.link-form-btn-cancel';
  const formDeleteButtonSelector = 'button.link-form-btn-delete';
  // Wrappers
  let wrapper: ReactWrapper;

  const getWrappers = (w: ReactWrapper) => ({
    form: w.find(formSelector),
    titleInput: w.find(titleInputSelector),
    linkInput: w.find(linkInputSelector),
    btnSubmit: w.find(formSubmitButtonSelector),
    btnCancel: w.find(formCancelButtonSelector),
    btnDelete: w.find(formDeleteButtonSelector),
  });

  beforeEach(() => {
    console.warn = jest.fn();
  });

  afterEach(() => {
    wrapper.unmount();
    console.warn = origConsoleWarn;
  });

  describe('LinkForm Component (Create Link)', () => {
    beforeEach(() => {
      wrapper = mount(
        <LinkForm
          formSubmitHandler={handleSubmit}
          abortHandler={abortHandler}
        />,
      );
    });

    it('LinkForm Component (Create Link) is rendering', () => {
      const { form, titleInput, linkInput, btnCancel, btnDelete, btnSubmit } =
        getWrappers(wrapper);

      expect(form.exists()).toBe(true);
      expect(titleInput.exists()).toBe(true);
      expect(linkInput.exists()).toBe(true);
      expect(btnSubmit.exists()).toBe(true);
      expect(btnCancel.exists()).toBe(true);
      expect(btnDelete.exists()).toBe(false);
      expect(getInputValue(titleInput)).toBe('');
      expect(getInputValue(linkInput)).toBe('');
    });

    describe('LinkForm Component (Create Link) interactions', () => {
      it('Title Input is able to input text', async () => {
        const { titleInput } = getWrappers(wrapper);

        await act(async () => {
          updateInputValue(titleInput, 'somenew');
        });

        wrapper.update();

        const inputValue = getInputValue(getWrappers(wrapper).titleInput);

        expect(inputValue).toEqual('somenew');
      });

      it('Link Input is able to input text', async () => {
        const { linkInput } = getWrappers(wrapper);

        await act(async () => {
          updateInputValue(linkInput, links.sheets.href);
        });

        wrapper.update();

        const inputValue = getInputValue(getWrappers(wrapper).linkInput);

        expect(inputValue).toEqual(links.sheets.href);
      });
    });

    describe('LinkForm Component (Create Link) Handlers', () => {
      it('Submit is triggering', async () => {
        const { titleInput, linkInput, form } = getWrappers(wrapper);

        await act(async () => {
          updateInputValue(titleInput, 'somenew');
          updateInputValue(linkInput, links.sheets.href);
        });

        wrapper.update();

        await act(async () => {
          form.simulate('submit');
        });

        expect(handleSubmit).toHaveBeenCalledWith('somenew', links.sheets.href);
      });

      it('Cancel is triggering', async () => {
        const { btnCancel } = getWrappers(wrapper);

        await act(async () => {
          btnCancel.simulate('click');
        });

        expect(abortHandler).toHaveBeenCalled();
      });

      it('Submit is not triggering when Href is empty', async () => {
        const { titleInput, form } = getWrappers(wrapper);

        await act(async () => {
          updateInputValue(titleInput, 'somenew');
        });

        wrapper.update();

        await act(async () => {
          form.simulate('submit');
        });

        wrapper.update();

        expect(handleSubmit).not.toHaveBeenCalled();
      });

      it('Submit should be triggered when Title is empty', async () => {
        const { linkInput, form } = getWrappers(wrapper);

        await act(async () => {
          updateInputValue(linkInput, links.sheets.href);
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
        const { titleInput, linkInput, form } = getWrappers(wrapper);

        await act(async () => {
          updateInputValue(titleInput, 'somenew');
          updateInputValue(linkInput, '     ');
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

  describe('LinkForm Component (Edit Link)', () => {
    beforeEach(() => {
      wrapper = mount(
        <LinkForm
          href={links.sheets.href}
          title="any-title"
          deleteHandler={deleteHandler}
          formSubmitHandler={handleSubmit}
          abortHandler={abortHandler}
        />,
      );
    });

    it('LinkForm Component (Edit Link) is rendering', () => {
      const { form, titleInput, linkInput, btnCancel, btnDelete, btnSubmit } =
        getWrappers(wrapper);

      expect(form.exists()).toBe(true);
      expect(titleInput.exists()).toBe(true);
      expect(linkInput.exists()).toBe(true);
      expect(btnSubmit.exists()).toBe(true);
      expect(btnCancel.exists()).toBe(true);
      expect(btnDelete.exists()).toBe(true);
      expect(getInputValue(titleInput)).toBe('any-title');
      expect(getInputValue(linkInput)).toBe(links.sheets.href);
    });

    describe('LinkForm Component (Edit Link) Handlers', () => {
      it('Delete button should invoke delete handler', async () => {
        const { btnDelete } = getWrappers(wrapper);

        await act(async () => {
          btnDelete.simulate('click');
        });

        expect(deleteHandler).toHaveBeenCalled();
      });

      it('Esc event should invoke abort handler at Title', async () => {
        const { titleInput } = getWrappers(wrapper);

        await act(async () => {
          titleInput.simulate('keydown', { key: 'Escape' });
        });

        expect(abortHandler).toHaveBeenCalled();
      });

      it('Esc event should invoke abort handler at Href', async () => {
        const { linkInput } = getWrappers(wrapper);

        await act(async () => {
          linkInput.simulate('keydown', { key: 'Escape' });
        });

        expect(abortHandler).toHaveBeenCalled();
      });
    });
  });
});
