import React, { FC } from 'react';
import { User } from 'firebase/auth';
import { collection, orderBy, query, where } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
// Firebase
import firebase from '../../firebase';

const Messages: FC<{ user: User }> = ({ user }) => {
  const messagesRef = collection(firebase.firestoreDB, 'messages');
  const q = query(
    messagesRef,
    where('ownerId', '==', user.uid),
    // orderBy('createdBy', 'desc'),
  );

  const [messages] = useCollectionData(q, { idField: 'id' });

  return (
    <div>
      {messages && messages.map((msg) => <div key={msg.id}>{msg.text}</div>)}
    </div>
  );
};

export default Messages;
