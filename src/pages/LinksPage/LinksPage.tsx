import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
// eslint-disable-next-line import/no-extraneous-dependencies
import { User } from '@firebase/auth';

import { auth, firestoreDB } from '../../firebase';

// Interfaces
import { IColumn, ICategory, ILink } from '../../interfaces';

// Components
import ImportantLinks from '../../components/ImportantLinks';
import Linky from '../../components/Linky';

// tmp data
import { columns, importantLinks } from './linksTmp';

// Styles
import './LinksPage.scss';

// todo: remove this:
const style = {
  border: '1px solid #0092ff',
};

interface IMessage {
  id: string;
  ownerId: string;
  text: string;
}

const fetchMessages = async (user: User | null): Promise<IMessage[]> => {
  const res: IMessage[] = [];

  try {
    const messagesRef = collection(firestoreDB, 'messages');
    const q = query(messagesRef, where('ownerId', '==', user?.uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const { ownerId, id, text } = doc.data();

      res.push({ ownerId, id, text });
    });
  } catch (e) {
    // todo [after release]: error handling
    // eslint-disable-next-line no-console
    console.error(e);
  }

  return res;
};

// todo: add tests
const LinksPage = () => {
  // todo: pass somehow user in store? useContext?
  const [user] = useAuthState(auth);
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    if (user) {
      fetchMessages(auth.currentUser).then((msgs: IMessage[]) => {
        setMessages(msgs);
      });
    }
  }, [user]);

  return (
    <div className="links-page">
      <section>
        {user && (
          <main>
            {messages &&
              messages.map((msg) => <div key={msg.id}>{msg.text}</div>)}
          </main>
        )}
      </section>

      <ImportantLinks links={importantLinks} />

      <Row>
        {columns.map((column: IColumn) => (
          <Col key={column.id} span={6} style={style}>
            {column.categories.map((category: ICategory) => (
              <div key={category.id}>
                <div>{category.title}</div>
                {category.links.map((l: ILink) => (
                  <div key={l.id} className="linky-wrapper">
                    <Linky link={l} ellipsed />
                  </div>
                ))}
              </div>
            ))}
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default LinksPage;
