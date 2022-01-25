import React, { FC } from 'react';
import { Row, Col } from 'antd';
import { User } from 'firebase/auth';
// Firebase
import firebase from '../../firebase';
// Interfaces
import { IColumn, ICategory, ILink } from '../../interfaces';
// Components
import ImportantLinks from '../../components/ImportantLinks';
import Linky from '../../components/Linky';
import SendForm from '../../components/SendForm';
import Messages from '../../components/Messages';

// Styles
import './LinksPageView.scss';

// todo: remove this:
const style = {
  border: '1px solid #0092ff',
};

const LinksPage: FC<{
  user: User | null | undefined;
  importantLinks: ILink[];
  columns: IColumn[];
}> = ({ user, importantLinks, columns }) => (
  <div className="links-page">
    {user && <Messages user={user} />}

    <SendForm />

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

export default LinksPage;
