import React, { ChangeEvent, FC, FormEvent, useState } from 'react';

const AddForm: FC<{
  formSubmitHandler: (value: string) => void;
}> = ({ formSubmitHandler }) => {
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
        placeholder="say something nice"
      />

      <button type="submit" disabled={!formValue}>
        Send
      </button>
    </form>
  );
};

export default AddForm;
