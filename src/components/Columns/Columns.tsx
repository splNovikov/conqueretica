import React, { FC, useState } from 'react';
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
import SingleInputForm from '../SingleInputForm';

const Columns: FC<{
  selectedTab: ITab;
}> = ({ selectedTab }) => {
  const qColumns = firebase.getColumnsQuery(selectedTab);
  const [columns = [], loadingColumns, columnsError] =
    useCollectionData<IColumn>(qColumns);
  const span = 4;

  if (columnsError?.message) {
    httpErrorHandler(columnsError);
  }

  const handleCreateCategoryScenario = async (title: string) => {
    await firebase.addColumnAndCategory(title, selectedTab);
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
          <Column span={span} key={column.id} column={column} />
        ))}
        {selectedTab?.id ? (
          <ColumnsAddCategory
            span={span}
            addCategoryScenarioHandler={handleCreateCategoryScenario}
          />
        ) : null}
      </Row>
    </Skeleton>
  );
};

const ColumnsAddCategory: FC<{
  span: number;
  addCategoryScenarioHandler: (title: string) => void;
}> = ({ span, addCategoryScenarioHandler }) => {
  const [isAddCategoryModeActive, setIsAddCategoryModeActive] = useState(false);

  const enableAddCategoryMode = () => setIsAddCategoryModeActive(true);

  const disableAddCategoryMode = () => setIsAddCategoryModeActive(false);

  const handleAddCategoryButton = () => enableAddCategoryMode();

  const handleCategoryFormSubmit = (value: string) => {
    disableAddCategoryMode();
    addCategoryScenarioHandler(value);
  };

  return (
    <Col span={span} className="columns-create-column-wrapper">
      {isAddCategoryModeActive ? (
        <SingleInputForm
          placeholder="Create a new category"
          formSubmitHandler={handleCategoryFormSubmit}
          abortHandler={disableAddCategoryMode}
        />
      ) : (
        <Tooltip title="Add New Category">
          <Button
            shape="circle"
            size="small"
            icon={<PlusCircleOutlined />}
            onClick={handleAddCategoryButton}
            className="columns-btn-add-new-category"
          />
        </Tooltip>
      )}
    </Col>
  );
};

export default Columns;
