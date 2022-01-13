import React, { FC, FormEvent, useState } from 'react';

// Firebase
import firebase from '../../firebase';
// Utils
import { defaultErrorHandler } from '../../utils';

const SendForm: FC = () => {
  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();

    if (firebase.auth.currentUser) {
      await firebase.sendMessage(formValue, firebase.auth.currentUser);
      setFormValue('');
    } else {
      defaultErrorHandler('No User');
    }
  };

  return (
    <form onSubmit={sendMessage} className="send-form">
      <input
        value={formValue}
        onChange={(e) => setFormValue(e.target.value)}
        placeholder="say something nice"
      />

      <button type="submit" disabled={!formValue}>
        Send
      </button>
    </form>
  );
};

export default SendForm;
