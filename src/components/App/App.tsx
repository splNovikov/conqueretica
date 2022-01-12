import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  collection,
  query,
  serverTimestamp,
  addDoc,
  where,
} from 'firebase/firestore';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
// todo: we should operate User entity only.

import { auth, firestoreDB, signInWithGoogle, signOut } from '../../firebase';

import AppRoutes from '../AppRoutes';

import './App.scss';

const App = () => {
  // todo: pass somehow user in store? useContext?
  const [user] = useAuthState(auth);

  return (
    <div className="app">
      <section>{user ? <ChatRoom /> : <Login />}</section>
      <SignOut />
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
    <button type="button" onClick={signInWithGoogle}>
      Login with Google
    </button>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button type="button" className="sign-out" onClick={signOut}>
        Sign Out
      </button>
    )
  );
}

function ChatRoom() {
  const messagesRef = collection(firestoreDB, 'messages');
  const q = query(
    messagesRef,
    where('ownerId', '==', auth.currentUser?.uid),
    // orderBy('createdAt', 'desc'),
  );

  const [messages] = useCollectionData(q, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e: any) => {
    e.preventDefault();

    await addDoc(messagesRef, {
      text: formValue,
      createdAt: serverTimestamp(),
      ownerId: auth.currentUser?.uid,
    });

    setFormValue('');
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
      </main>

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
    </>
  );
}

function ChatMessage(props: any) {
  // eslint-disable-next-line react/destructuring-assignment
  const { text } = props.message;

  return <div>{text}</div>;
}

export default App;
