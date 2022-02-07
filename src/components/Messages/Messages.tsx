import React, { FC } from 'react';
import { UserInfo } from 'firebase/auth';
import { Query } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
// Firebase
import firebase from '../../firebase';
// Utils
import { httpErrorHandler } from '../../utils';

const Messages: FC<{ user: UserInfo }> = ({ user }) => {
  const q: Query = firebase.getMessagesQuery(user.uid);
  const [messages, loading, error] = useCollectionData(q);

  if (error?.message) {
    httpErrorHandler(error);

    return null;
  }

  return (
    <div className="messages">
      {loading && 'loading messages progress...'}
      {messages &&
        messages.map((msg) => (
          <div className="message" key={msg.id}>
            {msg.text}
          </div>
        ))}
    </div>
  );
};

export default Messages;
