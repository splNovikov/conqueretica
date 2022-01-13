import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { useAuthState } from 'react-firebase-hooks/auth';

// Firebase
import firebase from '../../firebase';
// Interfaces
import { IColumn, ICategory, ILink, IMessage } from '../../interfaces';
// Components
import ImportantLinks from '../../components/ImportantLinks';
import Linky from '../../components/Linky';
// Utils
// ...
// tmp data
import { columns, importantLinks } from './linksTmp';
// Styles
import './LinksPage.scss';

// todo: remove this:
const style = {
  border: '1px solid #0092ff',
};

// todo: add tests
const LinksPage = () => {
  const [user] = useAuthState(firebase.auth);
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    if (user) {
      firebase.fetchMessages(user).then((msgs: IMessage[]) => {
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
