import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuthState } from 'react-firebase-hooks/auth';

import firebase from '../../firebase';

import AppRoutes from '../AppRoutes';

import './App.scss';

const App = () => {
  const [user] = useAuthState(firebase.auth);

  return (
    <div className="app">
      <section>
        {user ? (
          <>
            <ChatRoom />
            <SignOut />
          </>
        ) : (
          <Login />
        )}
      </section>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <AppRoutes />
    </div>
  );
};

function Login() {
  return (
    <button type="button" onClick={firebase.signInWithGoogle}>
      Login with Google
    </button>
  );
}

function SignOut() {
  return (
    <button type="button" className="sign-out" onClick={firebase.signOut}>
      Sign Out
    </button>
  );
}

function ChatRoom() {
  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e: any) => {
    e.preventDefault();

    if (firebase.auth.currentUser) {
      await firebase.sendMessage(formValue, firebase.auth.currentUser);
      setFormValue('');
    } else {
      // todo [after release]: error handling
      // eslint-disable-next-line no-console
      console.error('No User');
    }
  };

  return (
    <form onSubmit={sendMessage}>
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
}

export default App;
