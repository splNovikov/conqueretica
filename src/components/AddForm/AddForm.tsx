import React, { ChangeEvent, FC, FormEvent, useState } from 'react';

const AddForm: FC<{
  placeholder: string;
  formSubmitHandler: (value: string) => void;
}> = ({ placeholder, formSubmitHandler }) => {
  const [formValue, setFormValue] = useState('');

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormValue('');

    await formSubmitHandler(formValue);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFormValue(e.target.value);

  return (
    <form onSubmit={handleFormSubmit} className="send-form">
      <input
        type="text"
        value={formValue}
        onChange={handleInputChange}
        placeholder={placeholder}
      />

      <button type="submit" disabled={!formValue}>
        Send
      </button>
    </form>
  );
};

// todo: this form is obsolete. Let's remove it once all usages eliminated
export default AddForm;
