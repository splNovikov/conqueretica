import React, { FC } from 'react';
import { Col, Row } from 'antd';
// Interfaces
import { ICategory, IColumn } from '../../interfaces';
// Components
import Column from '../Column';

const Columns: FC<{
  columns: IColumn[];
  createColumnHandler: () => void;
  deleteColumnHandler: (val: IColumn) => void;
  categoryFormSubmitHandler: (value: string, column: IColumn) => void;
  deleteCategoryHandler: (category: ICategory, column: IColumn) => void;
  createLinkHandler: (
    title: string,
    href: string,
    category: ICategory,
    column: IColumn,
  ) => void;
}> = ({
  columns,
  createColumnHandler,
  deleteColumnHandler,
  categoryFormSubmitHandler,
  deleteCategoryHandler,
  createLinkHandler,
}) => {
  return (
    <Row className="columns">
      {columns.map((column: IColumn) => (
        <Column
          key={column.id}
          column={column}
          deleteColumnHandler={deleteColumnHandler}
          categoryFormSubmitHandler={categoryFormSubmitHandler}
          deleteCategoryHandler={deleteCategoryHandler}
          createLinkHandler={createLinkHandler}
        />
      ))}
      <Col span={6} className="create-column-wrapper">
        <button type="button" onClick={createColumnHandler}>
          Create Column
        </button>
      </Col>
    </Row>
  );
};

export default Columns;
