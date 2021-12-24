import React from 'react';
import { Row, Col } from 'antd';
import classNames from 'classnames';

// Interfaces
import { IColumn, ICategory, ILink } from '../../interfaces';

// tmp data
import { columns, importantLinks } from './linksTmp';

// Styles
import './MainPage.scss';

// todo: remove this:
const style = {
  border: '1px solid #0092ff',
};

// todo: own component folder
const Linky = ({
  link,
  big,
  colored,
  ellipsed,
}: {
  link: ILink;
  /* eslint-disable react/require-default-props */
  big?: boolean;
  colored?: boolean;
  ellipsed?: boolean;
  /* eslint-enable */
}) => (
  <a
    className={classNames('linky', { colored, big, ellipsed })}
    aria-label={link.title}
    href={link.href}
  >
    {link.title || link.href}
  </a>
);

const MainPage = () => {
  return (
    <div className="main-page-wrapper">
      <Row>
        <Col style={style} span={24}>
          {importantLinks.map((l: ILink) => (
            <Linky key={l.id} link={l} big colored />
          ))}
        </Col>
      </Row>

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

export default MainPage;
