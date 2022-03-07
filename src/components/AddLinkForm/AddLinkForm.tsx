import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import classNames from 'classnames';
// Utils
import { urlValidation } from '../../utils';

// Styles
import './AddLinkForm.scss';

const AddLinkForm: FC<{
  createLinkHandler: (title: string, href: string) => void;
}> = ({ createLinkHandler }) => {
  const [displayForm, setDisplayForm] = useState(false);
  const [title, setTitle] = useState('');
  const [href, setHref] = useState('');
  const [hrefIsValid, setHrefIsValid] = useState(false);

  const handleTitleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);

  const handleHrefInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setHref(value);
    setHrefIsValid(urlValidation(value));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    clearForm();

    await createLinkHandler(title || href, href);
  };

  const toggleDisplayForm = () => {
    setDisplayForm(!displayForm);
  };

  const clearForm = () => {
    setTitle('');
    setHref('');
    setDisplayForm(false);
  };

  return !displayForm ? (
    <button
      type="button"
      className="toggle-form-display-button"
      onClick={toggleDisplayForm}
    >
      Add Link
    </button>
  ) : (
    <form onSubmit={handleFormSubmit} className="add-link-form">
      <input
        type="text"
        value={title}
        onChange={handleTitleInputChange}
        placeholder="Title"
      />
      <input
        className={classNames('href-input', {
          'href-is-invalid': !hrefIsValid,
        })}
        type="url"
        value={href}
        onChange={handleHrefInputChange}
        placeholder="Href"
      />

      <button
        type="submit"
        disabled={!hrefIsValid}
        className="submit-form-button"
      >
        Create
      </button>
    </form>
  );
};

export default AddLinkForm;
