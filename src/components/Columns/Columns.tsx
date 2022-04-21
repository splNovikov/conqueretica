import React, { FC } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Button, Col, Row, Skeleton, Tooltip } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
// Firebase
import firebase from '../../firebase';
// Interfaces
import { IColumn, ITab } from '../../interfaces';
// Components
import Column from '../Column';
// Utils
import { httpErrorHandler } from '../../utils';
// Styles
import './Columns.scss';

const Columns: FC<{
  selectedTab: ITab;
}> = ({ selectedTab }) => {
  const qColumns = firebase.getColumnsQuery(selectedTab);
  const [columns = [], loadingColumns, columnsError] =
    useCollectionData<IColumn>(qColumns);

  if (columnsError?.message) {
    httpErrorHandler(columnsError);
  }

  const handleCreateColumn = async () => {
    await firebase.addColumn(selectedTab);
  };

  return (
    <Skeleton
      loading={loadingColumns}
      active
      round
      className="columns-skeleton"
    >
      <Row className="columns" gutter={[16, 16]}>
        {columns.map((column: IColumn) => (
          <Column span={4} key={column.id} column={column} />
        ))}
        {selectedTab?.id ? (
          <Col span={3} className="columns-create-column-wrapper">
            <Tooltip title="Add New Column">
              <Button
                shape="circle"
                size="small"
                icon={<PlusCircleOutlined />}
                onClick={handleCreateColumn}
                className="columns-btn-add-new-column"
              />
            </Tooltip>
          </Col>
        ) : null}
      </Row>
    </Skeleton>
  );
};

export default Columns;
