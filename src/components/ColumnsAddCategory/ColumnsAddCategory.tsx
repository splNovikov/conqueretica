import React, { FC, useState } from 'react';
import { Button, Col, Tooltip } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
// Constants
import maxCharacters from '../../constants/maxLengthCharacters';
// Components
import SingleInputForm from '../SingleInputForm';

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
          layout="vertical"
          maxCharacters={maxCharacters.categoryTitle}
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

export default ColumnsAddCategory;
