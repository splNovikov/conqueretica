import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {
  getFirestore,
  collection,
  query,
  serverTimestamp,
  addDoc,
  where,
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { FIREBASE } from '../../constants/credentials';

// todo: routes
import MainPage from '../../pages/MainPage';

import './App.scss';

const app = initializeApp(FIREBASE);

const auth = getAuth(app);
const firestore = getFirestore(app);

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="app">
      <MainPage />
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
      <SignOut />
    </div>
  );
};

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  return (
    <button type="button" className="sign-in" onClick={signInWithGoogle}>
      Sign in with Google
    </button>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button type="button" className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}

function ChatRoom() {
  const messagesRef = collection(firestore, 'messages');
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
