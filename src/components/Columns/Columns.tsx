import React, { FC } from 'react';
import { Col } from 'antd';
// Interfaces
import { IColumn } from '../../interfaces';
// Components
import Column from '../Column';

const Columns: FC<{
  columns: IColumn[];
  createColumnHandler: () => void;
  deleteColumnHandler: (val: IColumn) => void;
}> = ({ columns, createColumnHandler, deleteColumnHandler }) => {
  return (
    // "ant-row" class instead of Row component because Row component is failing tests
    <div className="ant-row">
      {columns.map((column: IColumn) => (
        <Column
          key={column.id}
          column={column}
          deleteColumnHandler={deleteColumnHandler}
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