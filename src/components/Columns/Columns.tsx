import React, { FC } from 'react';
import { Button, Col, Row, Tooltip } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
// Interfaces
import { ICategory, IColumn, ITab } from '../../interfaces';
// Components
import Column from '../Column';
// Styles
import './Columns.scss';

const Columns: FC<{
  columns: IColumn[];
  // eslint-disable-next-line react/require-default-props
  selectedTab?: ITab;
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
  selectedTab,
  createColumnHandler,
  deleteColumnHandler,
  categoryFormSubmitHandler,
  deleteCategoryHandler,
  createLinkHandler,
}) => {
  return (
    <Row className="columns" gutter={[16, 16]}>
      {columns.map((column: IColumn) => (
        <Column
          span={4}
          key={column.id}
          column={column}
          deleteColumnHandler={deleteColumnHandler}
          categoryFormSubmitHandler={categoryFormSubmitHandler}
          deleteCategoryHandler={deleteCategoryHandler}
          createLinkHandler={createLinkHandler}
        />
      ))}
      {selectedTab?.id ? (
        <Col span={3} className="columns-create-column-wrapper">
          <Tooltip title="Add New Column">
            <Button
              shape="circle"
              size="small"
              icon={<PlusCircleOutlined />}
              onClick={createColumnHandler}
              className="columns-btn-add-new-column"
            />
          </Tooltip>
        </Col>
      ) : null}
    </Row>
  );
};

export default Columns;
