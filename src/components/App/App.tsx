import React, { useState } from 'react';
import {
  collection,
  query,
  serverTimestamp,
  addDoc,
  where,
} from 'firebase/firestore';

import { Button, Radio } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
// todo: we should operate User entity only.
import { auth, firestoreDB, signInWithGoogle, signOut } from '../../firebase';

// todo: routes
import MainPage from '../../pages/MainPage';

import './App.scss';

const App = () => {
  // todo: pass somehow user in store? useContext? mobx?
  const [user] = useAuthState(auth);
  const size = 'large';

  return (
    <div className="app">
      <MainPage />
      <section>{user ? <ChatRoom /> : <Login />}</section>
      <SignOut />

      <>
        <Radio.Group value={size}>
          <Radio.Button value="large">Large</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="small">Small</Radio.Button>
        </Radio.Group>
        <br />
        <br />
        <Button type="primary" size={size}>
          Primary
        </Button>
        <Button size={size}>Default</Button>
        <Button type="dashed" size={size}>
          Dashed
        </Button>
        <br />
        <Button type="link" size={size}>
          Link
        </Button>
        <br />
        <Button type="primary" icon={<DownloadOutlined />} size={size} />
        <Button
          type="primary"
          shape="circle"
          icon={<DownloadOutlined />}
          size={size}
        />
        <Button
          type="primary"
          shape="round"
          icon={<DownloadOutlined />}
          size={size}
        />
        <Button
          type="primary"
          shape="round"
          icon={<DownloadOutlined />}
          size={size}
        >
          Download
        </Button>
        <Button type="primary" icon={<DownloadOutlined />} size={size}>
          Download
        </Button>
      </>
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
