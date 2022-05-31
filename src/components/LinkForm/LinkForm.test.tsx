import React, { useRef } from 'react';
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

      it('Delete button should not invoke delete handler when deleteHandler is not passed', async () => {
        wrapper.unmount();
        wrapper = mount(
          <LinkForm
            href={links.sheets.href}
            title="any-title"
            deleteHandler={123}
            formSubmitHandler={handleSubmit}
            abortHandler={abortHandler}
          />,
        );

        const { btnDelete } = getWrappers(wrapper);

        await act(async () => {
          btnDelete.simulate('click');
        });

        expect(deleteHandler).not.toHaveBeenCalled();
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

      it('"Not Esc" event should NOT invoke abort handler at Href', async () => {
        const { linkInput } = getWrappers(wrapper);

        await act(async () => {
          linkInput.simulate('keydown', { key: 'A' });
        });

        expect(abortHandler).not.toHaveBeenCalled();
      });
    });
  });

  describe('LinkForm Component - Error Handlers', () => {
    const formErrorsHandler = jest.fn();

    beforeEach(() => {
      wrapper = mount(
        <LinkForm
          formSubmitHandler={handleSubmit}
          formErrorsHandler={formErrorsHandler}
          abortHandler={abortHandler}
        />,
      );
    });

    it('Typing should NOT invoke formErrorsHandler if formErrorsHandler has NOT been passed as a parameter', async () => {
      wrapper.unmount();
      wrapper = mount(
        <LinkForm
          formSubmitHandler={handleSubmit}
          formErrorsHandler={undefined}
          abortHandler={abortHandler}
        />,
      );

      const { titleInput } = getWrappers(wrapper);

      await act(async () => {
        updateInputValue(titleInput, 'somenew');
      });

      expect(formErrorsHandler).not.toHaveBeenCalled();
    });

    it('Typing should invoke formErrorsHandler if formErrorsHandler has been passed as a parameter', async () => {
      const { titleInput } = getWrappers(wrapper);

      await act(async () => {
        updateInputValue(titleInput, 'somenew');
      });

      expect(formErrorsHandler).toHaveBeenCalledWith(0);
    });

    it('Typing should invoke formErrorsHandler with 1 as param', async () => {
      const { linkInput } = getWrappers(wrapper);

      await act(async () => {
        updateInputValue(linkInput, 'somenew');
      });

      expect(formErrorsHandler).toHaveBeenCalledWith(1);
    });
  });

  describe('LinkForm Component - Outside click', () => {
    const TestLinkForm = () => {
      const ref = useRef<HTMLElement>(null);

      return (
        <div>
          <div className="outside">Outside El</div>
          <div className="outside-ignored" ref={ref}>
            Outside El
          </div>
          <LinkForm
            outsideClickIgnoreElements={[ref]}
            formSubmitHandler={handleSubmit}
            abortHandler={abortHandler}
            formErrorsHandler={undefined}
          />
        </div>
      );
    };
    const eventListener = {};
    document.addEventListener = (evt, cb) => (eventListener[evt] = cb);
    // Selectors
    const outsideWrapperSelector = 'div.outside';
    const outsideIgnoredWrapperSelector = 'div.outside-ignored';

    const getOutsideClickWrappers = (w: ReactWrapper) => {
      const outsideWrapper = w.find(outsideWrapperSelector);
      const outsideIgnoredWrapper = w.find(outsideIgnoredWrapperSelector);

      return {
        outsideWrapper,
        outsideEl: outsideWrapper.getDOMNode(),
        outsideIgnoredWrapper,
        outsideIgnoredEl: outsideIgnoredWrapper.getDOMNode(),
      };
    };

    beforeEach(() => {
      wrapper = mount(<TestLinkForm />);
    });

    it('Should trigger abort handler on outside click', async () => {
      const { outsideEl } = getOutsideClickWrappers(wrapper);

      eventListener.mousedown({ target: outsideEl });
      eventListener.mouseup({ target: outsideEl });

      expect(abortHandler).toHaveBeenCalled();
    });

    it('Should not trigger abort handler on outside click on ignored element', async () => {
      const { outsideIgnoredEl } = getOutsideClickWrappers(wrapper);

      eventListener.mousedown({ target: outsideIgnoredEl });
      eventListener.mouseup({ target: outsideIgnoredEl });

      expect(abortHandler).not.toHaveBeenCalled();
    });
  });
});
