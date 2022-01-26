import React, { FC } from 'react';
import { Row, Col } from 'antd';
import { UserInfo } from 'firebase/auth';
// Interfaces
import { IColumn, ICategory, ILink } from '../../interfaces';
// Components
import ImportantLinks from '../../components/ImportantLinks';
import Linky from '../../components/Linky';
import AddForm from '../../components/AddForm';
import Messages from '../../components/Messages';
// Styles
import './LinksPageView.scss';

// todo: remove this:
const style = {
  border: '1px solid #0092ff',
};

const LinksPage: FC<{
  user: UserInfo | null | undefined;
  importantLinks: ILink[];
  columns: IColumn[];
  formSubmitHandler: (val: string) => void;
}> = ({ user, importantLinks, columns, formSubmitHandler }) => (
  <div className="links-page">
    {user && <Messages user={user} />}

    <AddForm formSubmitHandler={formSubmitHandler} />

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
