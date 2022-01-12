import React from 'react';
import { Row, Col } from 'antd';

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

// todo: add tests
const LinksPage = () => {
  return (
    <div className="links-page">
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
