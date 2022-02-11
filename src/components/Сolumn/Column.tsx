import React, { FC } from 'react';
import { Col } from 'antd';
// Interfaces
import { ICategory, IColumn, ILink } from '../../interfaces';
// Components
import Linky from '../Linky';
// Styles
import './Column.scss';

const Column: FC<{
  column: IColumn;
  deleteColumnHandler: (val: IColumn) => void;
}> = ({ column, deleteColumnHandler }) => {
  const handleColumnDelete = () => deleteColumnHandler(column);

  return (
    <Col span={6} className="column">
      <div>Col</div>
      <button type="button" onClick={handleColumnDelete}>
        Delete Column
      </button>
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
  );
};

export default Column;
