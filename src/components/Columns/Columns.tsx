import React, { FC } from 'react';
import { Col } from 'antd';
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
}> = ({
  columns,
  createColumnHandler,
  deleteColumnHandler,
  categoryFormSubmitHandler,
  deleteCategoryHandler,
}) => {
  return (
    // "ant-row" class instead of Row component because Row component is failing tests
    <div className="columns ant-row">
      {columns.map((column: IColumn) => (
        <Column
          key={column.id}
          column={column}
          deleteColumnHandler={deleteColumnHandler}
          categoryFormSubmitHandler={categoryFormSubmitHandler}
          deleteCategoryHandler={deleteCategoryHandler}
        />
      ))}
      <Col span={6} className="create-column-wrapper">
        <button type="button" onClick={createColumnHandler}>
          Create Column
        </button>
      </Col>
    </div>
  );
};

export default Columns;
