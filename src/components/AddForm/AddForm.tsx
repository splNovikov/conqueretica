import React, { FC, FormEvent, useState } from 'react';

const AddForm: FC<{
  formSubmitHandler: (value: string) => void;
}> = ({ formSubmitHandler }) => {
  const [formValue, setFormValue] = useState('');

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormValue('');

    await formSubmitHandler(formValue);
  };

  const handleInputChange = (e: FormEvent<HTMLInputElement>) =>
    setFormValue(e.currentTarget.value);

  return (
    <form onSubmit={handleFormSubmit} className="send-form">
      <input
        value={formValue}
        onChange={handleInputChange}
        placeholder="say something nice"
      />

      <button type="submit" disabled={!formValue}>
        Send
      </button>
    </form>
  );
};

export default AddForm;
